<script setup>
import axios from "axios";
import { ref, watch } from "vue";
import * as yup from "yup";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { showErrorToast, showSuccessToast } from "../../toster";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const isLoading = ref(false);
const featchvalue = ref(null);
const apiUrl = import.meta.env.VITE_API_URL;
const shopId = localStorage.getItem("shopId");
const AuthToken = localStorage.getItem("AuthToken");
const valuesChanged = ref(false);
const router = useRouter();
const route = useRoute();
const shopLogoFile = ref(null);

const schema = yup.object().shape({
  shopName: yup.string().required("shopName is required"),
  address: yup.string().required("address is required"),
  city: yup.string().required("city is required"),
  state: yup.string().required("state is required"),
  zipCode: yup.string().required("zipCode is required"),
  country: yup.string().required("country is required"),
  dateFormat: yup.string().required("dateFormat is required"),
  timeZone: yup.string().required("timeZone is required"),
  timeFormat: yup.string().required("timeFormat is required"),
  website: yup.string().required("website is required"),
  fullName: yup.string().required("fullName is required"),
  phone1: yup.string().required("phone1 is required"),
  phone2: yup.string().required("phone2 plate is required"),
  fax: yup.string().required("fax is required"),
  shopLogo: yup.string().required("shopLogo is required"),
  websiteStatue: yup.string(),
});

const { handleSubmit, values, setValues } = useForm({
  validationSchema: schema,
  initialValues: featchvalue.value,
});

const { value: shopName, errorMessage: shopNameErrorMessage } = useField(
  "shopName"
);
const { value: address, errorMessage: addressErrorMessage } = useField(
  "address"
);
const { value: city, errorMessage: cityErrorMessage } = useField("city");
const { value: state, errorMessage: stateErrorMessage } = useField("state");
const { value: zipCode, errorMessage: zipCodeErrorMessage } = useField(
  "zipCode"
);
const { value: country, errorMessage: countryErrorMessage } = useField(
  "country"
);
const { value: dateFormat, errorMessage: dateFormatErrorMessage } = useField(
  "dateFormat"
);
const { value: timeZone, errorMessage: timeZoneErrorMessage } = useField(
  "timeZone"
);
const { value: timeFormat, errorMessage: timeFormatErrorMessage } = useField(
  "timeFormat"
);
const { value: website, errorMessage: websiteErrorMessage } = useField(
  "website"
);
const { value: fullName, errorMessage: fullNameErrorMessage } = useField(
  "fullName"
);
const { value: phone1, errorMessage: phone1ErrorMessage } = useField("phone1");
const { value: phone2, errorMessage: phone2ErrorMessage } = useField("phone2");
const { value: fax, errorMessage: faxErrorMessage } = useField("fax");
const { value: shopLogo, errorMessage: shopLogoErrorMessage } = useField(
  "shopLogo"
);
const {
  value: websiteStatue,
  errorMessage: websiteStatueErrorMessage,
} = useField("websiteStatue");

const handleError = (error) => {
  if (error.response && error.response.data.msg instanceof Array) {
    error.response.data.msg.forEach((errorMsg) => {
      showErrorToast(errorMsg);
    });
    console.log("An error occurred while fetching data", error);
  } else if (error.response && error.response.status === 401) {
    showErrorToast(error.response.data.message);
    localStorage.clear();
    router.push("/login");
  } else if (error.response) {
    showErrorToast(error.response.data.msg);
    console.error("An error occurred while fetching data", error);
  } else {
    showErrorToast("Some Error Occurred!!!!");
    console.error(
      "An error occurred while fetching data. Response was not available.",
      error
    );
  }
};

const featchData = async () => {
  isLoading.value = true;
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const gotData = await axios.get(
      `${apiUrl}/shop/getShopRegister/${shopId}`,
      config
    );
    const { data } = gotData.data;
    featchvalue.value = gotData.data.data;
    setValues(
      gotData.data.data
        ? {
            ...gotData.data.data,
            phone1: formatPhoneNumber(gotData.data.data.phone1),
            phone2: formatPhoneNumber(gotData.data.data.phone2),
          }
        : {}
    );
    dateFormat.value = new Date(dateFormat.value).toISOString().slice(0, 10);
    shopLogo.value = `${apiUrl}${data.shopLogo}`;
    if (!data.shopLogo) {
      showErrorToast("Logo Not Found !!!");
    }
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    handleError(error);
  }
};

onMounted(async () => {
  await featchData();
  valuesChanged.value = false;
});

const handleSave = handleSubmit(async (value) => {
  if (valuesChanged.value) {
    try {
      value.phone1 = formatPhoneNumberToDigit(value.phone1);
      value.phone2 = formatPhoneNumberToDigit(value.phone2);
      const formData = new FormData();
      Object.keys(value).forEach((key) => formData.append(key, value[key]));
      if (shopLogoFile.value) {
        formData.append("shopLogo", shopLogoFile.value);
      }
      const config = {
        headers: { Authorization: `Bearer ${AuthToken}` },
      };
      const saveData = await axios.post(
        `${apiUrl}/shop/shopRegister`,
        formData,
        config
      );
      shopLogoFile.value = null;
      editField.value = true;
      showSuccessToast(saveData.data.msg);
      valuesChanged.value = false;
    } catch (error) {
      handleError(error);
    }
  } else {
    showErrorToast("Data hasn't changed. No update required");
  }
});

const handleLogo = (e) => {
  const file = e.target.files[0];
  shopLogoFile.value = file;
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      shopLogo.value = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    shopLogo.value = "";
  }
};

const editField = ref(true);
const handleEdit = () => {
  editField.value = !editField.value;
};
const handleCancle = async () => {
  await featchData();
  valuesChanged.value = false;
  shopLogoFile.value = null;
};

watch(values, (value) => {
  if (JSON.stringify(value) !== JSON.stringify(featchvalue.value)) {
    valuesChanged.value = true;
  }
});

watch(shopLogoFile, () => {
  valuesChanged.value = true;
});

function formatPhoneNumber(input) {
  if (input) {
    let phoneInput = input.replace(/\D+/g, "");
    phoneInput = phoneInput.substring(0, 10);
    if (phoneInput.length >= 4 && phoneInput.length <= 6) {
      return `${phoneInput.slice(0, 3)}-${phoneInput.slice(3)}`;
    } else if (phoneInput.length >= 7) {
      return `${phoneInput.slice(0, 3)}-${phoneInput.slice(
        3,
        6
      )}-${phoneInput.slice(6, 10)}`;
    } else {
      return phoneInput;
    }
  }
  return input;
}

function formatPhoneNumberToDigit(input) {
  let phoneInput = input.replace(/\D+/g, "");
  if (phoneInput.length >= 4 && phoneInput.length <= 6) {
    return phoneInput.slice(0, 3) + phoneInput.slice(3);
  } else if (phoneInput.length >= 7) {
    return (
      phoneInput.slice(0, 3) + phoneInput.slice(3, 6) + phoneInput.slice(6)
    );
  } else {
    return phoneInput;
  }
}
</script>

<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="Bars"
    :is-full-page="true"
  />
  <div class="shopdetailsection">
    <div class="row">
      <div class="col-lg-12">
        <div class="edit-section">
          <!-- <button @click="handleCancle" :disabled="!editField">Cancel</button> -->
          <button @click="handleEdit" v-if="editField">Edit</button>
          <button @click="handleSave" v-else style="background-color: #6bfa65;">
            Save
          </button>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-12">
        <form action="#" method="post">
          <div class="form-control">
            <div class="row">
              <div class="col-lg-12 col-md-12 col-12 col-rowset">
                <div class="form-group">
                  <label for="shopname"
                    >Shop Name:<span v-if="shopNameErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    id="shopname"
                    v-model="shopName"
                    :disabled="editField"
                    name="shopname"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-12 col-md-12 col-12 col-rowset">
                <div class="form-group">
                  <label for="address"
                    >Address:<span v-if="addressErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    id="address"
                    name="address"
                    v-model="address"
                    :disabled="editField"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-4 col-12 col-rowset">
                <div class="form-group">
                  <label for="city"
                    >City:<span v-if="cityErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    id="city"
                    name="city"
                    v-model="city"
                    :disabled="editField"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-4 col-12 col-rowset">
                <div class="form-group">
                  <label for="state"
                    >State:<span v-if="stateErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    id="state"
                    name="state"
                    v-model="state"
                    :disabled="editField"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-4 col-12 col-rowset">
                <div class="form-group">
                  <label for="zipcode"
                    >Zip Code:<span v-if="zipCodeErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    v-model="zipCode"
                    :disabled="editField"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                <div class="form-group">
                  <label for="country"
                    >Country:<span v-if="countryErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <select
                    id="country"
                    name="country"
                    v-model="country"
                    :disabled="editField"
                    required
                  >
                    <option value="" selected>Select your country </option>
                    <!-- Add options for countries here -->
                    <option value="USA">
                      United States
                    </option>
                    <option value="UK">
                      United Kingdom
                    </option>
                    <!-- Add more countries as needed -->
                  </select>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                <div class="form-group">
                  <label for="dateformat"
                    >Date Format:<span
                      v-if="dateFormatErrorMessage"
                      class="errors"
                      >*</span
                    ></label
                  >
                  <input
                    type="date"
                    id="dateformat"
                    name="dateformat"
                    v-model="dateFormat"
                    :disabled="editField"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                <div class="form-group">
                  <label for="timezone"
                    >Time Zone:<span v-if="timeZoneErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <select
                    id="timezone"
                    name="timezone"
                    v-model="timeZone"
                    :disabled="editField"
                    required
                  >
                    <option value="" selected> Select Time Zone </option>
                    <!-- Add options for countries here -->
                    <option value="America/New_York">
                      (UTC-05:00) Eastern
                    </option>
                    <option value="America/Chicago">
                      (UTC-06:00) Central
                    </option>
                    <option value="America/Denver">
                      (UTC-07:00) Mountain
                    </option>
                    <option value="America/Phoenix">
                      (UTC-07:00) Mountain - AZ
                    </option>
                    <option value="America/Los_Angeles">
                      (UTC-08:00) Pacific
                    </option>
                    <option value="America/Anchorage">
                      (UTC-09:00) Alaskan
                    </option>
                    <option value="Pacific/Honolulu">
                      (UTC-10:00) Hawaiian
                    </option>
                    <!-- Add more countries as needed -->
                  </select>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                <div class="form-group">
                  <label for="timeformat"
                    >Time Format:<span
                      v-if="timeFormatErrorMessage"
                      class="errors"
                      >*</span
                    ></label
                  >
                  <select
                    id="timeformat"
                    name="timeformat"
                    v-model="timeFormat"
                    :disabled="editField"
                    required
                  >
                    <option value="" selected> Select Time Format </option>
                    <!-- Add options for countries here -->
                    <option value="USA">
                      United States
                    </option>
                    <option value="UK">
                      United Kingdom
                    </option>
                    <!-- Add more countries as needed -->
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="col-lg-6 col-md-12 col-12">
        <form action="#" method="post">
          <div class="form-control">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                <div class="form-group">
                  <label for="dowebsite"> Do You Have a Website</label>
                  <select
                    v-model="websiteStatue"
                    :disabled="editField"
                    id="dowebsite"
                    name="dowebsite"
                    required
                  >
                    <option value="" disabled selected> Select Option </option>
                    <!-- Add options for countries here -->
                    <option value="Yes">
                      Yes
                    </option>
                    <option value="No">
                      No
                    </option>
                    <!-- Add more countries as needed -->
                  </select>
                </div>
              </div>
              <div class="col-lg-12 col-md-12 col-12 col-rowset">
                <div class="form-group">
                  <label for="website"
                    >Website<span v-if="websiteErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    id="website"
                    name="website"
                    v-model="website"
                    :disabled="editField"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-12 col-md-12 col-12 col-rowset">
                <div class="form-group">
                  <label for="Contactfullname"
                    >Contact Full Name<span
                      v-if="fullNameErrorMessage"
                      class="errors"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    id="Contactfullname"
                    name="Contactfullname"
                    v-model="fullName"
                    :disabled="editField"
                    required
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                <div class="form-group">
                  <label for="Phone">
                    Shop Logo<span v-if="shopLogoErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <div class="upload-files-container">
                    <div class="drag-file-area">
                      <label
                        class="label-upload-image"
                        style="background: white;"
                      >
                        <div class="div-upload">
                          <input
                            @change="handleLogo"
                            :disabled="editField"
                            type="file"
                            class="default-file-input"
                          />
                          <img
                            v-if="shopLogo"
                            :src="shopLogo"
                            class="img-fluid img-thumbnail"
                          />
                          <span
                            v-else
                            class="material-icons-outlined upload-icon"
                            >file_upload</span
                          >
                          <br />
                          <span class="browse-files-text">Click To Update</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                <div class="form-group">
                  <label for="Phone"
                    >Phone 1<span v-if="phone1ErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <input
                    type="tel"
                    id="Phone"
                    name="Phone"
                    v-model="phone1"
                    :disabled="editField"
                    placeholder="000-000-000"
                    @input="() => (phone1 = formatPhoneNumber(phone1))"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="Phone"
                    >Phone 2<span v-if="phone2ErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <input
                    type="tel"
                    id="Phone"
                    name="Phone"
                    v-model="phone2"
                    :disabled="editField"
                    @input="() => (phone2 = formatPhoneNumber(phone2))"
                    placeholder="000-000-000"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="Fax"
                    >Fax<span v-if="faxErrorMessage" class="errors"
                      >*</span
                    ></label
                  >
                  <input
                    type="text"
                    id="Fax"
                    name="Fax"
                    v-model="fax"
                    :disabled="editField"
                    placeholder="000-000-000"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
.errors {
  color: red;
}
</style>

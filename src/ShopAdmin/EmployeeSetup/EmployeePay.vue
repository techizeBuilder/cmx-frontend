<script setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { ref } from "vue";

const edit = ref(true);
const props = defineProps([
  "data",
  "userId",
  "handleUpdateAll",
  "handleAddEmploy",
]);
const userId = props.userId;
const handleUpdateAll = props.handleUpdateAll;
const handleAddEmploy = props.handleAddEmploy;
const schema = yup.object().shape({
  payTerm: yup.string().required("payTerm is required"),
  payType: yup.string().required("payType is required"),
  flatRate: yup.string().required("flatRate is required"),
  payPerHourly: yup.string().required("Pay Per Hourly is required"),
  Salary: yup.string().required("Salary is required"),
  commissionCategories: yup
    .array()
    .min(1)
    .required("Commission Categories is required"),
  commissionRate: yup.string().required("Commission Rate is required"),
  gross: yup.string().required("Gross or Net is required"),
});

const { handleSubmit, values } = useForm({
  validationSchema: schema,
  initialValues: props.data,
});

const { value: payTerm, errorMessage: payTermErrorMessage } = useField(
  "payTerm"
);
const { value: payType, errorMessage: payTypeErrorMessage } = useField(
  "payType"
);
const { value: flatRate, errorMessage: flatRateErrorMessage } = useField(
  "flatRate"
);
const {
  value: payPerHourly,
  errorMessage: payPerHourlyErrorMessage,
} = useField("payPerHourly");
const { value: Salary, errorMessage: SalaryErrorMessage } = useField("Salary");
const {
  value: commissionCategories,
  errorMessage: commissionCategoriesErrorMessage,
} = useField("commissionCategories");
const { value: gross, errorMessage: grossErrorMessage } = useField("gross");
const {
  value: commissionRate,
  errorMessage: commissionRateErrorMessage,
} = useField("commissionRate");

const handleSubmitpay = handleSubmit(async (value) => {
  if (!userId) {
    value.shopId = localStorage.getItem("shopId");
    await handleAddEmploy(value);
  } else {
    value.userId = userId;
    await handleUpdateAll(value);
  }
  edit.value = true;
});

const handlepatType = (value) => {
  payType.value = value;
};

const handlecommissionCategories = (e) => {
  const value = e.target.value;

  if (e.target.checked) {
    if (!commissionCategories.value) {
      commissionCategories.value = [value];
    } else if (!commissionCategories.value.includes(value)) {
      commissionCategories.value = [...commissionCategories.value, value];
    }
  } else {
    commissionCategories.value = commissionCategories.value.filter(
      (item) => item !== value
    );
  }
};

const handlePayBack = () => {
  return values;
};

defineExpose({
  handleSubmitpay,
  handlePayBack,
});
</script>
<template>
  <div class="estimatedetailsection">
    <div class="p-2 text-end">
      <button
        type="button"
        @click="() => (edit = false)"
        class="btn btn-light text-nowrap"
        v-if="edit"
      >
        <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
      </button>
      <button
        v-else
        :style="{ 'background-color': '#6BFA65' }"
        type="button"
        class="btn btn-light text-nowrap flex-1"
        @click="handleSubmitpay"
      >
        <i class="fa-regular fa-floppy-disk"></i> Save
      </button>
    </div>
    <div class="row px-lg-5 pt-4 pt-sm-0 g-5">
      <div class="col-sm-12 col-md-6 col-lg-4">
        <h6>Employee Name</h6>
        <div class="EmpFrame">
          <h5 class="mb-4">
            Pay Term<span v-if="payTermErrorMessage" class="errors">*</span>
          </h5>
          <div class="customerXBox">
            <select :disabled="edit" v-model="payTerm" class="form-select">
              <option selected disabled>-</option>
              <option value="Yearly">Yearly</option>
              <option value="Monthly">Monthly</option>
              <option value="Bi-Weekly">Bi-Weekly</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>
          <div class="mt-5">
            <h5 class="mb-4">
              Pay Type<span v-if="payTypeErrorMessage" class="errors">*</span>
            </h5>

            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="radio"
                name="payType"
                id="flatRate"
                value="Flat Rate"
                :checked="
                  props.data.payType
                    ? props.data.payType === 'Flat Rate'
                    : false
                "
                @change="handlepatType('Flat Rate')"
              />
              <label class="form-check-label" for="flatRate">Flat Rate</label>
            </div>

            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="radio"
                name="payType"
                id="hourly"
                value="Hourly"
                :checked="
                  props.data.payType ? props.data.payType === 'Hourly' : false
                "
                @change="handlepatType('Hourly')"
              />
              <label class="form-check-label" for="hourly">Hourly</label>
            </div>

            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="radio"
                name="payType"
                id="salary"
                value="Salary"
                :checked="
                  props.data.payType ? props.data.payType === 'Salary' : false
                "
                @change="handlepatType('Salary')"
              />
              <label class="form-check-label" for="salary">Salary</label>
            </div>

            <div class="form-check mb-2">
              <input
                class="form-check-input"
                type="radio"
                name="payType"
                id="commission"
                value="Commission"
                :checked="
                  props.data.payType
                    ? props.data.payType === 'Commission'
                    : false
                "
                @change="handlepatType('Commission')"
              />
              <label class="form-check-label" for="commission"
                >Commission</label
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4">
        <h6>&nbsp;</h6>
        <div class="EmpFrame">
          <h5 class="mb-4">Rate Type</h5>
          <p class="w-50 m-auto text-center my-4">
            <small>Enter zero if it does not apply Select only 1</small>
          </p>

          <label for="FlatRate" class="form-label mb-0"
            >Flat Rate<span v-if="flatRateErrorMessage" class="errors"
              >*</span
            ></label
          >
          <select
            class="form-select"
            v-model="flatRate"
            :disabled="edit"
            id="FlatRate"
            name="FlatRate"
          >
            <option value="0.00">$0.00</option>
            <option value="0.00">$0.00</option>
            <option value="0.00">$0.00</option>
            <option value="0.00">$0.00</option>
          </select>
          <br />
          <label for="PayPer" class="form-label mb-0">
            Pay Per Hourly<span v-if="payPerHourlyErrorMessage" class="errors"
              >*</span
            ></label
          >
          <select
            class="form-select"
            v-model="payPerHourly"
            :disabled="edit"
            id="PayPer"
            name="PayPer"
          >
            <option value="0.00">$0.00</option>
            <option value="0.00">$0.00</option>
            <option value="0.00">$0.00</option>
            <option value="0.00">$0.00</option>
          </select>
          <br />
          <label for="Salary" class="form-label mb-0"
            >Salary (12 Month)<span v-if="SalaryErrorMessage" class="errors"
              >*</span
            ></label
          >
          <select
            class="form-select"
            v-model="Salary"
            :disabled="edit"
            id="Salary"
            name="Salary"
          >
            <option>$0.00</option>
            <option>$0.00</option>
            <option>$0.00</option>
            <option>$0.00</option>
          </select>
        </div>
      </div>

      <div class="col-sm-12 col-md-6 col-lg-4">
        <h6>&nbsp;</h6>
        <div class="EmpFrame">
          <h5 class="mb-4">
            Commission Categories<span
              v-if="commissionCategoriesErrorMessage"
              class="errors"
              >*</span
            >
          </h5>
          <div class="form-check form-switch mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              name="darkmode"
              value="Labor"
              :checked="
                props.data.commissionCategories
                  ? props.data.commissionCategories.includes('Labor')
                    ? true
                    : false
                  : false
              "
              @change="handlecommissionCategories"
            />
            <label class="form-check-label" for="mySwitch">Labor</label>
          </div>
          <div class="form-check form-switch mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              name="darkmode"
              value="Paint Labor"
              :checked="
                props.data.commissionCategories
                  ? props.data.commissionCategories.includes('Paint Labor')
                    ? true
                    : false
                  : false
              "
              @change="handlecommissionCategories"
            />
            <label class="form-check-label" for="mySwitch">Paint Labor</label>
          </div>
          <div class="form-check form-switch mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              name="darkmode"
              value="Parts"
              :checked="
                props.data.commissionCategories
                  ? props.data.commissionCategories.includes('Parts')
                    ? true
                    : false
                  : false
              "
              @change="handlecommissionCategories"
            />
            <label class="form-check-label" for="mySwitch">Parts</label>
          </div>
          <div class="form-check form-switch mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              name="darkmode"
              value="Supplies"
              :checked="
                props.data.commissionCategories
                  ? props.data.commissionCategories.includes('Supplies')
                    ? true
                    : false
                  : false
              "
              @change="handlecommissionCategories"
            />
            <label class="form-check-label" for="mySwitch">Supplies</label>
          </div>

          <div class="mt-5">
            <label for="text" class="form-label"
              >Commission Rate<span
                v-if="commissionRateErrorMessage"
                class="errors"
                >*</span
              ></label
            >
            <input
              type="text"
              class="form-control"
              placeholder="0.00%"
              name="hu"
              v-model="commissionRate"
              :disabled="edit"
            />
          </div>
          <br />
          <label for="Salary" class="form-label mb-0"
            >Gross or Net<span v-if="grossErrorMessage" class="errors"
              >*</span
            ></label
          >
          <select
            class="form-select"
            id="Salary"
            :disabled="edit"
            v-model="gross"
            name="Salary"
          >
            <option value="0.00">$0.00</option>
            <option value="0.00">$0.00</option>
            <option value="0.00">$0.00</option>
            <option value="0.00">$0.00</option>
          </select>
          <p class="px-4">
            <small>
              Gross: Without deductions <br />
              Net: Less deductions</small
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
label {
  font-weight: 500;
}

.EmpFrame {
  background: rgba(210, 212, 215, 0.2);
  padding: 20px 30px;
  min-height: 470px;
}
</style>

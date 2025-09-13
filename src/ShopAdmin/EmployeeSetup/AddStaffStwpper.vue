<script setup>
import { ref, watch, onMounted } from "vue";
import ContactDetailsEmployee from "./ContactDetailsEmployee.vue";
import AddStaffNotifications from "./AddStaffNotifications.vue";
import EmployeePay from "./EmployeePay.vue";
import LoginEmployee from "./LoginEmployee.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { showErrorToast, showSuccessToast } from "../../toster";
import isEqual from "lodash/isEqual";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const isLoading = ref(false);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const router = useRouter();
const route = useRoute();
const userId = route.params.userId;
const myChild1 = ref(null);
const myChild2 = ref(null);
const myChild3 = ref(null);
const myChild4 = ref(null);
const step = ref(1);
const result = ref([]);
const previousResult = ref([]);

const handleUpdateData = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const gotData = await axios.get(
      `${apiUrl}/user/userdetail/${userId}`,
      config
    );
    result.value = gotData.data.data;
    previousResult.value = { ...gotData.data.data };
  } catch (error) {
    handleError(error);
  }
};

const handleUpdateAll = async (data) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(
      `${apiUrl}/user/update/data`,
      data,
      config
    );
    showSuccessToast(response.data.msg);
  } catch (error) {
    console.log(error);
  }
};

const handleAddEmploy = async (data) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(`${apiUrl}/user/register`, data, config);
    showSuccessToast(response.data.msg);
  } catch (error) {
    console.log(error);
  }
};

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
    localStorage.clear();
    router.push("/login");
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

// const next = async () => {
//   if (step.value === 1) {
//     const contactDetails = await myChild1.value.handleSubmitAdjust();
//     const logDetails = await myChild2.value?.handleloginInfo();
//     if (userId ? contactDetails : contactDetails && logDetails) {
//       result.value = userId
//         ? {
//             ...contactDetails,
//           }
//         : { ...contactDetails, ...result.value, ...logDetails };
//       step.value = step.value + 1;
//     }
//   } else if (step.value === 2) {
//     const notificationData = await myChild3.value.handleNotification();
//     if (notificationData) {
//       result.value = userId
//         ? {
//             ...result.value,
//             ...notificationData,
//           }
//         : { ...notificationData, ...result.value };
//       step.value = step.value + 1;
//     }
//   } else {
//     step.value = step.value + 1;
//   }
// };

// const prev = () => {
//   if (step.value === 3) {
//     const payData = myChild4.value.handlePayBack();
//     if (payData) {
//       result.value = { ...result.value, ...payData };
//       step.value = step.value - 1;
//     }
//   } else if (step.value === 2) {
//     const notificationData = myChild3.value.handleNotificationBack();
//     if (notificationData) {
//       result.value = { ...result.value, ...notificationData };
//       step.value = step.value - 1;
//     }
//   } else {
//     step.value = step.value - 1;
//   }
// };

// const handleComplete = async () => {
//   const payData = await myChild4.value.handleSubmitpay();
//   if (payData) {
//     result.value = { ...result.value, ...payData };
//     try {
//       const config = {
//         headers: { Authorization: `Bearer ${AuthToken}` },
//       };
//       if (userId) {
//         if (!isEqual(previousResult.value, result.value)) {
//           result.value.userId = route.params.userId;
//           const gotData = await axios.post(
//             `${apiUrl}/user/update/data`,
//             result.value,
//             config
//           );
//           showSuccessToast(gotData.data.msg);
//           step.value = 1;
//         } else {
//           showErrorToast("Data hasn't changed. No update required");
//         }
//       } else {
//         result.value.shopId = localStorage.getItem("shopId");
//         const gotData = await axios.post(
//           `${apiUrl}/user/register`,
//           result.value,
//           config
//         );
//         showSuccessToast(gotData.data.msg);
//         step.value = 1;
//         result.value = [];
//       }
//     } catch (error) {
//       handleError(error);
//     }
//   }
// };
onMounted(async () => {
  if (userId) {
    isLoading.value = true;
    await handleUpdateData();
    isLoading.value = false;
  }
});
watch(
  result,
  (newValue) => {
    myChild1.value && (myChild1.value.data = newValue);
    myChild2.value && (myChild2.value.data = newValue);
    myChild3.value && (myChild3.value.data = newValue);
    myChild4.value && (myChild4.value.data = newValue);
  },
  { deep: true }
);
</script>

<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="Bars"
    :is-full-page="true"
    color="#E6F0FF"
  />
  <!-- <div class="sectionaccomadation container-fluid">
    <div class="panel panel-primary">
      <div class="d-flex text-center gap-2 mt-4">
        <div v-if="step === 1">
          <button
            type="button"
            :class="step === 1 ? 'mansih' : 'over'"
            class="btn btnSuccess btnSuccess"
          >
            1
          </button>
          <p>
            {{ userId ? "User Details" : "Add Staff" }}
          </p>
        </div>
        <div v-else>
          <button type="button" class="btn btnSuccess btnSuccess">
            1
          </button>
          <p>Add Staff</p>
        </div>
        <div v-if="step <= 2">
          <button
            type="button"
            :class="step === 2 ? 'Btnonovber' : null"
            class="btn btnAS"
          >
            2
          </button>
          <p>Notifications</p>
        </div>
        <div v-else>
          <button type="button" class="btn btnSuccess btnSuccess">
            2
          </button>
          <p>Notifications</p>
        </div>
        <div v-if="step <= 3">
          <button
            type="button"
            :class="step === 3 ? 'Btnonovber' : null"
            class="btn btnAS"
          >
            3
          </button>
          <p>Pay</p>
        </div>
        <div v-else>
          <button type="button" class="btn btnSuccess btnSuccess">
            3
          </button>
          <p>Pay</p>
        </div>
      </div>

      <form class="form-horizontal" action="/action_page.php">
        <div class="d-flex justify-content-end gap-3 mb-4" v-show="step !== 5">
          <button
            @click.prevent="prev()"
            :disabled="step === 1"
            class="btn btn-light px-5"
          >
            &lt; Back
          </button>
          <button
            v-if="step < 3"
            @click.prevent="next()"
            class="btn btn-light px-5"
          >
            Next >
          </button>
          <button
            v-else
            @click.prevent="handleComplete()"
            class="btn btnNexeAs px-5"
          >
            Complete >
          </button>
        </div>
        <fieldset v-if="step == 1">
          <div class="panel-body">
            <div class="d-flex gap-4">
              <ContactDetailsEmployee
                ref="myChild1"
                :data="result.lenght === 0 ? [] : result"
              />
              <LoginEmployee v-if="!userId" ref="myChild2" :data="result" />
            </div>
          </div>
        </fieldset>
        <fieldset v-if="step == 2">
          <div class="panel-body">
            <AddStaffNotifications ref="myChild3" :data="result" />
          </div>
        </fieldset>
        <fieldset v-if="step == 3">
          <div class="panel-body">
            <EmployeePay ref="myChild4" :data="result" />
          </div>
        </fieldset>
      </form>
    </div>
  </div> -->
  <div class="cmx-dashcusprosection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#ContactDetails"
          >
            {{ userId ? "User Details" : "Add Staff" }}</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#AddStaff">
            Notifications</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#Pay"> Pay</a>
        </li>
      </ul>
    </div>
    <div class="cmx-tabsection">
      <div class="tab-content">
        <div class="tab-pane show active" id="ContactDetails">
          <ContactDetailsEmployee
            ref="myChild1"
            :key="result.length"
            :data="result.lenght === 0 ? [] : result"
            :userId="userId"
            :handleUpdateAll="handleUpdateAll"
            :handleAddEmploy="handleAddEmploy"
            :loginInfo="myChild2 ? myChild2.handleLoginInfo : null"
          />
          <LoginEmployee
            v-if="!userId"
            :key="result.length"
            ref="myChild2"
            :data="result.lenght === 0 ? [] : result"
            :userId="userId"
          />
        </div>
        <div class="tab-pane show" id="AddStaff">
          <AddStaffNotifications
            ref="myChild3"
            :key="result.length"
            :data="result.lenght === 0 ? [] : result"
            :userId="userId"
            :handleUpdateAll="handleUpdateAll"
            :handleAddEmploy="handleAddEmploy"
          />
        </div>
        <div class="tab-pane show" id="Pay">
          <EmployeePay
            ref="myChild4"
            :key="result.length"
            :data="result.lenght === 0 ? [] : result"
            :userId="userId"
            :handleUpdateAll="handleUpdateAll"
            :handleAddEmploy="handleAddEmploy"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.accomdationset-head {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-left: 50px;
}

.accordion-item .pages h3 {
  font-size: 13.5px;
  margin-bottom: 0;
  font-weight: 600;
}

.btnAS {
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 120px;
  border: 0.5px solid #ededed;
}

.btnSuccess {
  background: #24ff00;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 120px;
  border: none;
  text-align: center;
}

.btnNexeAs {
  background: #ededed;
  box-shadow: 0px 2.952px 2.952px 0px rgba(0, 0, 0, 0.15);
}
.Btnonovber {
  background: #eee;
}

ul.link-section {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

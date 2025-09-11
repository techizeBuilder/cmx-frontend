<script setup>
import { ref } from "vue";
import wel from "../Icons/wel.png";
import StepOne from "./StepOne.vue";
import StepTwo from "./StepTwo.vue";
import StepThree from "./StepThree.vue";
import StepFour from "./StepFour.vue";
import LastStep from "./LastStep.vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { showErrorToast, showSuccessToast } from "../../toster";
import axios from "axios";
import isEqual from "lodash/isEqual";

const apiUrl = import.meta.env.VITE_API_URL;
const route = useRoute();
const child1 = ref(null);
const child2 = ref(null);
const child3 = ref(null);
const child4 = ref(null);
const props = defineProps(["customerData"]);
const customerData = ref({});
const step = ref(1);

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

const next = async () => {
  if (step.value === 1) {
    const firstChildData = await child1.value.handleSubmitStep1();
    if (firstChildData) {
      customerData.value = firstChildData;
      step.value = step.value + 1;
    }
  } else if (step.value === 2) {
    const secondChildData = await child2.value.handleSubmitStep2();
    if (secondChildData) {
      customerData.value = {
        ...customerData.value,
        ...secondChildData,
      };
      step.value = step.value + 1;
    }
  } else if (step.value === 3) {
    const thirdChildData = await child3.value.handleSubmitStep3();
    if (thirdChildData) {
      customerData.value = {
        ...customerData.value,
        ...thirdChildData,
      };
      step.value = step.value + 1;
    }
  } else {
    step.value = step.value + 1;
  }
};
const prev = () => {
  step.value = step.value - 1;
};

const updateEstimate = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/estimateProfile/Update`, data);
    console.log("Data After Updation", response);
    showSuccessToast(response.data.msg);
  } catch (error) {
    handleError(error);
  }
};

const handleComplete = async () => {
  const fourthChildData = await child4.value.handleSubmitStep4();
  if (fourthChildData) {
    customerData.value = {
      ...customerData.value,
      ...fourthChildData,
    };
    customerData.value.estimateToken = route.params.token;
    if (!isEqual(props.customerData, customerData.value)) {
      await updateEstimate(customerData.value);
    } else {
      showErrorToast("Data hasn't changed. No update required");
    }
  }
};

watch(props, () => {
  customerData.value = props.customerData;
});
</script>

<template>
  <div class="sectionaccomadation container-fluid">
    <ul class="link-section">
      <li class="li-drop" id="paymentX">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item cmxdashboard-set-main">
            <div class="pages">
              <div
                class="accordion-button collapsed folderXAccor"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapsecmsone"
                aria-expanded="true"
              >
                <div class="accomdationset-head">
                  <img class="sidebar-icon" :src="wel" alt="wel" />
                  <h3>Welcome Form</h3>
                </div>
              </div>
            </div>
            <div
              id="flush-collapsecmsone"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="scrool-delevry">
                <ul class="nav nav-nav nav-tabs">
                  <li class="nav-item">
                    <a
                      class="nav-link show active"
                      data-bs-toggle="tab"
                      href="#Summary"
                    >
                      Owner Information</a
                    >
                  </li>
                </ul>
              </div>
              <div class="cmx-tabsection">
                <div class="tab-content">
                  <div class="tab-pane show active" id="Summary">
                    <div class="container" id="masnns">
                      <div class="panel-group">
                        <div class="panel panel-primary">
                          <div class="d-flex gap-2 mt-4">
                            <button
                              v-if="step === 1"
                              type="button"
                              class="btn btnAS"
                            >
                              1
                            </button>
                            <button
                              v-else
                              type="button"
                              class="btn btnSuccess btnSuccess"
                            >
                              1
                            </button>
                            <button
                              v-if="step <= 2"
                              type="button"
                              class="btn btnAS"
                            >
                              2
                            </button>
                            <button v-else type="button" class="btn btnSuccess">
                              2
                            </button>
                            <button
                              v-if="step <= 3"
                              type="button"
                              class="btn btnAS"
                            >
                              3
                            </button>
                            <button v-else type="button" class="btn btnSuccess">
                              3
                            </button>
                            <button
                              v-if="step <= 4"
                              type="button"
                              class="btn btnAS"
                            >
                              4
                            </button>
                            <button v-else type="button" class="btn btnSuccess">
                              4
                            </button>
                          </div>
                          Status Bar
                          <form
                            class="form-horizontal"
                            action="/action_page.php"
                          >
                            <fieldset v-if="step == 1">
                              <div class="panel-body">
                                <StepOne
                                  :customerData="customerData"
                                  ref="child1"
                                />
                              </div>
                            </fieldset>
                            <fieldset v-if="step == 2">
                              <div class="panel-body">
                                <StepTwo
                                  :customerData="customerData"
                                  ref="child2"
                                />
                              </div>
                            </fieldset>
                            <fieldset v-if="step == 3">
                              <div class="panel-body">
                                <StepThree
                                  :customerData="customerData"
                                  ref="child3"
                                />
                              </div>
                            </fieldset>
                            <fieldset v-if="step == 4">
                              <div class="panel-body">
                                <StepFour
                                  :customerData="customerData"
                                  ref="child4"
                                />
                              </div>
                            </fieldset>
                            <fieldset v-if="step == 5">
                              <div class="panel-body">
                                <LastStep />
                              </div>
                            </fieldset>
                            <div
                              class="d-flex justify-content-end gap-5"
                              v-show="step !== 5"
                            >
                              <button
                                @click.prevent="prev()"
                                :disabled="step === 1"
                                class="btn btn-light"
                              >
                                &lt; Back
                              </button>
                              <button
                                v-if="step < 4"
                                @click.prevent="next()"
                                class="btn btnNexeAs px-5"
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
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
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
  width: 90px;
  border: 0.5px solid #ededed;
}

.btnSuccess {
  background: #24ff00;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 90px;
  border: none;
}

.btnNexeAs {
  background: #ff8100;
  box-shadow: 0px 2.952px 2.952px 0px rgba(0, 0, 0, 0.15);
}

ul.link-section {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="Bars"
    :is-full-page="true"
    color="#ccdff1"
  />
  <div :key="reRender">
    <nav
      class="navbar sticky-top py-0 FolderXNavbar"
      :style="{ backgroundColor: '#D8D8D8', borderRadius: '2px' }"
    >
      <div class="floderXhe">
        <p class="mb-0 px-2 py-0">
          <small
            >Customer ID: {{ route.params.customerId }} |
            {{ storeCustomerDetails?.lastName }},
            {{ storeCustomerDetails?.firstName }} | &lt;{{
              storeCustomerDetails?.companyName
            }}&gt;</small
          >
        </p>
      </div>
    </nav>
    <div class="px-3">
      <div
        class="d-flex align-items-center gap-3 justify-content-between mt-2 p-5"
      >
        <div class="PaymentBox">
          <div class="d-flex justify-content-start overflow-auto">
            <div class="paymentContent">
              <div class="paymentContentHead p-4">
                <div class="text-nowrap">
                  Total Prior <br />
                  Repairs
                </div>
              </div>
              <div class="paymentContentDeck">-</div>
            </div>
            <div class="paymentContent">
              <div class="paymentContentHead p-4">
                <div class="text-nowrap">
                  Total Customer <br />
                  Sales (TCS)
                </div>
              </div>
              <div class="paymentContentDeck">-</div>
            </div>
          </div>
        </div>

        <div
          class="addCust d-flex align-items-center flex-column gap-3 justify-content-between mt-2"
        >
          <div
            class="d-flex align-items-center gap-3 justify-content-between mt-2"
          >
            <button
              type="button"
              class="btn"
              :style="{ backgroundColor: '#FFB66C', color: '#000' }"
              ref="openEstimateModel"
              @click="handleEstimateOpen"
            >
              <img
                class="sidebar-icon"
                :src="plus"
                alt="plus"
              />&nbsp; New Estimate Profile
            </button>
          </div>
          <div
            class="d-flex align-items-center gap-3 justify-content-between mt-2"
          >
            <button
              type="button"
              class="btn"
              :style="{ backgroundColor: '#FF8100', color: '#000' }"
            >
              <img
                class="sidebar-icon"
                :src="plus"
                alt="plus"
              />&nbsp;&nbsp;&nbsp; New FolderX
            </button>
          </div>
        </div>
      </div>
      <div class="cmxdashboard-set-main">
        <div class="sectionaccomadation">
          <router-link
            to="/newcustomer"
            class="btn btn-light mb-3"
            >Add Customer</router-link
          >
          <ul class="link-section">
            <li class="li-drop">
              <div
                class="accordion accordion-flush"
                id="accordionCustomerDetailsProfileMain"
              >
                <div class="accordion-item">
                  <div class="pages d-flex align-items-center">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsCustomerDetailsProfileMain"
                      aria-expanded="false"
                      id="CustomerDetailCloseButton"
                    >
                      <div class="accomdationset-head">
                        <img
                          class="sidebar-icon"
                          :src="cus01"
                          alt="cus01"
                        />
                        <h3>Customer Detail</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsCustomerDetailsProfileMain"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionCustomerDetailsProfileMain"
                    v-if="isAuthenticatedComponent"
                  >
                    <CustomerDetailsProfileMain />
                  </div>
                </div>
              </div>
            </li>
            <li class="li-drop">
              <div
                class="accordion accordion-flush"
                id="accordionVehicleList"
              >
                <div class="accordion-item">
                  <div class="pages d-flex align-items-center">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      id="vehicalTab"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsVehicleList"
                      aria-expanded="false"
                      ref="vehicalTab"
                    >
                      <div class="accomdationset-head">
                        <!-- <i class="fas fa-exchange-alt sidebar-icon "></i> -->
                        <!-- <i class="fa-solid fa-users sidebar-icon"></i> -->
                        <img
                          class="sidebar-icon"
                          :src="vehi01"
                          alt="vehi01"
                        />

                        <h3>Vehicle List</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsVehicleList"
                    ref="flushCollapsVehicleList"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionVehicleList"
                    v-if="isAuthenticatedComponent"
                  >
                    <VehicleListProfileMain
                      @reRender="handleReRender"
                    />
                  </div>
                </div>
              </div>
            </li>
            <!-- <li class="li-drop">
              <div class="accordion accordion-flush" id="CustomerLink">
                <div class="accordion-item">
                  <div class="pages d-flex align-items-center">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapsCustomerLink"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <i class="fas fa-exchange-alt sidebar-icon "></i>
                        <i class="fa-solid fa-users sidebar-icon"></i>
                        <img class="sidebar-icon" :src="Link01" alt="Link01" />
                        <h3>Customer Link (Family Members)</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-collapsCustomerLink"
                    class="accordion-collapse collapse"
                    data-bs-parent="#CustomerLink"
                    v-if="isAuthenticatedComponent"
                  >
                    <CustomerLinkProfileMain />
                  </div>
                </div>
              </div>
            </li> -->
            <li class="li-drop">
              <div
                class="accordion accordion-flush"
                id="CustomerFolderXHistory"
              >
                <div class="accordion-item">
                  <div class="pages">
                    <div
                      class="accordion-button collapsed folderXAccor"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-CustomerFolderXHistory"
                      aria-expanded="false"
                    >
                      <div class="accomdationset-head">
                        <!-- <i class="fas fa-exchange-alt sidebar-icon "></i> -->
                        <!-- <i class="fa-solid fa-users sidebar-icon"></i> -->
                        <img
                          class="sidebar-icon"
                          :src="clock01"
                          alt="clock01"
                        />
                        <h3>Customer RO History</h3>
                      </div>
                    </div>
                  </div>
                  <div
                    id="flush-CustomerFolderXHistory"
                    class="accordion-collapse collapse"
                    data-bs-parent="#CustomerFolderXHistory"
                    v-if="isAuthenticatedComponent"
                  >
                    <CustomerFolderXHistoryProfileMain />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div
            class="d-flex justify-content-end py-5"
            :style="{ marginRight: '20px' }"
          >
            <a
              href="#"
              class="ms-4"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  width="30"
                  height="30"
                  rx="10"
                  fill="url(#pattern0)"
                />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlink:href="#image0_1999_24"
                      transform="scale(0.0078125)"
                    />
                  </pattern>
                  <image
                    id="image0_1999_24"
                    width="128"
                    height="128"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFIUlEQVR4Ae2daascRRSGHxBJyC8QiRqNa9xNouIeCZK474kSEndNxA2URPRPSIiSP+QHP/hBQSRx33eNxn3lIAeaYRJqbvdMV53zFgx171Az0+d5n6ruO9zuBjUREAEREAEREAEREAEREAEREAEREAEREAEREAER6EPgduBlYL8evRgYw9v6BDHGa9cD/wD/6jEIA2O5dowgl/qZ9yn4QYLvTiBj2ky7XwIMLoAxbaZJgOF3fxIg+aoiASRAM3sAtAtIvgvYkXy2do/eh/q5qV3AGuBPSTDYXwJ/Axe1swP4f0svBp4DduvRi4ExvLS18LW9IiACIiACIiACIiACIiACIiACIlAZgeXAFuBuwH5WS0TgeODNzjeVbwD2nFoCAscBb3XC9+/qDwArE9SfusQTgINTwncJ3gdWpSYUuHgL/52jhO8SfACcHJhDytJOLAxfEgTUw8J/t2Dme/jefwicEpBHqpJOAt5bQvhdCVanIhao2L7huwQfAacG4pKiFDuStyN6D7Fv/7EkaMeb0wALrG/ok6//HLB/dVOrmMDpwCdzCN9l+EIS1Ju+hf/pHMPvSnB2vRhybtkZCwq/K8E5OVHXV/WZwGcLmPkevvdfApJgZB/GCr8rwbkjM0j78WcBdmTuYYzVfwWclzaFkQo/H/i6gvBduu+AdSOxSPexF1QWviRYoIIW/jcVzXwP3/vvAbs+ktocCFxYefhdCey8SLUBCdiZsd9WPPM9fO9/AC4ZsP7Ub2WXR2sp/K4EOqu3p7oWvh1hO9TWelsJJMESJbgMONRw+C7rYeDqJTJI+7Io4XcluCZtmjMWfjnwY4CZ7+F7byvBhhlZpBt+RdDwXYKfgWvTpVpY8JXATwFnvofvvSSYIsRVScLvSrBxCoeUT2UL3yX4BUgvwXWAgXAo2frfgBtTTnsge/guu0lwUzYJNgG/Jp75Hr73vwM3Z5FA4U/f5aWQYLNm/lGPd0yCW6KuBNcDtr/zZU/9dBYmwa3RJLhB4c8k/h8t3iruSNLeAVhBmvGzMfgLuOdIUFt5/k6F30t8k+DeVsKe3M67FH6v8H3FNAm2TcKt/Xe7+KLuGDLbku+BT+ubksCuvqnwhwvfhTAJttc+87cq/EGWfQ99sjcJ7IZcVTaFP/ysnxTAfrcbSFUngd3SzDZs2gbrueG52N3EH6tlGXhA4Y8ivkmwc2wJHlT4o4Tvq6pJsGssCR5S+KOG35Xg8UVL8LDCryL8rgRPLEqCRwBbevzD1dfBwjJ5ct4SPKrwqxbfJHhqXhI8rfCrDr+7Eu8ZWoJntOQ3E76L8PxQEtj3z/6m6ttiYd/R9G5vS4BmJ4DdKKN3s+vgaea3ycDuetK77ZMAzU6AZ3unDxwL2DdNe4H9C3q8FlA6q2lR/F5q/T+LXwwogNWkVkhAAhSCijpMAkRNtrAuCVAIKuowCRA12cK6JEAhqKjDJEDUZAvrkgCFoKIOkwBRky2sSwIUgoo6TAJETbawLglQCCrqMAkQNdnCuiRAIaiowyRA1GQL65IAhaCiDpMAUZMtrEsCFIKKOkwCRE22sC4JUAgq6jAJEDXZwrokQCGoqMMkQNRkC+uSAIWgog6TAFGTLaxLAhSCijpMAkRNtrCuFwKeGra7sHYNA+yys9FOSU93a7g+Ji8DXg8kwavAMX2AZHztCsCufffKAk+rHvr0bdt2O7V+ecYAVbMIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiEAtBP4DAmNPss3q36UAAAAASUVORK5CYII="
                  />
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade login-popup-dashtwo"
      id="NewEstimateProfileModule"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="section referpagesection">
              <div class="header-Refershop">
                <div class="header-nom">
                  <div class="silde">
                    <div
                      class="sliderone d-flex align-items-center justify-content-between w-100"
                    >
                      <h5
                        class="m-0"
                        :style="{ color: '#636363' }"
                      >
                        Open New Estimate Profile | FolderX
                      </h5>
                      <button
                        id="closeButtonEstimate"
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        ref="closeButtonEstimate"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="space-btm-space">
                  <div class="mt-2">
                    <div
                      class="form-check d-flex align-items-center gap-2"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="NewEstimate"
                        name="option1"
                        value="something"
                        style="width: 25px; height: 25px"
                      />
                      <label
                        class="form-check-label"
                        for="NewEstimate"
                        >New Estimate Profile</label
                      >
                    </div>
                  </div>
                  <div class="mt-2">
                    <div
                      class="form-check d-flex align-items-center gap-2"
                    >
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="NewFolderX"
                        name="option1"
                        value="something"
                        style="width: 25px; height: 25px"
                      />
                      <label
                        class="form-check-label"
                        for="NewFolderX"
                        >New FolderX</label
                      >
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-lg-6 px-4">
                      <div class="mt-4">
                        <p class="datexlable">
                          First name<span
                            v-if="firstNameErrorMessage"
                            class="errors"
                            >*</span
                          >
                        </p>
                        <div class="customerXBox">
                          <input
                            v-model="firstName"
                            class="form-control"
                            type="text"
                          />
                           <span class="errors" v-if="firstNameErrorMessage">{{ firstNameErrorMessage }}</span>
                        </div>
                      </div>
                      <div class="mt-4">
                        <p class="datexlable">
                          Last name<span
                            v-if="lastNameErrorMessage"
                            class="errors"
                            >*</span
                          >
                        </p>
                        <div class="customerXBox">
                          <input
                            v-model="lastName"
                            class="form-control"
                            type="text"
                          />
                          <span class="errors" v-if="lastNameErrorMessage">{{ lastNameErrorMessage }}</span>
                        </div>
                      </div>

                      <div class="mt-4">
                        <p class="datexlable">
                          Phone / Cell 1<span
                            v-if="phoneErrorMessage"
                            class="errors"
                            >*</span
                          >
                        </p>
                        <div class="customerXBox">
                          <input
                            v-model="phone"
                            class="form-control"
                            type="text"
                            @input="phone = formatPhoneNumber(phone)"
                          />
                           <span class="errors" v-if="phoneErrorMessage">{{ phoneErrorMessage }}</span>
                        </div>
                      </div>
                      <div class="mt-4">
                        <p class="datexlable">
                          Phone 2<span
                            v-if="phone2ErrorMessage"
                            class="errors"
                            >*</span
                          >
                        </p>
                        <div class="customerXBox">
                          <input
                            v-model="phone2"
                            class="form-control"
                            type="text"
                            @input="
                              phone2 = formatPhoneNumber(phone2)
                            "
                          />
                            <span class="errors" v-if="phone2ErrorMessage">{{ phone2ErrorMessage }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 px-4">
                      <div class="row">
                        <div class="col-sm-12 col-md-12">
                          <div class="mt-4">
                            <p class="datexlable">
                              Email Address<span
                                v-if="emailErrorMessage"
                                class="errors"
                                >*</span
                              >
                            </p>
                            <div class="customerXBox">
                              <input
                                v-model="email"
                                class="form-control"
                                type="text"
                              />
                                <span class="errors" v-if="emailErrorMessage">{{ emailErrorMessage }}</span>

                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                          <div class="mt-4">
                            <p class="datexlable">
                              Owner<span
                                v-if="ownerErrorMessage"
                                class="errors"
                                >*</span
                              >
                            </p>
                            <div class="customerXBox">
                              <select
                                v-model="owner"
                                class="form-select"
                              >
                                <option
                                  selected
                                  disabled
                                >
                                  Owner
                                </option>
                                <option
                                  :value="
                                    storeCustomerDetails?.firstName
                                  "
                                >
                                  {{
                                    storeCustomerDetails?.firstName
                                  }}
                                </option>
                                <option
                                  v-for="item in storeFamilyDetails"
                                  :value="item._id"
                                >
                                  {{ item.firstName }}
                                </option>
                                <!-- <option value="">Add Vehicals</option> -->
                              </select>
                                <span class="errors" v-if="ownerErrorMessage">{{ ownerErrorMessage }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                          <div class="mt-4">
                            <p class="datexlable">
                              Driver<span
                                v-if="driverErrorMessage"
                                class="errors"
                                >*</span
                              >
                            </p>
                            <div class="customerXBox">
                              <select
                                v-model="driver"
                                class="form-select"
                              >
                                <option
                                  selected
                                  disabled
                                >
                                  Driver
                                </option>
                                <option
                                  :value="
                                    storeCustomerDetails?.firstName
                                  "
                                >
                                  {{
                                    storeCustomerDetails?.firstName
                                  }}
                                </option>
                                <option
                                  v-for="item in storeFamilyDetails"
                                  :value="item._id"
                                >
                                  {{ item.firstName }}
                                </option>
                                <!-- <option value="">Add Vehicals</option> -->
                              </select>
                                <span class="errors" v-if="driverErrorMessage">{{ driverErrorMessage }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-12">
                          <div class="mt-4">
                            <p class="datexlable">
                              Select Vehicle<span
                                v-if="vehicalIdErrorMessage"
                                class="errors"
                                >*</span
                              >
                            </p>
                            <div class="customerXBox">
                              <select
                                @change="handleAddVehical"
                                v-model="vehicalId"
                                class="form-select"
                              >
                                <option
                                  selected
                                  disabled
                                >
                                  Select Vehicle
                                </option>
                                <option
                                  v-for="item in storeVehicalDetails"
                                  :value="item?._id"
                                >
                                  {{ item?.vin }}
                                </option>
                                <option
                                  class="btn btn-light text-nowrap"
                                  value="AddVehical"
                                >
                                  Add Vehicals
                                </option>
                              </select>
                                <span class="errors" v-if="vehicalIdErrorMessage">{{ vehicalIdErrorMessage }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 mt-5">
                      <div
                        class="btn-btn d-flex justify-content-end gap-4"
                      >
                        <button
                          data-bs-dismiss="modal"
                          class="btn btn-light text-nowrap"
                          type="button"
                        >
                          Cancel
                        </button>
                        <button
                          @click="handleEstimate"
                          class="btn btn-light text-nowrap"
                          type="submit"
                          :style="{ 'background-color': '#6BFA65' }"
                        >
                          <i class="fa-regular fa-floppy-disk"></i>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import cus01 from './Icons/cus01.png';
import vehi01 from './Icons/vehi01.png';
import Link01 from './Icons/Link01.png';
import clock01 from './Icons/clock01.png';
import plus from './Icons/plus.png';
import CustomerDetailsProfileMain from './CustomerDetailsProfile/CustomerDetailsProfileMain.vue';
import VehicleListProfileMain from './VehicleListProfile/VehicleListProfileMain.vue';
import CustomerLinkProfileMain from './CustomerLinkProfile/CustomerLinkProfileMain.vue';
import CustomerFolderXHistoryProfileMain from './CustomerFolderXHistoryProfile/CustomerFolderXHistoryProfileMain.vue';
import { showSuccessToast, showErrorToast } from '../toster';
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import {
  watch,
  onMounted,
  ref,
  onBeforeUnmount,
  computed,
  nextTick,
} from 'vue';
import { useStore } from 'vuex';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const isLoading = ref(false);
const store = useStore();
const staffId = localStorage.getItem('userId');
const isAuthenticatedComponent = ref(false);
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem('AuthToken');
const router = useRouter();
const route = useRoute();
const storeCustomerDetails = computed(
  () => store.getters.getCustomerDetails
);
const storeVehicalDetails = computed(() => store.getters.getVehicals);
const storeFamilyDetails = computed(
  () => store.getters.getFamilyMenbers
);
const reRender = ref(false);

const handleFormSubmit = async (
  values,
  endpoint,
  resetFormCallback,
  closeButtonId
) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    values.staffId = staffId;
    const response = await axios.post(
      `${apiUrl}/${endpoint}`,
      values,
      config
    );
    const closeButton = document.getElementById(closeButtonId);
    if (response.data.success) {
      closeButton.click();
      showSuccessToast(response.data.msg);
      router.push(
        `/estimatexprofile/${response.data.data.estimateId}`
      );
      resetFormCallback();
    }
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response && error.response.data.msg instanceof Array) {
    error.response.data.msg.forEach((errorMsg) => {
      showErrorToast(errorMsg);
    });
    console.log('An error occurred while fetching data', error);
  } else if (error.response && error.response.status === 401) {
    showErrorToast(error.response.data.message);
    localStorage.clear();
    router.push('/login');
  } else if (error.response) {
    localStorage.clear();
    router.push('/login');
    showErrorToast(error.response.data.msg);
    console.error('An error occurred while fetching data', error);
  } else {
    showErrorToast('Some Error Occurred!!!!');
    console.error(
      'An error occurred while fetching data. Response was not available.',
      error
    );
  }
};

//Add Open New Estimate Profile | FolderX
const estimateSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(3, 'First name must be at least 3 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(3, 'Last name must be at least 3 characters'),
  phone: yup
    .string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      'Invalid phone number format'
    )
    .required('Phone number is required')
    .label('Phone number'),
  phone2: yup
    .string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      'Invalid phone number format'
    )
    .required('Phone number is required')
    .label('Phone number'),
  email: yup
    .string()
    .trim()
    .email('Invalid email address')
    .required('Email is required'),
  owner: yup.string().required('owner is required'),
  driver: yup.string().required('driver is required'),
  vehicalId: yup.string().required('Vehical  is required'),
});

const {
  handleSubmit: handleEstimateSubmit,
  resetForm: resetFormEstimate,
  setValues,
} = useForm({
  validationSchema: estimateSchema,
  initialValues: {
    ...storeCustomerDetails.value,
    phone2: formatPhoneNumber(storeCustomerDetails.value.phone2),
    phone: formatPhoneNumber(storeCustomerDetails.value.phone),
  },
});

const { value: firstName, errorMessage: firstNameErrorMessage } =
  useField('firstName');
const { value: lastName, errorMessage: lastNameErrorMessage } =
  useField('lastName');
const { value: phone, errorMessage: phoneErrorMessage } =
  useField('phone');
const { value: phone2, errorMessage: phone2ErrorMessage } =
  useField('phone2');
const { value: email, errorMessage: emailErrorMessage } =
  useField('email');
const { value: owner, errorMessage: ownerErrorMessage } =
  useField('owner');
const { value: driver, errorMessage: driverErrorMessage } =
  useField('driver');
const { value: vehicalId, errorMessage: vehicalIdErrorMessage } =
  useField('vehicalId');

const handleEstimate = handleEstimateSubmit(async (value) => {
  console.log('Save button clicked for New Estimate Profile. Form values:', value);
  value.phone = formatPhoneNumberToDigit(value.phone);
  value.phone2 = formatPhoneNumberToDigit(value.phone2);
  value.customerId = storeCustomerDetails.value._id;
  value.shopId = localStorage.getItem('shopId');
  value.insuranceId = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  console.log('Submitting with insuranceId:', value.insuranceId);
  isLoading.value = true;
  await handleFormSubmit(
    value,
    'estimateProfile/register',
    resetFormEstimate,
    'closeButtonEstimate'
  );
  isLoading.value = false;
});
onMounted(() => {
  const newEstimateProfileModule = document.getElementById(
    'NewEstimateProfileModule'
  );

  if (newEstimateProfileModule) {
    newEstimateProfileModule.addEventListener(
      'hidden.bs.modal',
      resetFormNewEstimate
    );
  }
  axios
    .post(`${apiUrl}/api/auth/check`, { token: AuthToken })
    .then((response) => {
      isAuthenticatedComponent.value = response.data.success;
    })
    .catch((error) => {
      handleError(error);
    });
});

const resetFormNewEstimate = () => {
  resetFormEstimate();
  setValues(
    storeCustomerDetails.value ? storeCustomerDetails.value : {}
  );
};

onBeforeUnmount(() => {
  document
    .getElementById('NewEstimateProfileModule')
    .removeEventListener('hidden.bs.modal', resetFormNewEstimate);
});

const closeButtonEstimate = ref(null);
const vehicalTab = ref(null);
const flushCollapsVehicleList = ref(null);

const handleAddVehical = () => {
  if (vehicalId.value === 'AddVehical') {
    closeButtonEstimate.value.click();
    !flushCollapsVehicleList.value.classList.contains('show') &&
      vehicalTab.value.click();
    const addVehical = document.getElementById('AddNewVehicleButton');
    addVehical.click();
  }
};

const openEstimateModel = ref(null);
const handleReRender = () => {
  reRender.value = true;
  nextTick(() => {
    openEstimateModel.value.click();
  });
};

watch(storeCustomerDetails, () => {
  setValues(
    storeCustomerDetails.value ? storeCustomerDetails.value : {}
  );
});

function formatPhoneNumber(input) {
  if (input) {
    let phoneInput = input.replace(/\D+/g, '');
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
  let phoneInput = input.replace(/\D+/g, '');
  if (phoneInput.length >= 4 && phoneInput.length <= 6) {
    return phoneInput.slice(0, 3) + phoneInput.slice(3);
  } else if (phoneInput.length >= 7) {
    return (
      phoneInput.slice(0, 3) +
      phoneInput.slice(3, 6) +
      phoneInput.slice(6)
    );
  } else {
    return phoneInput;
  }
}

const handleEstimateOpen = () => {
  const modalElement = document.getElementById(
    'NewEstimateProfileModule'
  );

  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  setValues({
    ...storeCustomerDetails.value,
    phone2: formatPhoneNumber(storeCustomerDetails.value.phone2),
    phone: formatPhoneNumber(storeCustomerDetails.value.phone),
  });
};
</script>

<style scoped>
.addCust .btn {
  min-width: 210px;
}

.section.referpagesection .btn-light {
  font-size: 14px;
  font-weight: 600;
  background: #f0f1f3;
  box-shadow: 0px 3.591px 3.591px 0px rgba(0, 0, 0, 0.15);
  width: auto;
  padding: 5px 15px;
}
.errors {
  color: red;
}
</style>

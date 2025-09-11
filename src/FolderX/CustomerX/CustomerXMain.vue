<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { showSuccessToast } from "../../toster";
import { useRouter } from "vue-router";

const router = useRouter();
const apiUrl = import.meta.env.VITE_API_URL;
const store = useStore();
const storeCustomerDetails = computed(() => store.getters.getCustomerDetails);

function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D+/g, "");
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(
    6,
    10
  )}`;
}
</script>
<template>
  <div class="estimatedetailsection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs mt-2">
        <li class="nav-item">
          <a class="nav-link show active" data-bs-toggle="tab" href="#CUSTOMER"
            >CUSTOMER</a
          >
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-lg-12 col-rowset">
        <div class="d-lg-flex align-items-end gap-4 mb-4 justify-content-end">
          <div class="d-flex align-items-end gap-4 justify-content-end">
            <div class="d-flex align-items-end gap-4 justify-content-end">
              <a
                :href="`/customeridprofile/${storeCustomerDetails?.customerId}`"
                target="_blank"
                class="btn btn-light text-nowrap"
              >
                <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
              </a>
              <!-- <button
                type="button"
                class="btn btn-light text-nowrap"
                @click="onSubmit"
                :disabled="true"
              >
                <i class="fa-regular fa-floppy-disk"></i> Save
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row px-lg-5 pt-4 pt-sm-0 cutsomerRow">
      <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
        <h6>
          Customer ID:
          {{
            storeCustomerDetails ? storeCustomerDetails.customerId : "XXXXXXX"
          }}
        </h6>
        <div class="mt-3">
          <p class="datexlable">First name</p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              :disabled="true"
              :value="storeCustomerDetails?.firstName"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">Last name</p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              :value="storeCustomerDetails?.lastName"
              :disabled="true"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">Phone / Cell 1</p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              :value="formatPhoneNumber(storeCustomerDetails?.phone)"
              :disabled="true"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">Phone 2</p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              :value="formatPhoneNumber(storeCustomerDetails?.phone2)"
              :disabled="true"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">Email Address</p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              :value="storeCustomerDetails?.email"
              :disabled="true"
            />
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol cutsomerRowSec">
        <div class="mt-3">
          <p class="datexlable">Address</p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              :value="storeCustomerDetails?.address"
              :disabled="true"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">City</p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              :value="storeCustomerDetails?.city"
              :disabled="true"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">State</p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              :value="storeCustomerDetails?.state"
              :disabled="true"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">Zip Code</p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              :value="storeCustomerDetails?.zipCode"
              :disabled="true"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">Country</p>
          <div class="customerXBox">
            <select
              class="form-select"
              :value="storeCustomerDetails?.country"
              :disabled="true"
            >
              <option selected disabled>Country</option>
              <option value="France">France</option>
              <option value="France">France</option>
              <option value="France">France</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-4 cutsomerCol">
        <div class="mt-3">
          <p class="datexlable">Is this a Company?</p>
          <div
            class="customerXBox"
            style="display: inline-block; padding: 5px 9px 5px 0px;"
          >
            <input
              class="form-check-input"
              type="checkbox"
              style="width: 25px; height: 25px;"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">Company Name</p>
          <div class="customerXBox">
            <input
              class="form-control"
              type="text"
              :value="storeCustomerDetails?.companyName"
              :disabled="true"
            />
          </div>
        </div>
        <div class="mt-3">
          <p class="datexlable">Notepad</p>
          <div class="customerXBox">
            <textarea
              :disabled="true"
              class="form-control"
              rows="5"
              id="comment"
              name="text"
              style="resize: none;"
            ></textarea>
          </div>
        </div>
      </div>
    </div></div
></template>

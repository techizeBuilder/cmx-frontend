<script setup>
import createEst from "./Icons/createEst.png";
import CreateFolderx from "./Icons/CreateFolderx.png";
import importEstimate from "./importEstimate.vue";
</script>
<template>
  <div class="px-3 ShopAllPages">
    <div class="mainhead pb-2 mt-3">
      <div class="d-flex align-items-center gap-3 justify-content-between">
        <router-link to="/">Import Estimate</router-link>
      </div>
    </div>
    <div>
      <div class="input-group w-25 mt-4 mb-3">
        <input
          class="form-control border-end-0 border"
          placeholder="Quick Search"
          type="search"
          id="example-search-input"
        /><span class="input-group-append"
          ><button
            class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
            type="button"
          >
            <i class="fa fa-search"></i></button
        ></span>
      </div>
      <select class="form-select w-auto">
        <option>Filter:</option>
        <option>Date</option>
        <option>Last name</option>
        <option>Insurance</option>
        <option>Claim#</option>
        <option>Estimate Date</option>
        <option>Imported Date</option>
        <option>Estimate Platform</option>
        <option>Estimate Amount</option>
        <option>Vehicle Year</option>
        <option>Vehicle Make</option>
        <option> VIN</option>
      </select>
    </div>
    <importEstimate />
    <importEstimate />
    <importEstimate />
  </div>
  <div class="modal fade login-popup-dashtwo" id="SelectModule">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100"
                  >
                    <p class="shopnow">Select Action</p>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="space-btm-space">
                <p class="mb-5">Customer Full Name</p>
                <button
                  type="button"
                  class="btn w-100 mb-4 text-left"
                  :style="{ backgroundColor: '#FDAD0E' }"
                >
                  <img
                    :src="createEst"
                    class="me-4"
                    alt="createEst"
                    :style="{ width: '18px' }"
                  />
                  Create Estimate Profile
                </button>
                <br />
                <button
                  type="button"
                  class="btn w-100 mb-5"
                  :style="{ backgroundColor: '#FF8100' }"
                >
                  <img
                    :src="CreateFolderx"
                    class="me-4"
                    alt="CreateFolderx"
                    :style="{ width: '18px' }"
                  />
                  Create FolderX
                </button>
                <div class="btn-btn d-flex justify-content-between gap-5">
                  <button class="Cancel" type="button">Create</button>
                  <button class="submit" type="submit">Import</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

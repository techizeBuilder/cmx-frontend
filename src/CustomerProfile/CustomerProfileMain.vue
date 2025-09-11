<script setup>
import Alert from "./Icons/Alert.png";
import VehiclePreview from "./VehiclePreview.vue";
import RepairHistory from "./RepairHistory.vue";
import LinkedCustomers from "./LinkedCustomers.vue";
import VehiclesOwned from "./VehiclesOwned.vue";
</script>
<template>
  <div class="mainhead pb-2">
    <div class="d-flex align-items-center gap-2 justify-content-start">
      <h5 class="m-0">Customer ID Profile :</h5>
      <h5 class="m-0">XXXXXX</h5>
    </div>
  </div>
  <div class="d-flex align-items-center justify-content-between mt-1">
    <div class="d-flex align-items-center gap-4 justify-content-start">
      <p><small>Customer ID: XXXXXXX</small></p>
      <p><small>| &nbsp;&nbsp;&nbsp; Last Name, First Name</small></p>
      <p><small>| &nbsp;&nbsp;&nbsp; Company Name</small></p>
    </div>
    <div class="dropdown">
      <button
        type="button"
        class="btn dropdown-toggle"
        data-bs-toggle="dropdown"
        :style="{ backgroundColor: '#FF8100', color: '#ffffff' }"
      >
        Action
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#"> Open New RO</a></li>
        <li><a class="dropdown-item" href="#">Print Tags</a></li>
        <li><a class="dropdown-item" href="#">Print Final</a></li>
      </ul>
    </div>
  </div>
  <div class="card mt-4">
    <div class="card-body">
      <div class="row">
        <div class="col-lg-12 col-rowset">
          <div
            class="d-sm-flex align-items-end gap-4 mb-4 justify-content-between"
          >
            <h6>Customer Details</h6>
            <div class="d-flex align-items-end gap-4 justify-content-end">
              <div class="d-flex align-items-end gap-4 justify-content-end">
                <button type="button" class="btn btn-light">
                  <i class="fa-regular fa-pen-to-square"></i>&nbsp; Edit
                </button>
                <button type="button" class="btn btn-light">
                  <i class="fa-regular fa-floppy-disk"></i> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row pt-4 pt-sm-0">
        <div class="col-sm-12 col-md-2">
          <div class="mt-3">
            <p class="datexlable">First name</p>
            <div class="customerXBox">
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Last name</p>
            <div class="customerXBox">
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Company Name</p>
            <div class="customerXBox">
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-3">
            <div style="padding: 5px 9px 5px 0px;">
              <label for="CompanyQues" class="d-flex align-items-center gap-4">
                <p class="datexlable mb-0">Company?</p>
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="CompanyQues"
                  style="width: 25px; height: 25px;"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-2">
          <div class="mt-3">
            <p class="datexlable">Phone / Cell 1</p>
            <div class="customerXBox">
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Phone 2</p>
            <div class="customerXBox">
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Email Address</p>
            <div class="customerXBox">
              <input class="form-control" type="text" />
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-2">
          <div class="mt-3">
            <p class="datexlable">Address</p>
            <div class="customerXBox">
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">City</p>
            <div class="customerXBox">
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">State</p>
            <div class="customerXBox">
              <input class="form-control" type="text" />
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-2">
          <div class="mt-3">
            <p class="datexlable">Zip Code</p>
            <div class="customerXBox">
              <input class="form-control" type="text" />
            </div>
          </div>
          <div class="mt-3">
            <p class="datexlable">Country</p>
            <div class="customerXBox">
              <select class="form-select">
                <option selected disabled>Country</option>
                <option>France</option>
                <option>France</option>
                <option>France</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div
            class="text-center d-flex items-center flex-column justify-content-center h-100"
          >
            <img
              :src="Alert"
              alt="Alert"
              class="mx-auto"
              :style="{ width: '40px' }"
            />
            <p class="px-0 px-sm-5">
              Updating this profile will change any existing RO’s that are open.
              Only enter 1 person in each profile
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-4">
    <VehiclesOwned />
  </div>
  <div class="mt-4">
    <VehiclePreview />
  </div>
  <div class="mt-4">
    <LinkedCustomers />
  </div>
  <div class="mt-4">
    <RepairHistory />
  </div>
</template>

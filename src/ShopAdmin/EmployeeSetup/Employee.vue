<script setup>
import EmployeePay from "./EmployeePay.vue";
import PermissionsAddEmployee from "./PermissionsAddEmployee.vue";
import LoginEmployee from "./LoginEmployee.vue";
import ContactDetailsEmployee from "./ContactDetailsEmployee.vue";
</script>

<template>
  <div class="employsetupsection">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#staffsetupsectiontwosub"
            >Add Employee
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#EmployeePayEmployee"
            >Employee Pay</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            data-bs-toggle="tab"
            href="#EmployeeNotificationsreesub"
            >Employee Notifications</a
          >
        </li>
      </ul>
    </div>
    <div class="select-option-first-sub">
      <div class="tab-content">
        <div class="tab-pane show active" id="staffsetupsectiontwosub">
          <div class="row">
            <div class="col-lg-12">
              <div
                class="d-lg-flex align-items-end gap-4 mb-4 justify-content-between"
              >
                <h6 class="m-0">Employee Name</h6>
                <div class="d-flex align-items-end gap-4 justify-content-end">
                  <div class="d-flex align-items-end gap-4 justify-content-end">
                    <button type="button" class="btn btn-light text-nowrap">
                      Cancel
                    </button>

                    <button type="button" class="btn btn-light text-nowrap">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex gap-4 flex-nowrap overflow-auto">
            <ContactDetailsEmployee />

            <PermissionsAddEmployee />

            <LoginEmployee />
          </div>
        </div>
        <div class="tab-pane" id="EmployeePayEmployee">
          <EmployeePay />
        </div>

        <div class="tab-pane" id="EmployeeNotificationsreesub">
          <p>good</p>
        </div>
      </div>
    </div>
  </div>
</template>

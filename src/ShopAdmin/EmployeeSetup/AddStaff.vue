<script setup>
import AddStaffStwpper from "./AddStaffStwpper.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userId = route.params.userId;
</script>

<template>
  <div class="px-3 ShopAllPages">
    <div class="mainhead pb-2 mt-3">
      <div class="d-flex align-items-center gap-3 justify-content-between">
        <router-link to="/ShopAdmin">{{
          userId ? "Shop Admin - Update Staff" : "Shop Admin - Add Staff"
        }}</router-link>
      </div>
    </div>

    <div class="shopadmin-stickheadercontantpart">
      <div class="conyter-section d-flex justify-content-end">
        <div class="section-twow">
          <router-link to="/ShopAdmin" class="btn btn-light"
            >Cancel</router-link
          >
        </div>
      </div>
    </div>
    <ul class="link-section">
      <li class="li-drop">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <div
              class="pages accordion-button folderXAccor collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseone"
              aria-expanded="true"
            >
              <div class="accomdationset-head">
                <img
                  class="sidebar-icon"
                  src="../icons//EmployeeSetup.png"
                  alt="EmployeeSetup"
                />
                <h3>
                  {{ userId ? "Update Staff" : "Add Staff" }}
                </h3>
              </div>
            </div>
            <div
              id="flush-collapseone"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionFlushExample"
            >
              <AddStaffStwpper />
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- The Modal -->
</template>

<style scoped>
.btnaddlink.AddBlck button {
  padding: 10px 20px;
  background: #d2d4d7;
  color: rgb(0 0 0);
  border: 1px solid #d1d1d1;
  margin: 0 5px;
  border-radius: 3px;
  font-size: 12px;
  color: #000000;
  font-weight: 600;
}
</style>

<script setup>
import ShopProfileMain from "./ShopProfile/ShopProfileMain.vue";
import EmployeeSetupMain from "./EmployeeSetup/EmployeeSetupMain.vue";
import EmployeePremissionMain from "./EmployeePremission/EmployeePremissionMain.vue";
import EmployeeNotificationMain from "./EmployeeNotification/EmployeeNotificationMain.vue";
import FolderXCustomSettings from "./FolderXCustomSettings/FolderXCustomSettingsMain.vue";
import APIGatewayShopMain from "./APIGatewayShop/APIGatewayShopMain.vue";
import axios from "axios";
import { onMounted, ref, provide, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showErrorToast } from "../toster";

const apiUrl = import.meta.env.VITE_API_URL;
const shopId = localStorage.getItem("shopId");
const AuthToken = localStorage.getItem("AuthToken");
const router = useRouter();
const route = useRoute();

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

const data = ref(null);

const featchData = async (page) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const gotData = await axios.get(
      `${apiUrl}/shop/getAllusers/inShop/${shopId}/${page}`,
      config
    );
    if (gotData?.data?.data?.length > 0) {
      return (data.value = gotData?.data?.data?.[0]?.users);
    } else {
      return (data.value = []);
    }
  } catch (error) {
    handleError(error);
  }
};

const featchDeactive = async (page) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const gotData = await axios.get(
      `${apiUrl}/user/get/all/deactive/${page}/${shopId}`,
      config
    );
    if (gotData?.data?.data?.length > 0) {
      return (data.value = gotData?.data?.data);
    } else {
      return (data.value = []);
    }
  } catch (error) {
    console.log(error);
  }
};

const staffData = featchData(1);
provide("staffData", staffData);
provide("featchData", featchData);
provide("featchDeactive", featchDeactive);
</script>

<template>
  <div class="px-3 ShopAllPages">
    <div class="mainhead pb-2 mt-3">
      <div class="d-flex align-items-center gap-3 justify-content-between">
        <router-link to="/">Shop Admin</router-link>
        <!-- <div class="btnaddlink AddBlck">
          <button data-bs-toggle="modal" data-bs-target="#exampleModaladd">
            Add New Shop
          </button>
          <button data-bs-toggle="modal" data-bs-target="#exampleModalrefer">
            Refer A Shop
          </button>
        </div> -->
      </div>
    </div>

    <div class="shopadmin-stickheadercontantpart">
      <div class="conyter-section d-flex justify-content-end">
        <!-- <div class="section-twow">
          <form action="#" method="post">
            <div class="form-cont">
              <div class="form-group">
                <input
                  type="text"
                  id="shopname"
                  name="shopname"
                  disabled
                  required=""
                  placeholder="Shop ID"
                />
              </div>
              <div class="form-group">
                <select id="timezone" name="timezone" required="">
                  <option value="" selected="">
                    Shop Name
                  </option>
                  Add options for countries here
                  <option value="shopnamelist">
                    shop 1
                  </option>
                  <option value="shopnamelist">
                    shop 2
                  </option>
                  <option value="shopnamelist">
                    shop 3
                  </option>
                  Add more countries as needed
                </select>
              </div>
              <div class="form-group">
                <select id="timeformat" name="timeformat" required="">
                  <option value="" selected="">
                    Active
                  </option>
                  Add options for countries here
                  <option value="USA">
                    United States
                  </option>
                  <option value="UK">
                    United Kingdom
                  </option>
                  Add more countries as needed
                </select>
              </div>
            </div>
          </form>
        </div> -->
      </div>
    </div>
    <ul class="link-section pt-5">
      <li class="li-drop">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <div
              class="pages accordion-button folderXAccor collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseone"
              aria-expanded="false"
            >
              <div class="accomdationset-head">
                <img
                  class="sidebar-icon"
                  src="./icons/store-management.png"
                  alt="storemanagement"
                />
                <h3>Shop Profile</h3>
              </div>
            </div>
            <div
              id="flush-collapseone"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <ShopProfileMain />
            </div>
          </div>
        </div>
      </li>
      <li class="li-drop">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <div
              class="pages accordion-button folderXAccor collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapsetwo"
              aria-expanded="false"
            >
              <div class="accomdationset-head">
                <img
                  class="sidebar-icon"
                  src="./icons/EmployeeSetup.png"
                  alt="EmployeeSetup"
                />
                <h3>Staff Setup</h3>
              </div>
            </div>
            <div
              id="flush-collapsetwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <EmployeeSetupMain />
            </div>
          </div>
        </div>
      </li>
      <li class="li-drop">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <div
              class="pages accordion-button folderXAccor collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapsethree"
              aria-expanded="false"
            >
              <div class="accomdationset-head">
                <img
                  class="sidebar-icon"
                  src="./icons/EmployeePermission.png"
                  alt="EmployeeSetup"
                />
                <h3>Staff Permissions</h3>
              </div>
            </div>
            <div
              id="flush-collapsethree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <EmployeePremissionMain />
            </div>
          </div>
        </div>
      </li>
      <li class="li-drop">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <div
              class="pages accordion-button folderXAccor collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapsefour"
              aria-expanded="false"
            >
              <div class="accomdationset-head">
                <img
                  class="sidebar-icon"
                  src="./icons/EmployeeNotification.png"
                  alt=""
                />
                <h3>Staff Notification</h3>
              </div>
            </div>
            <div
              id="flush-collapsefour"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <EmployeeNotificationMain />
            </div>
          </div>
        </div>
      </li>

      <li class="li-drop">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <div
              class="pages accordion-button folderXAccor collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapsesix"
              aria-expanded="false"
            >
              <div class="accomdationset-head">
                <!-- <i class="fas fa-exchange-alt sidebar-icon "></i> -->
                <!-- <i class="fa-solid fa-users sidebar-icon"></i> -->
                <img class="sidebar-icon" src="./icons/Apigateway.png" alt="" />
                <h3>API Gateway</h3>
              </div>
            </div>
            <div
              id="flush-collapsesix"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <APIGatewayShopMain />
            </div>
          </div>
        </div>
      </li>
      <li class="li-drop">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <div
              class="pages accordion-button folderXAccor collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseseven"
              aria-expanded="false"
            >
              <div class="accomdationset-head">
                <img
                  class="sidebar-icon"
                  src="./icons/TimelineSetup.png"
                  alt=""
                />
                <h3>RO Custom Settings</h3>
              </div>
            </div>
            <div
              id="flush-collapseseven"
              class="accordion-collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <FolderXCustomSettings />
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- The Modal -->
  <div class="modal fade login-popup-dashtwo" id="exampleModaladd">
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
                    <p class="shopnow">Add New Shop</p>
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
                <div class="row" style="align-items: center;">
                  <div class="col-lg-6">
                    <div class="col-same">
                      <div class="box">
                        <form>
                          <div class="input-container text-center mb-3">
                            <input
                              type="text"
                              class="form-control text-center"
                              id="shopID"
                              placeholder="  Shop ID"
                              disabled=""
                            />
                          </div>
                          <div class="input-container mb-3">
                            <select
                              id="shopName"
                              class="form-control text-center"
                              required=""
                            >
                              <option value=""> Shop Name</option>
                              <option value="shop1">Shop 1</option>
                              <option value="shop2">Shop 2</option>
                              <option value="shop3">Shop 3</option>
                              <!-- Add more options as needed -->
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="col-same">
                      <div class="box">
                        <form>
                          <h4 class="headingrefer mb-3">Add a New Shop</h4>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="text"
                              id="Contactname"
                              name="Contactname"
                              placeholder="Contact Name"
                              required=""
                            />
                          </div>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              placeholder="Phone Number"
                              required=""
                            />
                          </div>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Email Address"
                              required=""
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="btn-btn d-flex justify-content-center gap-5">
                      <button class="Cancel" type="button">Cancel</button>
                      <button class="submit" type="submit">Submit</button>
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
  <div class="modal fade login-popup-dashtwo" id="exampleModalrefer">
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
                    <p class="shopnow">Refer a Shop</p>
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
                <div class="row" style="align-items: center;">
                  <div class="col-lg-6">
                    <div class="col-same">
                      <div class="box">
                        <form>
                          <div class="input-container text-center mb-3">
                            <input
                              type="text"
                              class="form-control text-center"
                              id="shopID"
                              placeholder="  Shop ID"
                              disabled=""
                            />
                          </div>
                          <div class="input-container mb-3">
                            <select
                              id="shopName"
                              class="form-control text-center"
                              required=""
                            >
                              <option value=""> Shop Name</option>
                              <option value="shop1">Shop 1</option>
                              <option value="shop2">Shop 2</option>
                              <option value="shop3">Shop 3</option>
                              <!-- Add more options as needed -->
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="col-same">
                      <div class="box">
                        <form>
                          <h4 class="headingrefer mb-3">Refer a Shop</h4>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="text"
                              id="NameofShop"
                              name="NameofShop"
                              placeholder="Name of Shop"
                              required=""
                            />
                          </div>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              placeholder="Phone Number"
                              required=""
                            />
                          </div>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Email Address"
                              required=""
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="btn-btn d-flex justify-content-center gap-5">
                      <button class="Cancel" type="button">Cancel</button>
                      <button class="submit" type="submit">Submit</button>
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

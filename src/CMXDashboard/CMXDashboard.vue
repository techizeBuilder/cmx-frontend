<script setup>
import CMXFolderXArchivedMain from "./CMXFolderXArchived/CMXFolderXArchivedMain.vue";
import CMXFolderXAccountsReceivableMain from "./CMXFolderXAccountsReceivable/CMXFolderXAccountsReceivableMain.vue";
import CMXFolderXMain from "./CMXFolderX/CMXFolderXMain.vue";
import CMXEstimateMain from "./CMXEstimateProfile/CMXEstimateMain.vue";
import QuickSearch from "./QuickSearch.vue";
import QuickView from "./QuickView.vue";
import CmxCustomerProfile from "./CMXCustomerProfile/CmxCustomerProfile.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();
const shopId = localStorage.getItem("shopId");
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const globalInputData = ref([]);
const refreshData = (value) => {
  globalInputData.value = value;
};

onMounted(async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/shop//getShopRegister/${shopId}`,
      config
    );
    store.dispatch("setShopDetails", response.data.data);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="px-3">
    <div class="mainhead pb-2 mt-3 mb-5">
      <div class="d-flex align-items-center gap-3 justify-content-between">
        <router-link to="/">CMX Dashboard</router-link>
      </div>
    </div>

    <div class="cmxdashboard-set-main">
      <div class="section-mone">
        <div class="box">
          <div class="row">
            <div class="col-lg-4 p-3 pt-0">
              <QuickSearch @inputValue="refreshData" />
            </div>
            <div class="col-lg-8 p-3 pt-0">
              <QuickView :tableSearch="globalInputData" />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="zoom-sign d-flex justify-content-end">
        <div class="img">
          <img class="zoomout" src="./Icons/zoomout.png" alt="zoomout" />
        </div>
        <div class="img">
          <img src="./Icons/expandImg.png" alt="expandImg" />
        </div>
      </div> -->
      <div class="sectionaccomadation">
        <ul class="link-section">
          <li class="li-drop">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <div class="pages d-flex align-items-center">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsone"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <!-- <i class="fas fa-exchange-alt sidebar-icon "></i> -->
                      <img
                        class="sidebar-icon"
                        src="./Icons/Customerpro.png "
                        alt="Customerpro"
                      />
                      <!-- <i class="fa-solid fa-users sidebar-icon"></i> -->
                      <h3>Customer Profile</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="flush-collapsecmsone"
                class="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <CmxCustomerProfile />
              </div>
            </div>
          </li>
          <li class="li-drop">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <div class="pages d-flex align-items-center">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmxtwo"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <!-- <i class="fas fa-exchange-alt sidebar-icon "></i> -->
                      <!-- <i class="fa-solid fa-users sidebar-icon"></i> -->
                      <img
                        class="sidebar-icon"
                        src="./Icons/EstimateProfile.png "
                        alt="Customerpro"
                      />

                      <h3>Estimate Profile</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmxtwo"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <CMXEstimateMain />
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <div class="pages d-flex align-items-center">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmxthree"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <!-- <i class="fas fa-exchange-alt sidebar-icon "></i> -->
                      <!-- <i class="fa-solid fa-users sidebar-icon"></i> -->
                      <img
                        class="sidebar-icon"
                        src="./Icons/FolderX.png "
                        alt="FolderX"
                      />
                      <h3>RO - Repair Order</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmxthree"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <CMXFolderXMain />
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmxfour"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <!-- <i class="fas fa-exchange-alt sidebar-icon "></i> -->
                      <!-- <i class="fa-solid fa-users sidebar-icon"></i> -->
                      <img
                        class="sidebar-icon"
                        src="./Icons/FolderAccount.png "
                        alt="FolderAccount"
                      />
                      <h3>Accounts Receivable</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmxfour"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <CMXFolderXAccountsReceivableMain />
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmxfive"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <!-- <i class="fas fa-exchange-alt sidebar-icon "></i> -->
                      <!-- <i class="fa-solid fa-users sidebar-icon"></i> -->
                      <img
                        class="sidebar-icon"
                        src="./Icons/FolderArchived.png "
                        alt="FolderArchived"
                      />
                      <h3>RO Archived</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmxfive"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <CMXFolderXArchivedMain />
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div
          class="d-flex justify-content-end py-5"
          :style="{ marginRight: '20px' }"
        >
          <a href="#" class="ms-4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <rect width="30" height="30" rx="10" fill="url(#pattern0)" />
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
</template>

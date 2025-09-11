<script setup>
import TopLink from './TopLink.vue'
import ShopDemosMain from './ShopDemos/ShopDemosMain.vue'
import ShopStaffTab from './ShopStaffTab/ShopStaffTabMain.vue'
import VendorxMain from './VendorX/VendorxMain.vue'
import ReportsMain from './Reports/ReportsMain.vue'
import scrollTopIcons from "../../assets/scrollTopIcons.png";

function scrollToTop() {
    window.scrollTo(0, 0);
}
</script>
<script>
export default {
    data() {
        return {
            showhideaccordionref: "",
        };
    },
    methods: {
        showhideaccordion(id) {
            this.showhideaccordionref = id;
        },
    },
};
</script>
<template>
    <div :style="{height:'100vh' }">
        <div class="headShop py-3 px-3">
            <div class="container-fluid">
                <p class="m-0">Super Admin Panel</p>
            </div>
        </div>
        <div class="py-3 px-3">
            <div class="container-fluid">
                <div class="d-sm-flex align-items-center justify-content-end my-3">
                    <div class="dropdown mb-sm-0 text-end optionDrop">
                        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                            :style="{ backgroundColor: '#000000', color: '#ffffff' }">
                            OPTIONS
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#"> Open New RO</a></li>
                            <li><a class="dropdown-item" href="#">Print Tags</a></li>
                            <li><a class="dropdown-item" href="#">Print Final</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-3 mt-0 SupTopLink">
            <div class="container-fluid">
                <TopLink :showhideaccordion="showhideaccordion" />
                <ul class="supdashAcco link-section mt-5">
                    <li class="li-drop mt-2">
                        <div class="accordion accordion-flush" id="supdashshopdemo">
                            <div class="accordion-item">
                                <div class="supdashAccBlock accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#flush-supdashshopdemo"
                                    aria-expanded="false">
                                    <div class="supdashAcc-head-text">
                                        <h3>Shop Demos</h3>
                                    </div>
                                </div>
                                <div id="flush-supdashshopdemo" class="accordion-collapse collapse"
                                    :class="[showhideaccordionref == 'SHOPDEMOS' ? 'show' : 'hide',]"
                                    data-bs-parent="#supdashshopdemo">
                                    <ShopDemosMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop mt-2">
                        <div class="accordion accordion-flush" id="supdashShopAdmin">
                            <div class="accordion-item">
                                <div class="supdashAccBlock accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#flush-supdashShopAdmin"
                                    aria-expanded="false">
                                    <div class="supdashAcc-head-text">
                                        <h3>Shop Admin</h3>
                                    </div>
                                </div>
                                <div id="flush-supdashShopAdmin" class="accordion-collapse collapse"
                                    :class="[showhideaccordionref == 'SHOPADMIN' ? 'show' : 'hide',]"
                                    data-bs-parent="#supdashShopAdmin">
                                    <ShopStaffTab />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop mt-2">
                        <div class="accordion accordion-flush" id="supdashVendorX">
                            <div class="accordion-item">
                                <div class="supdashAccBlock accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#flush-supdashVendorX"
                                    aria-expanded="false">
                                    <div class="supdashAcc-head-text">
                                        <h3>VendorX</h3>
                                    </div>
                                </div>
                                <div id="flush-supdashVendorX" class="accordion-collapse collapse"
                                    :class="[showhideaccordionref == 'VENDORX' ? 'show' : 'hide',]"
                                    data-bs-parent="#supdashVendorX">
                                     <VendorxMain />

                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop mt-2">
                        <div class="accordion accordion-flush" id="supdashReports">
                            <div class="accordion-item">
                                <div class="supdashAccBlock accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#flush-supdashReports"
                                    aria-expanded="false">
                                    <div class="supdashAcc-head-text">
                                        <h3>Reports</h3>
                                    </div>
                                </div>
                                <div id="flush-supdashReports" class="accordion-collapse collapse"
                                    :class="[showhideaccordionref == 'Reports' ? 'show' : 'hide',]"
                                    data-bs-parent="#supdashReports">
                                   <ReportsMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop mt-2">
                        <div class="accordion accordion-flush" id="supdashStaff">
                            <div class="accordion-item">
                                <div class="supdashAccBlock accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#flush-supdashStaff"
                                    aria-expanded="false">
                                    <div class="supdashAcc-head-text">
                                        <h3>CUSTOMER</h3>
                                    </div>
                                </div>
                                <div id="flush-supdashStaff" class="accordion-collapse collapse"
                                    :class="[showhideaccordionref == 'CUSTOMER' ? 'show' : 'hide',]"
                                    data-bs-parent="#supdashStaff">
                                    <h1>mansih</h1>

                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div
          class="d-flex justify-content-end cursor-pointer mt-5"
          :style="{ marginRight: '20px' }"
          @click="scrollToTop"
        >
          <img
            :src="scrollTopIcons"
            alt="scrollTopIcons"
            class="img-fluid"
            :style="{ width: '24px' }"
          />
        </div>
    </div>
</template>
<style>
.headShop {
    background-color: rgba(0, 0, 0, 0.25);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    color: #fff;
}
</style>
<script setup>
import AddNewVendor from './AddNewVendor.vue' 
import venSetip from '../Icons/venSetip.png'
import VendorLinkDrop from './VendorLinkDrop.vue';
</script>

<template>
    <div class="px-3">
        <div class="mainhead pb-2 mt-3">
            <div class="d-flex align-items-center gap-3 justify-content-between">
                <router-link to="/">VendorX | Vendor Link</router-link>
                <div class="import-sec">
                </div>
            </div>
        </div>
        <div class="d-sm-flex align-items-center justify-content-end my-3 gap-5">

            <router-link class='btn btn-light' to='/vendorx'>
                <i class="fa-solid fa-arrow-left-long"></i>&nbsp; Back
            </router-link>

        </div>

        <div class="cmxdashboard-set-main">

            <div class="sectionaccomadation">
                <ul class="link-section">
                    <li class="li-drop">
                        <div class="accordion accordion-flush" id="accordionVender">
                            <div class="accordion-item">
                                <div class="pages d-flex align-items-center ">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapsevenderX"
                                        aria-expanded="true">
                                        <div class="accomdationset-head">

                                            <img class="sidebar-icon" :src="venSetip" alt="venSetip">

                                            <h3>Vendor Link </h3>
                                        </div>
                                    </div>
                                    <div class="accomdation-viewmore">
                                        <div class="img">
                                            <div class="dropdown">
                                                <a href="javascript:void(0)" type="button" class=" dropdown-toggle"
                                                    data-bs-toggle="dropdown">
                                                    <!-- <img src="./Icons/add-90-32.png" alt="add-90-32.png"> -->
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Add New Vendor</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="flush-collapsevenderX" class="accordion-collapse collapse show"
                                    data-bs-parent="#accordionVender">
                                    <div class="accordion-body">
                                        <div class="cmx-dashcusprosection">
                                            <div class="scrool-delevry">
                                                <ul class="nav nav-nav nav-tabs ">
                                                    <li class="nav-item">
                                                        <a class="nav-link show active" data-bs-toggle="tab"
                                                            href="#AddNewVendor">Add New Vendor</a>
                                                    </li>

                                                </ul>
                                            </div>
                                            <div class="cmx-tabsection">
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="AddNewVendor">
                                                        <AddNewVendor />
                                                        <hr class="my-5" />
                                                        <div>
                                                            <VendorLinkDrop />
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
        </div>
    </div>
</template>
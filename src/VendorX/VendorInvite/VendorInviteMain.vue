<script setup>
import AddNewVendorInvite from './AddNewVendorInvite.vue'
import SelectvenderdropInvite from './SelectvenderdropInvite.vue'
import venSetip from '../Icons/venSetip.png'
import map from '../Icons/map.png'
import Phone from '../Icons/Phone.png'
import Email from '../Icons/Email.png'
import NetworkIcons from '../Icons/NetworkIcons.png'
</script>

<template>
    <div class="px-3">
        <div class="mainhead pb-2 mt-3">
            <div class="d-flex align-items-center gap-3 justify-content-between">
                <router-link to="/">VendorX | Vendor Invite</router-link>
                <div class="import-sec">
                </div>
            </div>
        </div>
        
        <div class="d-sm-flex align-items-start justify-content-between my-3 gap-5 mb-5">
            <div class="text-center">
                <h3 class="vH3 fw-bold">VendorX Network</h3>
                <img :src="NetworkIcons" alt="NetworkIcons" :style="{width :'45px'}" />
            </div>
            <div class="chatlinkHeadAX">
                <div class="chatBodyDetials">
                    <ul class="list-unstyle">
                        <li>Body Shop Name</li>
                        <li>Address, City, State, Zip Code</li>
                        <li>Phone Number</li>
                        <li>Point of Contact Email</li>
                        <li>Point of Contact</li>
                    </ul>
                    <div class="linkChats">
                        <span>
                            <a href="#">
                                <img :src="map" alt="map" :style="{ width: '30px' }" />
                            </a>
                        </span>
                        <span>
                            <a href="#">
                                <img :src="Phone" alt="Phone" :style="{ width: '30px' }" />
                            </a>
                        </span>
                        <span>
                            <a href="#">
                                <img :src="Email" alt="Email" :style="{ width: '25px' }" />
                            </a>
                        </span>
                    </div>

                </div>

            </div>
            <div class="d-flex align-items-start gap-4">
                <router-link class='btn btn-light' to='/vendorx'>Cancel</router-link>
                <button type="button" class="btn btn-light" :style="{ backgroundColor: '#FF8100' }">Submit</button>
            </div>
        </div>
        <p class="mb-0">You have been invited to join CMX VendorX Network:</p>
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

                                            <h3>Vendor Invite </h3>
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
                                                        <AddNewVendorInvite />
                                                        <hr class="my-5" />
                                                        <div>
                                                            <SelectvenderdropInvite />
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
<style scoped>
.chatlinkHeadAX {
    display: flex;
    justify-content: space-between;

}

.chatBodyDetials {
    background-color: #ffffff;
    border-radius: 9.5px;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    min-width: 600px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.chatBodyDetials ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.chatBodyDetials ul li {
    margin-bottom: 0.8rem;
}

.linkChats {
    display: flex;
    flex-direction: column;
    gap: 15px;

}
.vH3{
    color:#008B38
}
</style>
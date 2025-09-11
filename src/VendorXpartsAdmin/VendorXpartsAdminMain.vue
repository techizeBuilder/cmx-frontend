<script setup>

import Vprofile from './Icons/vprofile.png'
import vstaff from './Icons/vstaff.png'
import VendorXStaffSetupMain from './VendorXStaffSetup/VendorXStaffSetupMain.vue';
import VendorXpartsProfileMain from './VendorXpartsProfile/VendorXpartsProfileMain.vue'


</script>

<template>
    <div class="px-3 VendorXAllPages">
        <div class="mainhead pb-2 mt-3">
            <div class="d-flex align-items-center gap-3 justify-content-between">
                <router-link to="/">VendorX Admin</router-link>
                <div class="btnaddlink AddBlck ">
                  
                    <button data-bs-toggle="modal" data-bs-target="#modalAddNewVendorX">Add New VendorX</button>
                    <button data-bs-toggle="modal" data-bs-target="#modalReferaVendor">Refer a Vendor</button>
                </div>
            </div>
        </div>

        <div class="shopadmin-stickheadercontantpart">
            <div class="conyter-section d-flex justify-content-end">

                <div class="section-twow ">

                    <form action="#" method="post">
                        <div class="form-cont">
                            <div class="form-group  ">
                                <input type="text" id="VendorXname" name="VendorXname" disabled required=""
                                    placeholder="VendorX ID">
                            </div>
                            <div class="form-group">
                                <select id="timezone" name="timezone" required="">
                                    <option value="" selected="">
                                        VendorX Name
                                    </option>
                                    <!-- Add options for countries here -->
                                    <option value="VendorXnamelist">
                                        VendorX 1
                                    </option>
                                    <option value="VendorXnamelist">
                                        VendorX 2
                                    </option>
                                    <option value="VendorXnamelist">
                                        VendorX 3
                                    </option>
                                    <!-- Add more countries as needed -->
                                </select>
                            </div>
                            <div class="form-group">
                                <select id="timeformat" name="timeformat" required="">
                                    <option value="" selected="">
                                        Active
                                    </option>
                                    <!-- Add options for countries here -->
                                    <option value="USA">
                                        United States
                                    </option>
                                    <option value="UK">
                                        United Kingdom
                                    </option>
                                    <!-- Add more countries as needed -->
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <ul class="link-section">
            <li class="li-drop">
                <div class="accordion accordion-flush" id="accordiVendorXProfile">
                    <div class="accordion-item">
                        <div class="pages accordion-button folderXAccor collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target="#flush-VendorXProfile" aria-expanded="false">
                            <div class="accomdationset-head">
                                <img class="sidebar-icon" :src="Vprofile" alt="vprofile">
                                <h3>VendorX Profile</h3>
                            </div>
                        </div>
                        <div id="flush-VendorXProfile" class="accordion-collapse collapse  "
                            data-bs-parent="#accordiVendorXProfile">
                            <VendorXpartsProfileMain />


                        </div>
                    </div>
                </div>
            </li>
            <li class="li-drop">
                <div class="accordion   accordion-flush" id="accordiVendorXStaffSetup">
                    <div class="accordion-item">
                        <div class="pages accordion-button folderXAccor collapsed" type="button"
                            data-bs-toggle="collapse" data-bs-target="#flush-VendorXStaffSetup" aria-expanded="false">
                            <div class="accomdationset-head">
                                <img class="sidebar-icon" :src="vstaff" alt="vstaff">
                                <h3>VendorX Staff Setup</h3>
                            </div>
                        </div>
                        <div id="flush-VendorXStaffSetup" class="accordion-collapse collapse  "
                            data-bs-parent="#accordiVendorXStaffSetup">

                            <VendorXStaffSetupMain />

                        </div>
                    </div>
                </div>
            </li>

        </ul>
    </div>
    <!-- The Modal -->
    <div class="modal fade login-popup-dashtwo " id="modalAddNewVendorX">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-body">
                    <div class="section referpagesection">
                        <div class="header-Refershop">
                            <div class="header-nom">
                                <div class="silde">
                                    <div class="sliderone d-flex align-items-center justify-content-between w-100">
                                        <p class="shopnow">Add New VendorX</p>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="container ">
                            <div class="space-btm-space">
                                <div class="row" style="align-items: center;">
                                    <div class="col-lg-6">
                                        <div class="col-same">
                                            <div class="box">
                                                <form>
                                                    <div class="input-container text-center mb-3">
                                                        <input type="text" class="form-control  text-center"
                                                            id="VendorXID" placeholder="  VendorX ID" disabled="">
                                                    </div>
                                                    <div class="input-container mb-3">
                                                        <select id="VendorXName" class="form-control  text-center"
                                                            required="">
                                                            <option value=""> VendorX Name</option>
                                                            <option value="VendorX1">VendorX 1</option>
                                                            <option value="VendorX2">VendorX 2</option>
                                                            <option value="VendorX3">VendorX 3</option>
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
                                                    <h4 class="headingrefer mb-3"> Add a New VendorX</h4>
                                                    <div class="input-container mb-4">
                                                        <input class="form-control" type="text" id="Contactname"
                                                            name="Contactname" placeholder="Contact Name" required="">
                                                    </div>
                                                    <div class="input-container mb-4">
                                                        <input class="form-control" type="tel" id="phoneNumber"
                                                            name="phoneNumber" placeholder="Phone Number" required="">
                                                    </div>
                                                    <div class="input-container mb-4">
                                                        <input class="form-control" type="email" id="email" name="email"
                                                            placeholder="Email Address" required="">
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
    <div class="modal fade login-popup-dashtwo " id="modalReferaVendor">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-body">
                    <div class="section referpagesection">
                        <div class="header-Refershop">
                            <div class="header-nom">
                                <div class="silde">
                                    <div class="sliderone d-flex align-items-center justify-content-between w-100">
                                        <p class="shopnow">Refer a VendorX</p>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="container ">
                            <div class="space-btm-space">
                                <div class="row" style="align-items: center;">
                                    <div class="col-lg-6">
                                        <div class="col-same">
                                            <div class="box">
                                                <form>
                                                    <div class="input-container text-center mb-3">
                                                        <input type="text" class="form-control  text-center"
                                                            id="VendorXID" placeholder="  VendorX ID" disabled="">
                                                    </div>
                                                    <div class="input-container mb-3">
                                                        <select id="VendorXName" class="form-control  text-center"
                                                            required="">
                                                            <option value=""> VendorX Name</option>
                                                            <option value="VendorX1">VendorX 1</option>
                                                            <option value="VendorX2">VendorX 2</option>
                                                            <option value="VendorX3">VendorX 3</option>
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
                                                    <h4 class="headingrefer mb-3">Refer a VendorX</h4>
                                                    <div class="input-container mb-4">
                                                        <input class="form-control" type="text" id="NameofVendorX"
                                                            name="NameofVendorX" placeholder="Name of VendorX"
                                                            required="">
                                                    </div>
                                                    <div class="input-container mb-4">
                                                        <input class="form-control" type="tel" id="phoneNumber"
                                                            name="phoneNumber" placeholder="Phone Number" required="">
                                                    </div>
                                                    <div class="input-container mb-4">
                                                        <input class="form-control" type="email" id="email" name="email"
                                                            placeholder="Email Address" required="">
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
    background: #D2D4D7;
    color: rgb(0 0 0);
    border: 1px solid #d1d1d1;
    margin: 0 5px;
    border-radius: 3px;
    font-size: 12px;
    color: #000000;
    font-weight: 600;
}
</style>

<script setup>
// import uploadIcon from './ImagesXP/uploadIcon.png'
// import DownloadIcon from './ImagesXP/DownloadIcon.png'
// import View from './ImagesXP/View.png'
// import uploadIconsss from '../../assets/uploadIcon.png'
// import VehicleInfo from '../Icons/VehicleInfo.svg' 
import OemIcons from '../Icons/Oem.png'
import ApproveIcons from '../Icons/ApproveIcons.png'
import svender from '../Icons/svender.png'
import PartVen from '../Icons/PartVen.png'
</script>
<template>
    <div class="sectionaccomadation px-5 mt-4">
        <ul class="link-section">
            <li class="li-drop" id="COMMENTSX">
                <div class="accordion accordion-flush px-4" id="accordionFlushExample">
                    <div class="accordion-item">
                        <div class="pages  ">
                            <div class=" accordion-button collapsed folderXAccor" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapsecmxtwo" aria-expanded="truw">
                                <div class="accomdationset-head">
                                    <img class="sidebar-icon" :src="PartVen" alt="PartVen" />
                                    <h3>Select Parts Vendor</h3>
                                </div>
                            </div>

                        </div>
                        <div id="flush-collapsecmxtwo" class="accordion-collapse collapse show"
                            data-bs-parent="#accordionFlushExample">
                            <div class="cmx-dashcusprosection ">
                                <div class="scrool-delevry">
                                    <ul class="nav nav-nav nav-tabs mt-2">
                                        <li class="nav-item">
                                            <a class="nav-link show active" data-bs-toggle="tab" href="#Sideview">
                                                <!-- <img class="sidebar-icon" :src="VehicleInfo" alt="VehicleInfo" width="20"> -->
                                                &nbsp; Vendors</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="cmx-tabsection">
                                    <div class="estimatedetailsection">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex align-items-center justify-content-start gap-5">
                                            <div>
                                                <label for="">Vendor Search</label>
                                                <input type="search" class="form-control" />
                                            </div>
                                            <div>
                                                <label for="">Select OEM Vendor by Name:</label>               
                                                <select class="form-select w-100">
                                                    <option disabled selected></option>
                                                    <option>Do Not Order</option>
                                                    <option>Pending Order </option>
                                                    <option>Ordered </option>
                                                    <option>Back Order </option>
                                                    <option>Arrived </option>
                                                    <option> Pending Return </option>
                                                    <option> Returned </option>
                                                    <option> Supplement Hold </option>
                                                    <option> Supplement Approved </option>
                                                    <option> Parts Stock </option>
                                                    <option> Parts to Tech</option>

                                                </select>
                                            </div>
                                            <div>
                                                <label for="">Select Other Vendor by Name:</label>               
                                                <select class="form-select w-100">
                                                    <option disabled selected></option>
                                                    <option>Do Not Order</option>
                                                    <option>Pending Order </option>
                                                    <option>Ordered </option>
                                                    <option>Back Order </option>
                                                    <option>Arrived </option>
                                                    <option> Pending Return </option>
                                                    <option> Returned </option>
                                                    <option> Supplement Hold </option>
                                                    <option> Supplement Approved </option>
                                                    <option> Parts Stock </option>
                                                    <option> Parts to Tech</option>

                                                </select>
                                            </div>
                                        </div>
                                            <div>
                                                <button class="btn btn-Svender">
                                                    <img :src="svender" alt="svender" />
                                                    Select Vendor
                                                </button>
                                            </div>
                                        </div>
                                        <div class="table-responsive mystripetable mt-5">
                                            <table class="table table-bordered table-striped text-center ">
                                                <thead>
                                                    <tr>
                                                        <th><input type="checkbox" /></th>
                                                        <th class="text-center text-nowrap">Vendor<br>Name</th>
                                                        <th class="text-nowrap">Vendor<br />Phone #</th>
                                                        <th class="text-nowrap">Vendor<br />Email</th>
                                                        <th class="text-nowrap">Vendor<br />Contact</th>
                                                        <th class="text-nowrap">Vendor<br />Address</th>
                                                        <th class="text-nowrap">OEM Parts<br />Type</th>
                                                        <th class="text-nowrap">Approved<br />Vendor?</th>

                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr class="text-center">
                                                        <td class="text-center"><input type="checkbox" /></td>
                                                        <td class="text-center">

                                                        </td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>

                                                        <td></td>
                                                        <td class="text-center ">
                                                            <img :src="OemIcons" alt="Oem" />
                                                        </td>
                                                        <td class="text-center "> <img :src="ApproveIcons"
                                                                alt="ApproveIcons"
                                                                :style="{ width: '22px', cursor: 'pointer' }" /></td>
                                                    </tr>

                                                </tbody>
                                            </table>
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

    <!-- The Modal -->
</template>
<style scoped>
th {
    vertical-align: middle;
    background-color: #ccdff1;
}

td {
    vertical-align: middle;
}
.btn.btn-Svender{
    border-radius: 5px;
background: #4DAC73;
box-shadow: 0px 3.591px 3.591px 0px rgba(0, 0, 0, 0.15);
}
label{
    font-size: 15px;
}
</style>
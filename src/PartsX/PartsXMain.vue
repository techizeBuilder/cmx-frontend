<script setup>

import AllVehiclesMain from './AllVehicles/AllVehiclesMain.vue'

import AllVehicles from './Icons/AllVehicles.png'
import zoomout from './Icons/zoomout.png'
import expandImg from './Icons/expandImg.png'
import order from './Icons/order.png'
import Partial from './Icons/Partial.png'
import Delivery from './Icons/Delivery.png'
import Pending from './Icons/Pending.png'
import PartsTo from './Icons/PartsTo.png'
import PartsStock from './Icons/PartsStock.png'
import SuppApr from './Icons/SuppApr.png'
import pendingOrder from './Icons/pendingOrder.png'
import scrollTopIcons from './Icons/scrollTopIcons.png'
import PendingReturn from './Icons/PendingReturn.png'
import Supplement from './Icons/Supplement.png'

import PendingOrderAllVehicleMain from './PendingOrderAllVehicle/PendingOrderAllVehicleMain.vue'
import OrderAllVehicleMain from './OrderAllVehicle/OrderAllVehicleMain.vue'
import PartialDeliveryAllvehicleMain from './PartialDelivery/PartialDeliveryAllvehicleMain.vue'
import DeliveredAllvehicleMain from './DeliveredAllvehicles/DeliveredAllvehicleMain.vue'
import PendingReturnsAllVehiclesMain from './PendingReturnsAllVehicles/PendingReturnsAllVehiclesMain.vue'
import ReturnedAllvehiclesMain from './ReturnedAllvehicles/ReturnedAllvehiclesMain.vue'
import SupplementHoldAllvehiclesMain from './SupplementHoldAllvehicles/SupplementHoldAllvehiclesMain.vue'
import SupplementApprovedAllVehicles from './SupplementApprovedAllVehicles/SupplementApprovedAllVehiclesMain.vue'
import PartsStockAllVehiclesMain from './PartsStockAllVehicles/PartsStockAllVehiclesMain.vue'
import PartstoTechAllVehiclesMain from './PartstoTechAllVehicles/PartstoTechAllVehiclesMain.vue'
import PartsxTopDetials from './PartsxTopDetials.vue'

function scrollToTop() {
    window.scrollTo(0, 0);

}
</script>
<script>
export default {
    data(){
        return{
            showhideaccordionref:""
        }
    },
    methods:{
        showhideaccordion(id)
        {
            this.showhideaccordionref = id;
        }
    },
}
</script>
<template>
    <!-- <nav class="navbar sticky-top py-0" :style="{ backgroundColor: '#D8D8D8', borderRadius: '2px' }">
        <div class="floderXhe">
            <p class="mb-0 px-2 py-0"><small>PartsX# XXXXXXXX | Owner Last Name, Owner First name | YEAR, MAKE, MODEL | 17
                    DIGIT
                    VIN#</small></p>
        </div>
    </nav> -->
    <div class="px-3">
        <div class="d-sm-flex align-items-center justify-content-end my-3">

            <div class="dropdown mb-sm-0 text-end">
                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                    :style="{ backgroundColor: '#FF8100', color: '#ffffff' }">
                    OPTIONS
                </button>
                <ul class="dropdown-menu ">
                    <li><a class="dropdown-item" href="#"> Open New RO</a></li>
                    <li><a class="dropdown-item" href="#">Print Tags</a></li>
                    <li><a class="dropdown-item" href="#">Print Final</a></li>
                </ul>
            </div>
        </div>
        <PartsxTopDetials  :showhideaccordion="showhideaccordion" />

        <div class="cmxdashboard-set-main mt-3">
            <div class="d-sm-flex align-items-center justify-content-end mt-0">

                <div class="zoom-sign d-flex justify-content-end">
                    <div class="img">
                        <img class="zoomout" :src='zoomout' alt="zoomout" />
                    </div>
                    <div class="img">
                        <img :src='expandImg' alt="expandImg">
                    </div>
                </div>
            </div>

            <div class="sectionaccomadation" :style="{ height: '200vh' }">
                <ul class="link-section">
                    <li class="li-drop" id="AllVehicles">
                        <div class="accordion accordion-flush" id="accordionAllVehicles">
                            <div class="accordion-item">
                                <div class="pages pagesA">
                                    <div class="accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapsecmsAllVehicles"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="zoomout" :src='AllVehicles' alt="AllVehicles"
                                                :style="{ width: '19px' }" />
                                            <h3>All Vehicles</h3>
                                        </div>
                                    </div>

                                </div>
                                <div id="flush-collapsecmsAllVehicles" class="accordion-collapse collapse"
                                :class="[showhideaccordionref=='AllVehicles'?'show':'hide']"
                                    data-bs-parent="#accordionAllVehicles">
                                    <AllVehiclesMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop" id="PendingOrderAllVehicle">
                        <div class="accordion accordion-flush" id="accordionPendingOrder">
                            <div class="accordion-item">
                                <div class="pages  pagesB">
                                    <div class="accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapsePendingOrderAllVehicle"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="pendingOrder" alt="pendingOrder" />
                                            <h3>Needs Ordered</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapsePendingOrderAllVehicle" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionPendingOrder"  :class="[showhideaccordionref=='PendingOrderAllVehicle'?'show':'hide']">
                                    <PendingOrderAllVehicleMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop" id="OrderAllVehicle">
                        <div class="accordion accordion-flush" id="accordionOrder">
                            <div class="accordion-item">
                                <div class="pages pagesC">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseOrderAllVehicle"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="order" alt="order" />
                                            <h3>Ordered </h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapseOrderAllVehicle" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionOrder"  :class="[showhideaccordionref=='OrderAllVehicle'?'show':'hide']">
                                    <OrderAllVehicleMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop" id="PartialDelivery">
                        <div class="accordion accordion-flush" id="accordionPartialDelivery">
                            <div class="accordion-item">
                                <div class="pages pagesD">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapsePartialDelivery"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="Partial" alt="Partial" />
                                            <h3>Partial Delivery</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapsePartialDelivery" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionPartialDelivery" :class="[showhideaccordionref=='PartialDelivery'?'show':'hide']">
                                    <PartialDeliveryAllvehicleMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop" id="DeliveredAllvehicle">
                        <div class="accordion accordion-flush" id="accordionDeliveredAllvehicle">
                            <div class="accordion-item">
                                <div class="pages pagesE">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseDeliveredAllvehicle"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="Delivery" alt="Delivery" />
                                            <h3>Delivered 100%</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapseDeliveredAllvehicle" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionDeliveredAllvehicle" :class="[showhideaccordionref=='DeliveredAllvehicle'?'show':'hide']">
                                    <DeliveredAllvehicleMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop" id="PendingReturnsAllvehicle">
                        <div class="accordion accordion-flush" id="accordionPendingReturnsAllvehicle">
                            <div class="accordion-item">
                                <div class="pages pagesF">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapsePendingReturnsAllvehicle"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="PendingReturn" alt="PendingReturn" />
                                            <h3>Pending Returns</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapsePendingReturnsAllvehicle" class="accordion-collapse collapse"
                                :class="[showhideaccordionref=='PendingReturnsAllvehicle'?'show':'hide']"
                                    data-bs-parent="#accordionPendingReturnsAllvehicle">
                                    <PendingReturnsAllVehiclesMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop" id="ReturnedAllvehicle">
                        <div class="accordion accordion-flush" id="accordionReturnedAllvehicle">
                            <div class="accordion-item">
                                <div class="pages pagesG">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseReturnedAllvehicle"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="Pending" alt="Pending" />
                                            <h3>Pending Return Credit</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapseReturnedAllvehicle" class="accordion-collapse collapse"
                                :class="[showhideaccordionref=='ReturnedAllvehicle'?'show':'hide']"
                                    data-bs-parent="#accordionReturnedAllvehicle">
                                    <ReturnedAllvehiclesMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop" id="SupplementHoldAllvehicle">
                        <div class="accordion accordion-flush" id="accordionSupplementHoldAllvehicle">
                            <div class="accordion-item">
                                <div class="pages pagesH">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseSupplementHoldAllvehicle"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="Supplement" alt="Supplement" />
                                            <h3>Supplement Hold</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapseSupplementHoldAllvehicle" class="accordion-collapse collapse"
                                :class="[showhideaccordionref=='SupplementHoldAllvehicle'?'show':'hide']"
                                    data-bs-parent="#accordionSupplementHoldAllvehicle">
                                    <SupplementHoldAllvehiclesMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop" id="SupplementApprovedAllvehicle">
                        <div class="accordion accordion-flush" id="accordionSupplementApprovedAllvehicle">
                            <div class="accordion-item">
                                <div class="pages pagesI">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseSupplementApprovedAllvehicle" aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="SuppApr" alt="SuppApr" />
                                            <h3>Supplement Approved (Pending Order)</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapseSupplementApprovedAllvehicle" class="accordion-collapse collapse"
                                :class="[showhideaccordionref=='SupplementApprovedAllvehicle'?'show':'hide']"
                                    data-bs-parent="#accordionSupplementApprovedAllvehicle">
                                    <SupplementApprovedAllVehicles />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop" id="PartsStockAllvehicle">
                        <div class="accordion accordion-flush" id="accordionPartsStockAllvehicle">
                            <div class="accordion-item">
                                <div class="pages pagesM">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapsePartsStockAllvehicle"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="PartsStock" alt="PartsStock" />
                                            <h3>Parts Stock</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapsePartsStockAllvehicle" class="accordion-collapse collapse"
                                :class="[showhideaccordionref=='PartsStockAllvehicle'?'show':'hide']"
                                    data-bs-parent="#accordionPartsStockAllvehicle">
                                    <PartsStockAllVehiclesMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop" id="PartstoTechAllvehicle">
                        <div class="accordion accordion-flush" id="accordionPartstoTechAllvehicle">
                            <div class="accordion-item">
                                <div class="pages pagesN">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapsePartstoTechAllvehicle"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="PartsTo" alt="PartsTo"
                                                :style="{ width: '22px', height: '22px' }" />
                                            <h3>Parts to Tech 100%</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapsePartstoTechAllvehicle" class="accordion-collapse collapse"
                                :class="[showhideaccordionref=='PartsXAllvehicle'?'show':'hide']"
                                    data-bs-parent="#accordionPartstoTechAllvehicle">
                                    <PartstoTechAllVehiclesMain />
                                </div>
                            </div>
                        </div>
                    </li>


                </ul>
                <div class="d-flex justify-content-end cursor-pointer mt-5" :style="{ marginRight: '20px' }"
                    @click="scrollToTop">
                    <img :src="scrollTopIcons" alt="scrollTopIcons" class="img-fluid" :style="{ width: '24px' }" />
                </div>
            </div>
        </div>
    </div>
</template>

<style> .pages {
     position: relative;
 }

 .pages:before {
     content: '';
     position: absolute;
     left: -20px;
     height: 100%;
     width: 20px;
     z-index: 99;
     border-top-left-radius: 3px;
     border-bottom-left-radius: 3px;
 }

 .pagesA:before {
     border-left: 8px solid #000000;
 }

 .pagesB:before {
     border-left: 8px solid #F0F511;
 }

 .pagesC:before {
     border-left: 8px solid #ccdff0;
 }

 .pagesD:before {
     border-left: 8px solid #B9DBC7;
 }

 .pagesE:before {
     border-left: 8px solid #4DAC73;
 }

 .pagesF:before {
     border-left: 8px solid #F0C9C9;
 }

 .pagesG:before {
     border-left: 8px solid #FF4C4C;
 }

 .pagesH:before {
     border-left: 8px solid #FFDDBA;
 }

 .pagesI:before {
     border-left: 8px solid #FFAA52;
 }

 .pagesM:before {
     border-left: 8px solid #D2D4D7;
 }

 .pagesN:before {
     border-left: 8px solid #9747FF;
 }</style>
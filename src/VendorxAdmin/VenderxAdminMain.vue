<script setup>
 import pendinicons from './Icons/pendinicons.png'
 import orderIcons from './Icons/order.png'
 import Partialicon from './Icons/Partial.png'
 import Deliveryicon from './Icons/Delivery.png'
import Pendingicon from './Icons/Pending.png'
import scrollTopIcons from './Icons/scrollTopIcons.png'
import LinkVendericon from './Icons/LinkVender.png'
import Seticon from './Icons/Set.png'
import VenderxAdminTop from './VenderxAdminTop.vue'
 
import PendingorderVmain from './PendingorderV/PendingorderVmain.vue'
import OrderedVmain from './OrderedV/OrderedVmain.vue'
import PartialDeliveryVmain from './PartialDeliveryV/PartialDeliveryVmain.vue'
import DeliveredShopVmain from './DeliveredShopV/DeliveredShopVmain.vue'
import PendingReturnPickupvmain from './PendingReturnPickupv/PendingReturnPickupvmain.vue'
import ReturnCreditVmain from './ReturnCreditV/ReturnCreditVmain.vue'

import zoomout from './Icons/zoomout.png'
import expandImg from './Icons/expandImg.png' 

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
    
    <div class="px-3">
       
            <div class="mainhead pb-2 my-3">
            <div class="d-flex align-items-center gap-3 justify-content-between">
                <router-link to="/">VendorX Parts Procurement</router-link>
                <div class="import-sec">
                    <img :src="LinkVendericon" alt="LinkVendericon"  class="img-fluid" :style="{maxWidth: '35px'}" />

                </div>
            </div>
        </div>
          
        <VenderxAdminTop  :showhideaccordion="showhideaccordion" />

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
                    <li class="li-drop" id="PendingOrderAllVehicle">
                        <div class="accordion accordion-flush" id="accordionPendingOrder">
                            <div class="accordion-item">
                                <div class="pages d-flex align-items-center pagesB">
                                    <div class="accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapsePendingOrderAllVehicle"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <img class="sidebar-icon" :src="pendinicons" alt="pendinicons" />
                                            <h3>Needs Ordered</h3>
                                        </div>
                                    </div>
                                   <img :src="Seticon" alt="Seticon" />
                                </div>
                                <div id="flush-collapsePendingOrderAllVehicle" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionPendingOrder"  :class="[showhideaccordionref=='PendingOrderAllVehicle'?'show':'hide']">
                                    <PendingorderVmain />
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
                                            <img class="sidebar-icon" :src="orderIcons" alt="orderIcons" />
                                            <h3>Ordered </h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapseOrderAllVehicle" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionOrder"  :class="[showhideaccordionref=='OrderAllVehicle'?'show':'hide']">
                                    <OrderedVmain />
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
                                            <img class="sidebar-icon" :src="Partialicon" alt="Partialicon" />
                                            <h3>Partial Delivery</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapsePartialDelivery" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionPartialDelivery" :class="[showhideaccordionref=='PartialDelivery'?'show':'hide']">
                                    <PartialDeliveryVmain />
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
                                            <img class="sidebar-icon" :src="Deliveryicon" alt="Deliveryicon" />
                                            <h3>Delivered to Shop</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapseDeliveredAllvehicle" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionDeliveredAllvehicle" :class="[showhideaccordionref=='DeliveredAllvehicle'?'show':'hide']">
                                    <DeliveredShopVmain />
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
                                            <img class="sidebar-icon" :src="Pendingicon" alt="Pendingicon" />
                                            <h3>Pending Return Pickup</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapsePendingReturnsAllvehicle" class="accordion-collapse collapse"
                                :class="[showhideaccordionref=='PendingReturnsAllvehicle'?'show':'hide']"
                                    data-bs-parent="#accordionPendingReturnsAllvehicle">
                                    <PendingReturnPickupvmain />
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
                                            <img class="sidebar-icon" :src="Pendingicon" alt="Pendingicon" />
                                            <h3>Return Credit Completed</h3>
                                        </div>
                                    </div>
                                </div>
                                <div id="flush-collapseReturnedAllvehicle" class="accordion-collapse collapse"
                                :class="[showhideaccordionref=='ReturnedAllvehicle'?'show':'hide']"
                                    data-bs-parent="#accordionReturnedAllvehicle">
                                    <ReturnCreditVmain />
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
<script setup>
import Donot from '../Icons/Donot.png'
import PendingOrderIcon from '../Icons/PendingOrder.png'
import OrderedIcons from '../Icons/Ordered.png'
import BackOrderedIcons from '../Icons/BackOrdered.png'
import ArrivedIcons from '../Icons/Arrived.png'
import PendingReturnIcons from '../Icons/PendingReturn.png'
import ReturnedCanceledIcons from '../Icons/ReturnedCanceled.png'
import SupplementHoldIcons from '../Icons/SupplementHold.png'
import SupplementApproved from '../Icons/SupplementApproved.png'
import PartstoTechIcons from '../Icons/PartstoTech.png'
import PartsStock from '../Icons/PartsStock.png'
import Ordered from './Ordered.vue'
import DonotOrdered from './DonotOrdered.vue'
import PendingOrder from './PendingOrder.vue'
import BackOrdered from './BackOrdered.vue'
import Arrived from './Arrived.vue'
import PendingReturn from './PendingReturn.vue'
import ReturnedCanceled from './ReturnedCanceled.vue'
import SupplementHold from './SupplementHold.vue'
import PartstoTech from './PartstoTech.vue'
</script>
<template>
    <div class="PartsDrop">
        <ul class="">
            <li class="li-drop" id="paymentX">
                <div class="accordion accordion-flush" id="accordiondonotorder">
                    <div class="accordion-item">
                        <div class="partsXpages">
                            <div class="accordion-button collapsed partsAccod" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapsdonotorder" aria-expanded="false">
                                <div class="partsacc">
                                    <p class="partsTsx">8</p>
                                    <img class="sidebar-icon" :src="Donot" alt="Donot" />
                                    <h3>Do Not Ordered</h3>
                                </div>
                            </div>

                        </div>
                        <div id="flush-collapsdonotorder" class="accordion-collapse collapse" 
                            data-bs-parent="#accordiondonotorder">
                          <DonotOrdered />
                        </div>
                    </div>
                </div>
            </li>
          
        </ul>
    </div>
</template>
<style scoped>
.partsAccod{  
    padding: 10px 0 !important;
}
.pend.collapsed, .orde.collapsed, .Borde.collapsed, .Arrv.collapsed, .penRe.collapsed, .retcal.collapsed, .sepApr.collapsed,
.sephold.collapsed, .partsto.collapsed, .parytex.collapsed{
background-color: #fff !important;
padding: 10px 0 !important;
}

.pend{
background-color: rgb(240, 245, 17) !important;
padding: 10px 0 !important;
}
 

.orde{
    background-color: #ccdff1 !important;
    padding: 10px 0 !important;
}
.Borde{
    background-color: #9747FF !important;
    padding: 10px 0 !important;
}
.Arrv{
    background-color: #4DAC73 !important;
    padding: 10px 0 !important;
}
.penRe{
    background-color: #F0C9C9 !important;
    padding: 10px 0 !important;
}
.retcal{
    background-color: #FF4C4C !important;
    padding: 10px 0 !important;
}
.sepApr{
    background-color: #FFAA52 !important;
    padding: 10px 0 !important;
}
.sephold{
    background-color: #FFDDBA !important;
    padding: 10px 0 !important;
}
.partsto{
    background-color: #D2D4D7 !important;
    padding: 10px 0 !important;
}
.parytex{
    background-color: #B9DBC7 !important;
    padding: 10px 0 !important;
}
</style>
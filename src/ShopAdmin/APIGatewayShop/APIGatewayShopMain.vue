<script setup>
import APIEstimateMain from './APIEstimate/APIEstimateMain.vue';
import APIGatewayShop from './APIGatewayShop.vue';

</script>
<template>
    <div class="shoppage-section">
        <div class="scrool-delevry">
            <ul class="nav nav-nav nav-tabs ">
                <li class="nav-item">
                    <a class="nav-link" data-bs-toggle="tab" href="#apiqpay">QPAY</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link show active" data-bs-toggle="tab" href="#apiestimate">ESTIMATE</a>
                </li>

            </ul>
        </div>
        <div class="select-option-first">
            <div class="tab-content">
                <div class="tab-pane " id="apiqpay">
                    <APIGatewayShop />
                </div>
                <div class="tab-pane show active" id="apiestimate">
                   <APIEstimateMain />
                </div>

            </div>
        </div>

    </div>
</template>
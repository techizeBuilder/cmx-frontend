<script setup>
import ShopDemoActive from './ShopDemoActive.vue'
import ShopDemoCancel from './ShopDemoCancel.vue'
import TopBarVue from './TopBar.vue';

</script>
<template>
    <div class="supdashAccoNav">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link show active" data-bs-toggle="tab" href="#Summary">
                    Active Shops</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#RecordPayment">
                    Canceled Shops</a>
            </li>
        </ul>

        <div class="cmx-tabsection">
            <div class="tab-content">
                <div class="tab-pane show active" id="Summary">
                    <div class="shopDemoTopBar d-flex align-items-center justify-content-between w-full my-5 gap-5">
                        <TopBarVue />
                        <div class="d-flex align-items-center  gap-4">
                            <button type="btn" class="btn btn-dark text-nowrap">View All</button>
                            <button type="btn" class="btn btn-dark text-nowrap"><i class="fa-solid fa-plus"></i> Add
                                Shop</button>
                        </div>
                    </div>
                    <ShopDemoActive />
                </div>
                <div class="tab-pane show" id="RecordPayment">

                    <div class="shopDemoTopBar d-flex align-items-center justify-content-between w-full my-5 gap-5">
                        <TopBarVue />
                        <div class="d-flex align-items-center  gap-4">
                            <button type="btn" class="btn btn-dark text-nowrap">View All</button>
                            <button type="btn" class="btn btn-dark text-nowrap"><i class="fa-solid fa-plus"></i> Create order</button>
                        </div>
                    </div>
                    <ShopDemoCancel />
                </div>
            </div>
        </div>

    </div>
</template>
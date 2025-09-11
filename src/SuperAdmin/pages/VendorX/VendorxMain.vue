<script setup>
 
import TopBarVue from './TopBar.vue';
import VenderxCancel from './VenderxCancel.vue'
import VenderxActive from './VenderxActive.vue'
 
</script>
<template>
    <div class="supdashAccoNav">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link show active" data-bs-toggle="tab" href="#VenderxAct">
                    Active Shops</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#VenderxCls">
                    Canceled Shops</a>
            </li>
        </ul>

        <div class="cmx-tabsection">
            <div class="tab-content">
                <div class="tab-pane show active" id="VenderxAct">
                    <div class="shopDemoTopBar d-flex align-items-center justify-content-between w-full my-5 gap-5">
                        <TopBarVue />
                        <div class="d-flex align-items-center  gap-4">
                            <button type="btn" class="btn btn-dark text-nowrap">View All</button>
                         
                        </div>
                    </div>
                    <VenderxActive />
                </div>
                <div class="tab-pane show" id="VenderxCls">

                    <div class="shopDemoTopBar d-flex align-items-center justify-content-between w-full my-5 gap-5">
                        <TopBarVue />
                        <div class="d-flex align-items-center  gap-4">
                            <button type="btn" class="btn btn-dark text-nowrap">View All</button>
                            <button type="btn" class="btn btn-dark text-nowrap"><i class="fa-solid fa-plus"></i> Create order</button>
                        </div>
                    </div>
                   <VenderxCancel />
                </div>
            </div>
        </div>

    </div>
</template>  
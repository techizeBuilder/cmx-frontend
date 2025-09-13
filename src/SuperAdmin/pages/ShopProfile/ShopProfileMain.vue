<script setup>
import support from '../../assets/images/support.png'
import ShopActivityMain from '../ShopActivity/ShopActivityMain.vue';
import ShopCommentsMain from './ShopComments/ShopCommentsMain.vue';
import ShopDetailsMain from './ShopDetails/ShopDetailsMain.vue';
import ShopPlanMain from './ShopPlan/ShopPlanMain.vue';
import ShopStaffMain from './ShopStaff/ShopStaffMain.vue';

let VehicleItem = [
    { name: 'Type', desc: '' },
    { name: 'Start Date', desc: '' },
    { name: 'Shop Name', desc: '' },
    { name: 'Phone', desc: '' },
    { name: 'Admin Email', desc: '' },
    { name: 'Website', desc: '' },
    { name: 'Shop ID', desc: 'SXX12345' },
]
</script>
<template>

    <div class="headShop py-3 px-3">
        <div class="container-fluid">
            <div class="d-sm-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-5">
                    <p class="m-0">Shop Profile</p>
                    <button type="button" class="btn btn-light px-4" :style="{backgroundColor:'#00FF51'}">User</button>
                </div>
                
                <div class="dropdown mb-sm-0 text-end optionDrop">
                    <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"
                        :style="{ backgroundColor: '#000000', color: '#ffffff' }">
                        OPTIONS
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"> Open New RO</a></li>
                        <li><a class="dropdown-item" href="#">Print Tags</a></li>
                        <li><a class="dropdown-item" href="#">Print Final</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="px-5 py-5">
        <div class="container-fluid">
            <div>
                <div class="table-responsive superShoprofile">
                    <table class="table table-bordered">
                        <tbody>
                            <tr v-for="Item in VehicleItem" v-bind:key="Item.name">
                                <td style="width:130px;" class="text-end  text-nowrap">{{ Item.name }}</td>
                                <td>{{ Item.desc }}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <button class="btn btn-light">
                    Super Support <img :src="support" alt="support" class="ms-2" :style="{ width: '30px' }" />
                </button>
            </div>
            <div class="mt-4">
                <ul class="supdashAcco link-section mt-5">
                    <li class="li-drop mt-2">
                        <div class="accordion accordion-flush" id="supShopDetails">
                            <div class="accordion-item">
                                <div class="supdashAccBlock accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#flush-supShopDetails"
                                    aria-expanded="false">
                                    <div class="supdashAcc-head-text">
                                        <h3>Shop Details</h3>
                                    </div>
                                </div>
                                <div id="flush-supShopDetails" class="accordion-collapse collapse"
                                    data-bs-parent="#supShopDetails">
                                    <ShopDetailsMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop mt-2">
                        <div class="accordion accordion-flush" id="supShopStaff">
                            <div class="accordion-item">
                                <div class="supdashAccBlock accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#flush-supShopStaff"
                                    aria-expanded="false">
                                    <div class="supdashAcc-head-text">
                                        <h3>Shop Staff</h3>
                                    </div>
                                </div>
                                <div id="flush-supShopStaff" class="accordion-collapse collapse"
                                    data-bs-parent="#supShopStaff">
                                    <ShopStaffMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop mt-2">
                        <div class="accordion accordion-flush" id="Shopactivity">
                            <div class="accordion-item">
                                <div class="supdashAccBlock accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#flush-Shopactivity"
                                    aria-expanded="false">
                                    <div class="supdashAcc-head-text">
                                        <h3>Shop Activity</h3>
                                    </div>
                                </div>
                                <div id="flush-Shopactivity" class="accordion-collapse collapse"
                                    data-bs-parent="#Shopactivity">
                                   <ShopActivityMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop mt-2">
                        <div class="accordion accordion-flush" id="SupShopPlan">
                            <div class="accordion-item">
                                <div class="supdashAccBlock accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#flush-SupShopPlan"
                                    aria-expanded="false">
                                    <div class="supdashAcc-head-text">
                                        <h3>Shop Plan</h3>
                                    </div>
                                </div>
                                <div id="flush-SupShopPlan" class="accordion-collapse collapse"
                                    data-bs-parent="#SupShopPlan">
                                 <ShopPlanMain />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li-drop mt-2">
                        <div class="accordion accordion-flush" id="SupComments">
                            <div class="accordion-item">
                                <div class="supdashAccBlock accordion-button collapsed" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#flush-SupComments"
                                    aria-expanded="false">
                                    <div class="supdashAcc-head-text">
                                        <h3>Comments</h3>
                                    </div>
                                </div>
                                <div id="flush-SupComments" class="accordion-collapse collapse"
                                    data-bs-parent="#SupComments">
                                 <ShopCommentsMain />
                                </div>
                            </div>
                        </div>
                    </li>
                  
                </ul>
            </div>
        </div>
    </div>
</template>
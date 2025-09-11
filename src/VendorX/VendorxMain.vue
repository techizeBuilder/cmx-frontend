<script setup>
import ActiveVendors from './ActiveVendors.vue';
import Vlink from './Icons/Vlink.png'
import Vinvite from './Icons/Vinvite.png'
import Addvender from './Icons/Addvender.png'
import Vmanagment from './Icons/Vmanagment.png'
</script>

<template>
    <div class="px-3">
        <div class="mainhead pb-2 mt-3">
            <div class="d-flex align-items-center gap-3 justify-content-between">
                <router-link to="/">VendorX</router-link>
                <div class="import-sec">
                </div>
            </div>
        </div>
        <div class="d-sm-flex align-items-center justify-content-end my-3 gap-5">
            
            <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#VendorLinkmodule">
                <img :src="Vinvite" alt="Vinvite" :style="{ width: '18px' }" />
                Vendor Invite </button>
            <router-link class='btn btn-light' to='/vendorsetup'>
                <img :src="Addvender" alt="Addvender" :style="{ width: '15px' }" />
                Add Vendor
            </router-link>

        </div>

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
                                            <img class="sidebar-icon" :src="Vmanagment" alt="Vmanagment">
                                            <h3>Vendor Management </h3>
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
                                                            href="#ActiveTab">Active Vendors</a>
                                                    </li>
                                                   
                                                </ul>
                                            </div>
                                            <div class="cmx-tabsection">
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="ActiveTab">
                                                        <ActiveVendors />
                                                    </div>
                                                 
                                                </div>
                                            </div>
                                            <div class="navigation-sectionsame">
                                                <div class="box">
                                                    <select class="form-select">
                                                        <option selected>25</option>
                                                        <option value="1">50</option>
                                                        <option value="2">75</option>
                                                        <option value="3">100</option>
                                                    </select>
                                                </div>
                                                <div class="boxsg">
                                                    <div class="sect-box-arrow">
                                                        <i class="fa-solid fa-angle-left"></i>
                                                        <div class="box-count">01</div>
                                                        <i class="fa-solid fa-angle-right"></i>
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
                <div class="modal " id="VendorLinkmodule">
                    <div class="modal-dialog modal-lg modal-dialog-centered p-sm-5 p-0">
                        <div class="modal-content ">

                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title">Vendor Invite </h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <!-- Modal body -->
                            <div class="modal-body">
                                <div class="p-4">
                                    <p class="fw-bold">Enter the name of vendor Name - vendor type and email address</p>
                                    <div class="mb-4 px-4">
                                        <label for="">Vendor Name</label>
                                        <input type="text" class="form-control" />
                                    </div>
                                    <div class="mb-4 px-4">
                                        <label for="">Primary Email Address</label>
                                        <input type="text" class="form-control" />
                                    </div>
                                </div>
                            </div>

                            <!-- Modal footer -->
                            <div class="modal-footer justify-content-end">
                                <button class="btn btn-light"
                                    :style="{ backgroundColor: '#FF8100', color: '#ffffff' }">Send</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end py-5" :style="{ marginRight: '20px' }">
                    <a href="#" class="ms-4">
                        <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <rect width="30" height="30" rx="10" fill="url(#pattern0)" />
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_1999_24" transform="scale(0.0078125)" />
                                </pattern>
                                <image id="image0_1999_24" width="128" height="128"
                                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFIUlEQVR4Ae2daascRRSGHxBJyC8QiRqNa9xNouIeCZK474kSEndNxA2URPRPSIiSP+QHP/hBQSRx33eNxn3lIAeaYRJqbvdMV53zFgx171Az0+d5n6ruO9zuBjUREAEREAEREAEREAEREAEREAEREAEREAEREAER6EPgduBlYL8evRgYw9v6BDHGa9cD/wD/6jEIA2O5dowgl/qZ9yn4QYLvTiBj2ky7XwIMLoAxbaZJgOF3fxIg+aoiASRAM3sAtAtIvgvYkXy2do/eh/q5qV3AGuBPSTDYXwJ/Axe1swP4f0svBp4DduvRi4ExvLS18LW9IiACIiACIiACIiACIiACIiACIlAZgeXAFuBuwH5WS0TgeODNzjeVbwD2nFoCAscBb3XC9+/qDwArE9SfusQTgINTwncJ3gdWpSYUuHgL/52jhO8SfACcHJhDytJOLAxfEgTUw8J/t2Dme/jefwicEpBHqpJOAt5bQvhdCVanIhao2L7huwQfAacG4pKiFDuStyN6D7Fv/7EkaMeb0wALrG/ok6//HLB/dVOrmMDpwCdzCN9l+EIS1Ju+hf/pHMPvSnB2vRhybtkZCwq/K8E5OVHXV/WZwGcLmPkevvdfApJgZB/GCr8rwbkjM0j78WcBdmTuYYzVfwWclzaFkQo/H/i6gvBduu+AdSOxSPexF1QWviRYoIIW/jcVzXwP3/vvAbs+ktocCFxYefhdCey8SLUBCdiZsd9WPPM9fO9/AC4ZsP7Ub2WXR2sp/K4EOqu3p7oWvh1hO9TWelsJJMESJbgMONRw+C7rYeDqJTJI+7Io4XcluCZtmjMWfjnwY4CZ7+F7byvBhhlZpBt+RdDwXYKfgWvTpVpY8JXATwFnvofvvSSYIsRVScLvSrBxCoeUT2UL3yX4BUgvwXWAgXAo2frfgBtTTnsge/guu0lwUzYJNgG/Jp75Hr73vwM3Z5FA4U/f5aWQYLNm/lGPd0yCW6KuBNcDtr/zZU/9dBYmwa3RJLhB4c8k/h8t3iruSNLeAVhBmvGzMfgLuOdIUFt5/k6F30t8k+DeVsKe3M67FH6v8H3FNAm2TcKt/Xe7+KLuGDLbku+BT+ubksCuvqnwhwvfhTAJttc+87cq/EGWfQ99sjcJ7IZcVTaFP/ysnxTAfrcbSFUngd3SzDZs2gbrueG52N3EH6tlGXhA4Y8ivkmwc2wJHlT4o4Tvq6pJsGssCR5S+KOG35Xg8UVL8LDCryL8rgRPLEqCRwBbevzD1dfBwjJ5ct4SPKrwqxbfJHhqXhI8rfCrDr+7Eu8ZWoJntOQ3E76L8PxQEtj3z/6m6ttiYd/R9G5vS4BmJ4DdKKN3s+vgaea3ycDuetK77ZMAzU6AZ3unDxwL2DdNe4H9C3q8FlA6q2lR/F5q/T+LXwwogNWkVkhAAhSCijpMAkRNtrAuCVAIKuowCRA12cK6JEAhqKjDJEDUZAvrkgCFoKIOkwBRky2sSwIUgoo6TAJETbawLglQCCrqMAkQNdnCuiRAIaiowyRA1GQL65IAhaCiDpMAUZMtrEsCFIKKOkwCRE22sC4JUAgq6jAJEDXZwrokQCGoqMMkQNRkC+uSAIWgog6TAFGTLaxLAhSCijpMAkRNtrCuFwKeGra7sHYNA+yys9FOSU93a7g+Ji8DXg8kwavAMX2AZHztCsCufffKAk+rHvr0bdt2O7V+ecYAVbMIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiIAIiEAtBP4DAmNPss3q36UAAAAASUVORK5CYII=" />
                            </defs>
                        </svg>
                    </a>

                </div>
            </div>
        </div>
    </div>
</template>
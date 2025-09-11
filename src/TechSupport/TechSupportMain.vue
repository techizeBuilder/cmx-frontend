<script setup>

import techIcons from './Icons/techIcons.png'
import QATech from './QATech.vue';
import RequestTech from './RequestTech.vue'
import ContactTech from './ContactTech.vue'
</script>
 
<template>
    <div class="px-3">

        <div class="mainhead pb-2 mt-3">
            <div class="d-flex align-items-center gap-3 justify-content-between">
                <router-link to="/">Tech Support</router-link>

            </div>
        </div>
        <div class="d-flex justify-content-end">
            <div class="mt-3">
                <p class="datexlable">Shop ID</p>
                <div class="customerXBox">
                    <input class="form-control" type="text" />
                </div>
            </div>
        </div>

        <div class="sectionaccomadation mt-2">
            <ul class="link-section">

                <li class="li-drop">
                    <div class="accordion accordion-flush" id="accordionesTechSupport">
                        <div class="accordion-item">
                            <div class="pages  ">
                                <div class=" accordion-button collapsed folderXAccor" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#flush-collapsetechsupport"
                                    aria-expanded="true">
                                    <div class="accomdationset-head">
                                        <img class="sidebar-icon" :src="techIcons" alt="techIcons">
                                        <h3>Tech Support</h3>
                                    </div>
                                </div>
                            </div>
                            <div id="flush-collapsetechsupport" class="accordion-collapse collapse show"
                                data-bs-parent="#accordionesTechSupport">
                                <div class="">
                                    <div class="scrool-delevry">
                                        <ul class="nav nav-nav nav-tabs ">
                                            <li class="nav-item">
                                                <a class="nav-link show active" data-bs-toggle="tab" href="#qa">Q&A</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-bs-toggle="tab" href="#Request">Request</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-bs-toggle="tab" href="#Contact">Contact</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="cmx-tabsection">
                                        <div class="tab-content">
                                            <div class="tab-pane show active" id="qa">
                                                <QATech />
                                            </div>
                                            <div class="tab-pane show  " id="Request">
                                                <RequestTech />
                                            </div>
                                            <div class="tab-pane show  " id="Contact">
                                                <ContactTech />
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
    </div>
</template>

<style></style>
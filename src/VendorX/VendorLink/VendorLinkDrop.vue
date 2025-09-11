<script setup>
import LinkIcons from '../Icons/LinkIcons.png'
</script>
<template>
    <div class="px-3 mt-5">
       
        <div class="d-flex justify-content-between w-50 gap-5">
            <div class="w-100">
                <ul class="link-section">
                    <li class="li-drop">
                        <div class="accordion   accordion-flush" id="accordionFlushSelectVendorType">
                            <div class="accordion-item">
                                <div class="pages d-flex align-items-center ">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseSelectVendorType"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <h3>Select Vendor Type</h3>
                                        </div>
                                    </div>

                                </div>
                                <div id="flush-collapseSelectVendorType" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushSelectVendorType">
                                    <div class="px-3 border-1">
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2 mt-4">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Aftermarket">Aftermarket</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Glass Sublet">Glass Sublet</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="QRP">QRP (Quality Recycled Part)</label>
                                        </div>

                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="OEM">OEM - Dealership</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="WheelSublet">Wheel Sublet</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="w-100">
                <ul class="link-section">
                    <li class="li-drop">
                        <div class="accordion   accordion-flush" id="accordionFlushSelectDealershipBrands">
                            <div class="accordion-item">
                                <div class="pages d-flex align-items-center ">
                                    <div class=" accordion-button collapsed folderXAccor" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapseSelectDealershipBrands"
                                        aria-expanded="false">
                                        <div class="accomdationset-head">
                                            <h3>Select Dealership Brands</h3>
                                        </div>
                                    </div>

                                </div>
                                <div id="flush-collapseSelectDealershipBrands" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushSelectDealershipBrands">
                                    <div class="px-4 border-1">
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2 mt-4">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Acura">Acura</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Audi">Audi</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="BMW">BMW</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Chrysler">Chrysler</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Ford">Ford</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="GM">GM</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Honda">Honda</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Hyundai">Hyundai</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Infiniti">Infiniti</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Isuzu">Isuzu</label>
                                        </div>

                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Jaguar">Jaguar</label>
                                        </div>

                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Kia">Kia</label>
                                        </div>

                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="LandRover">LandRover</label>
                                        </div>

                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Lexus">Lexus</label>
                                        </div>

                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Mazda">Mazda</label>
                                        </div>

                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Mercedes-Benz">Mercedes-Benz</label>
                                        </div>

                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Mitsubishi">Mitsubishi</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Nissan">Nissan</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Porsche">Porsche</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Subaru">Subaru</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Suzuki">Suzuki</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Toyota">Toyota</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Volkswagen">Volkswagen</label>
                                        </div>
                                        <div class="d-flex justify-content-start align-items-center gap-3 mb-2">
                                            <img :src="LinkIcons" alt="LinkIcons" />
                                            <label class="form-check-label" for="Volvo">Volvo</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</template>
<style>
 
</style>
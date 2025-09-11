<script setup>
// import Parts from './Icons/Parts.png'
import { ref } from 'vue';
import PushIcons from '../Icons/PushIcons.png'
import msw from '../Icons/msw.png'
import SelectPartsVendor from './SelectPartsVendor.vue';
const seen = ref(false)
</script>
<template>
    <div class="row mt-5 px-5">
        <div class="col-lg-12 col-rowset">
            <div class="d-lg-flex align-items-center gap-3 mb-3 justify-content-between">
                <div class="d-lg-flex align-items-center gap-3 mb-3 justify-content-between">
                    <div :style="{ minWidth: '150px' }">
                        <label for="">Part Type</label>
                        <select class="form-select">
                            <option disabled selected></option>
                            <option>Used</option>
                            <option>OEM</option>

                        </select>
                    </div>
                    <div>
                        <label for="">Select Stage</label>
                        <select class="form-select w-auto">
                            <option disabled selected></option>
                            <option>Do Not Order</option>
                            <option>Pending Order </option>
                            <option>Ordered </option>
                            <option>Back Order </option>
                            <option>Arrived </option>
                            <option> Pending Return </option>
                            <option> Returned </option>
                            <option> Supplement Hold </option>
                            <option> Supplement Approved </option>
                            <option> Parts Stock </option>
                            <option> Parts to Tech</option>

                        </select>
                    </div>
                    <button type="button" class="btn btn-light mt-4" v-on:click="seen = !seen">Select&nbsp;Vendors</button>
                    <div class="card py-0" :style="{ width: '250px' }">
                        <div class="card-body py-1 Vendortxt">
                            <p class="m-0">Vendor ID:</p>
                            <p class="m-0">Vendor Name</p>
                            <p class="m-0">Vendor Contact </p>
                            <p class="m-0"> Vendor Phone </p>
                            <p class="m-0"> Vendor Email </p>

                        </div>
                    </div>

                    <button type="button" class="btn btn-light text-nowrap px-4 mt-4"
                        :style="{ backgroundColor: '#FF8100' }">
                        Push <img :src="PushIcons" alt="PushIcons" class="ms-2" /> </button>
                </div>
                <div class="d-flex align-items-center gap-2  justify-content-end">
                    <div>
                        <label for="">Part Quick Search</label>
                        <input type="search" class="form-control" />
                    </div>
                    <button type="button" class="btn btn-light text-nowrap mt-4"><i
                            class="fa-regular fa-pen-to-square"></i>&nbsp;
                        Edit</button>
                    <button type="button" class="btn btn-light text-nowrap mt-4"> <i class="fa-regular fa-floppy-disk"></i>
                        Save</button>
                </div>
            </div>
        </div>
    </div>


    <div class="row px-5">
        <div class="col-lg-12 col-rowset">
            <div class="table-responsive mystripetable">
                <table class="table table-bordered text-center ">
                    <thead>
                        <tr>
                            <th class="text-nowrap"><input type="checkbox" /></th>
                            <th class="text-nowrap">Part to<br />Tech</th>
                            <th class="text-nowrap">Part<br />Line</th>
                            <th class="text-nowrap">Est <br />Line</th>
                            <th>Part <br />Status</th>
                            <th class="text-nowrap">Est.<br /> Stage</th>
                            <th class="text-nowrap">Line<br /> Notes</th>
                            <th class="text-nowrap">Operation</th>
                            <th class="text-nowrap">Part<br /> Type</th>
                            <th class="text-nowrap">Estimate<br /> Description</th>
                            <th class="text-nowrap">Part<br /> Number</th>
                            <th class="text-nowrap">Qty</th>
                            <th class="text-nowrap">Cost</th>
                            <th class="text-nowrap">Markup %<br /> -/+</th>
                            <th class="text-nowrap">Estimate<br /> Amount</th>
                            <th class="text-nowrap">Profit <br /> Percentage</th>
                            <th class="text-nowrap">Vendor <br /> Name</th>
                            <th class="text-nowrap">Ordered<br /> By</th>
                            <th class="text-nowrap">Ordered <br /> Date | Time</th>
                            <th class="text-nowrap">Received<br /> Date | Time</th>
                            <th class="text-nowrap">Vendor<br /> Invoice#</th>
                            <th class="text-nowrap">Purchase<br /> Order#</th>
                            <th class="text-nowrap">Back<br /> Order Date</th>
                            <th class="text-nowrap">Back Order <br />ETA</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr class="text-center">
                            <td class="text-center"><input type="checkbox" /></td>
                            <td class="text-center"><input type="checkbox" /></td>
                            <td class="text-center">1</td>
                            <td class="text-center">4</td>
                            <td class="text-center">
                                Do Not Ordered
                            </td>
                            <td class="text-center text-nowrap">
                                S01
                            </td>
                            <td class="text-center text-nowrap">
                                <img :src="msw" alt="msw" />
                            </td>
                            <td class="text-center text-nowrap">
                                Replace
                            </td>
                            <td class="text-center text-nowrap">
                                Used
                            </td>


                            <td class="text-left">
                                RT Front Door Panel with Moudling
                            </td>
                            <td class="text-center">ABCDEFG-123456</td>
                            <td class="text-center">1</td>
                            <td class="text-center">1,122.55</td>
                            <td class="text-center">+25%</td>
                            <td class="text-center">1,403.19 </td>
                            <td class="text-center">25%</td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>


                        </tr>

                    </tbody>
                </table>
            </div>


        </div>
    </div>
    <div v-if="seen">
        <SelectPartsVendor />
    </div>
</template>
<style scoped>
th {
    vertical-align: middle;
    background-color: #ccdff1;
}

td {
    vertical-align: middle;
}


.PartsStageW {
    max-width: 650px;
}

.PartsboxA {
    border: 3.8px solid #FFF;
    box-shadow: 0px 2.443px 2.443px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    padding: 7px;
}

.PartsboxA h6 {
    font-weight: 600;
    text-transform: uppercase;
}

.EsBox {
    min-width: 250px;
    margin: 5px 0;
}

.edsTable {
    min-width: 525px;
}
</style>
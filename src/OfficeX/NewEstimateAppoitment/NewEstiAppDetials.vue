<script setup>
import PointofImpact from './PointofImpact.vue'
let CustomerItem = [
    { name: "First Name", desc: "First Name" },
    { name: "Last Name", desc: "Last Name" },
    { name: "Cell | Phone 1", desc: "555-555-5555" },
    { name: "2 Phone", desc: "555-555-5555" },
    { name: "Email", desc: "email@mail.com" },
];
let AddressItem = [
    { name: "Address I", desc: " " },
    { name: "Address II", desc: " " },
    { name: "City", desc: " " },
    { name: "State", desc: " " },
    { name: "ZIP Code", desc: " " },
];
let VehicleItem = [
    { name: "VIN", desc: " " },
    { name: "Year", desc: " " },
    { name: "Make", desc: " " },
    { name: "Model", desc: " " },
    { name: "Exterior Color", desc: " " },
    
];
let InsuranceItem = [

    { name: "Ins. Company", desc: " " },
    { name: "Claim#", desc: " " },
    { name: "Date of Loss", desc: " " },
    { name: "Deductible", desc: " " },
    { name: "No Deductible", desc: " " },
    { name: "Party to Loss", desc: " " },
    { name: "Insurance Phone 1", desc: " " },
    { name: "Insurance Phone 2", desc: " " },
    { name: "Email", desc: " " },
    { name: "Adjuster Name", desc: " " },
];
let OtherInformation = [
   
    { name: "Who referred you here?", desc: " " },
    { name: "Have you been here before?", desc: " " },

]

</script>
<template>
    
        <SettingsCol @elementAdded="refreshData" />
       
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mt-1">
                        <h6 class="detialsMainH4folderx">Customer</h6>
                        <div class="table-responsive detialsAnna">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr v-for="Item in CustomerItem" v-bind:key="Item.name">
                                        <th style="width: 120px;" class="text-end text-nowrap">
                                            {{ Item.name }}
                                        </th>
                                        <td>
                                            {{ Item.desc }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h6 class="detialsMainH4folderx">Is this a Company?</h6>
                        <div class="table-responsive detialsAnna">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th style="width: 120px;" class="text-end text-nowrap">
                                            Check if Yes
                                        </th>
                                        <td> <input class="form-check-input" type="checkbox" id="check1" name="option1"
                                                value="something" checked>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="width: 120px;" class="text-end text-nowrap">
                                            Name
                                        </th>
                                        <td>
                                            Name
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h6 class="detialsMainH4folderx">Address</h6>
                        <div class="table-responsive detialsAnna">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr v-for="Item in AddressItem" v-bind:key="Item.name">
                                        <th style="width: 120px;" class="text-end text-nowrap">
                                            {{ Item.name }}
                                        </th>
                                        <td>
                                            {{ Item.desc }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h6 class="detialsMainH4folderx">Vehicle</h6>
                        <div class="table-responsive detialsAnna">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr v-for="Item in VehicleItem" v-bind:key="Item.name">
                                        <th style="width: 120px;" class="text-end text-nowrap">
                                            {{ Item.name }}
                                        </th>
                                        <td>
                                            {{ Item.desc }}
                                        </td>
                                    </tr>
                                      <tr>
                                        <th>Unsafe to Drive?</th>
                                        <td><select class="form-select"></select>
                                        </td>
                                    </tr>
                                      <tr>
                                        <th>Needs Towed?</th>
                                        <td><select class="form-select"></select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mt-1">
                        <h6 class="detialsMainH4folderx">Insurance</h6>
                        <div class="table-responsive detialsAnna">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Who is paying ?</th>
                                        <td><select class="form-select">

                                            </select></td>
                                    </tr>
                                    <tr v-for="Item in InsuranceItem" v-bind:key="Item.name">
                                        <th style="width: 120px;" class="text-end text-nowrap">
                                            {{ Item.name }}
                                        </th>
                                        <td>
                                            {{ Item.desc }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h6 class="detialsMainH4folderx">Other Information</h6>
                        <div class="table-responsive detialsAnna">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Do you want us to Repair your vehicle?</th>
                                        <td><select class="form-select"></select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>How soon do you want to repair your vehicle?</th>
                                        <td><select class="form-select"></select>
                                        </td>
                                    </tr>
                                    <tr v-for="Item in OtherInformation" v-bind:key="Item.name">
                                        <th style="width: 120px;" class="text-end text-nowrap">
                                            {{ Item.name }}
                                        </th>
                                        <td>
                                            {{ Item.desc }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="mt-1">
                        <h6 class="detialsMainH4folderx">Comments:</h6>
                        <div class="table-responsive detialsAnna">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th style="width: 120px;" class="text-end text-nowrap">
                                            <textarea class="form-control" rows="8" id="comment" name="text"
                                                :style="{ background: 'transparent' }"></textarea>
                                        </th>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <PointofImpact />
                </div>
            </div>
      

</template>
<style scoped>
.detialsMainH4folderx {
    color: #434343;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-decoration-line: underline;
    margin-bottom: 0;
}
</style>
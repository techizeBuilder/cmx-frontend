<script setup>
let EstimateItem = [
    { Code: 'B', LaborType: 'BODY', EstimateRates: '$0.00' },
    { Code: 'P', LaborType: 'PAINT', EstimateRates: '$0.00' },
    { Code: 'M', LaborType: 'MECHANICAL', EstimateRates: '$0.00' },
    { Code: 'F', LaborType: 'FRAME', EstimateRates: '$0.00' },
    { Code: 'S', LaborType: 'STRUCTURE', EstimateRates: '$0.00' },
    { Code: 'D', LaborType: 'Diagnostic LABOR', EstimateRates: '$0.00' },
    { Code: 'E', LaborType: 'ELECTRICAL', EstimateRates: '$0.00' },
    { Code: 'G', LaborType: 'GLASS', EstimateRates: '$0.00' },
    { Code: 'PDR', LaborType: 'PDR', EstimateRates: '$0.00' },
    { Code: 'ALM', LaborType: 'ALM', EstimateRates: '$0.00' },
    { Code: '-', LaborType: '-', EstimateRates: '$0.00' },
    { Code: '-', LaborType: '-', EstimateRates: '$0.00' },

]
</script>
<template>
    <div class="shopratetabnew">

        <div class="row  ">
            <div class="col-sm-12 col-md-12 col-lg-11 mx-auto">
                <div class="row ">
                    <div class="col-sm-12 col-md-12 col-lg-6">

                        <div class="mt-0">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center ">
                                    <thead>
                                        <tr>
                                            <th class="text-nowrap">Code</th>
                                            <th class="text-nowrap">Labor Type</th>
                                            <th class="text-nowrap">Estimate Rates</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-center" v-for="(Item, index) in EstimateItem"
                                            v-bind:key="index">
                                            <td class="text-center">{{ Item.Code }}</td>
                                            <td class="text-start">{{ Item.LaborType }}</td>
                                            <td class="text-center">{{ Item.EstimateRates }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div class="mt-5">
                            <div class="table-responsive  ">
                                <table class="table table-bordered text-center">
                                    <thead>
                                        <tr class="table-primary">
                                            <th>Supplies</th>
                                            <th>Flat Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-center table-primary">
                                            <td class="text-start">Paint Supplies</td>
                                            <td class="text-center">$0.00</td>
                                        </tr>
                                        <tr class="text-center table-primary">
                                            <td class="text-start">Body Supplies</td>
                                            <td class="text-center">$0.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-6">

                        <div class="mt-0">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center">
                                    <thead>
                                        <tr>
                                            <th>Apply</th>
                                            <th>Tax Type</th>
                                            <th>Tax Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-center ">
                                            <td class="text-center"><input class="form-check-input" type="checkbox" />
                                            </td>
                                            <td class="text-start">PARTS TAX RATE</td>
                                            <td class="text-center">0.0000%</td>
                                        </tr>
                                        <tr class="text-center ">
                                            <td class="text-center"><input class="form-check-input" type="checkbox" />
                                            </td>
                                            <td class="text-start">LABOR TAX</td>
                                            <td class="text-center">0.0000%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div class="row">
                            <div class="col-sm-12 col-md-5">
                                <div class="table-responsive">
                                    <table class="table table-bordered text-center">
                                        <thead>
                                            <tr class="">
                                                <th>Apply Tiered Tax</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="text-center ">
                                                <td class="text-center ">
                                                    <input class="form-check-input" type="checkbox" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-7">
                                <div class="table-responsive">
                                    <table class="table table-bordered text-center">
                                        <thead>
                                            <tr class="">
                                                <th>Apply</th>
                                                <th>Tiered Tax</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="text-center ">
                                                <td class="text-center">
                                                    <input class="form-check-input" type="checkbox" />
                                                </td>
                                                <td class="text-center">Parts</td>
                                            </tr>
                                            <tr class="text-center ">
                                                <td class="text-center">
                                                    <input class="form-check-input" type="checkbox" />
                                                </td>
                                                <td class="text-center">Labor</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="mt-4 pt-2">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center">
                                    <thead>
                                        <tr class="">
                                            <th>Rate 1</th>
                                            <th>Threshold 1</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-center ">
                                            <td class="text-center">0.0000%</td>
                                            <td class="text-center">$99999.99</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="table-responsive">
                                <table class="table table-bordered text-center">
                                    <thead>
                                        <tr class="">
                                            <th>Rate 2</th>
                                            <th>Threshold 2</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-center ">
                                            <td class="text-center">0.0000%</td>
                                            <td class="text-center">$99999.99</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
th {
    background-color: #ccdff0;
}

tbody,
td,
tfoot,
thead,
tr {
    background-color: #E6F0FF;
}
</style>
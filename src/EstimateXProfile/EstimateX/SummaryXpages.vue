<script setup>
let SummaryItem = [
    { Category: 'Parts', Hours: '', Rates: '', CostAmount: '$3,266.83' },
    { Category: 'Body Labor', Hours: '9.8', Rates: '$72.00 / hr', CostAmount: '$ 705.60' },
    { Category: 'Paint Labor', Hours: '17.5', Rates: '$72.00 / hr', CostAmount: '$1,260.00' },
    { Category: 'Mechanical Labor', Hours: '6.9', Rates: '$150.00 / hr', CostAmount: '$1,035.00' },
    { Category: 'Paint Supplies', Hours: '17.5', Rates: '$50.00 / hr', CostAmount: '$875.00' },
    { Category: 'Subtotal', Hours: '', Rates: '', CostAmount: '$7,142.43' },
    { Category: 'Labor Tax', Hours: '', Rates: '', CostAmount: '$0.00' },
    { Category: 'Parts Tax', Hours: '', Rates: '7.5354%', CostAmount: '$240.24' },
    { Category: 'Gross Total', Hours: '', Rates: '', CostAmount: '$7,382.67' },
    { Category: '(Deductible)', Hours: '', Rates: '', CostAmount: '($500.00)' },
    { Category: 'Net Total', Hours: '', Rates: '', CostAmount: '' },
    { Category: 'Appearance Allowance', Hours: '', Rates: '', CostAmount: '' },
    { Category: 'Betterment', Hours: '', Rates: '', CostAmount: '' }, 
]

let EstimateSupplementsitems = [
    { Category: 'Estimate of Record', Hours: '$4,382.67'},
    { Category: 'Supplement 1', Hours: '$1,000.00'},
    { Category: 'Supplement 2', Hours: '$1,000.00'},
    { Category: 'Supplement 3', Hours: '$500.00'},
    { Category: 'Supplement 4', Hours: '$500.00'}, 
]
</script>
<template>
    <div class="estimatedetailsection">
        <div class="row">
            <div class="col-lg-12 col-rowset">
                <div class="d-lg-flex align-items-end gap-4 mt-2 mb-4 justify-content-end">
                  
                    <div class="d-flex align-items-end gap-4  justify-content-end">
                        <button type="button" class="btn btn-light text-nowrap">&nbsp;
                            Cancel</button>
                        <button type="button" class="btn btn-light text-nowrap"><i class="fa-regular fa-pen-to-square"></i>&nbsp;
                            Edit</button>
                        <button type="button" class="btn btn-light text-nowrap"> <i class="fa-regular fa-floppy-disk"></i>
                            Save</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row ">
            <div class="col-sm-12 col-md-11 mx-auto">
                <div class="row g-5">
                    <div class="col-sm-12 col-md-12 col-lg-7">
                        <div class="table-responsive myestimateprotable">
                            <table class="table table-bordered text-center ">
                                <thead>
                                    <tr>
                                        <th class="text-nowrap">Category</th>
                                        <th class="text-nowrap">Hours</th>
                                        <th class="text-nowrap">Rates</th>
                                        <th class="text-nowrap">Cost Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-left" v-for="(Item, index) in SummaryItem" v-bind:key="index">
                                        <td class="text-left">{{ Item.Category }}</td>
                                        <td class="text-center">{{ Item.Hours }}</td>
                                        <td class="text-center">{{ Item.Rates }}</td>
                                        <td class="text-center">{{ Item.CostAmount }}</td>
                                    </tr> 
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-5">
                        <div class="table-responsive myestimateprotable">
                            <table class="table table-bordered text-center ">
                                <thead>
                                    <tr>
                                        <th class="text-nowrap">Estimate / Supplements</th>
                                        <th class="text-nowrap">Amount</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-left" v-for="(Item, index) in EstimateSupplementsitems" v-bind:key="index">
                                        <td class="text-left">{{ Item.Category }}</td>
                                        <td class="text-center">{{ Item.Hours }}</td>
                                      
                                    </tr> 
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
th {
    background-color: #ccdff1;
}
</style>
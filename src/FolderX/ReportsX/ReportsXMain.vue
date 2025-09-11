<script setup>
let SummaryItem = [
    { Category: 'Parts', Hours: '', Rates: '', SaleAmount: '', CostAmount: '$3,266.83', GrossProfit: '', Target: '', Job: '' },
    { Category: 'Body Labor', Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%', Job: '60%' },
    { Category: 'Paint Labor', Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%', Job: '60%' },
    { Category: 'Mechanical Labor', Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%', Job: '60%' },
    { Category: 'Paint Supplies', Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%', Job: '60%' },
    { Category: 'Subtotal', Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%', Job: '60%' },
    // { Category: 'Labor Tax', Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%',Job: '60%'},
    // { Category: 'Parts Tax', Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%',Job: '60%'},
    // { Category: 'Gross Total',Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%',Job: '60%'},
    // { Category: '(Deductible)', Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%',Job: '60%'},
    // { Category: 'Net Total', Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%',Job: '60%'},
    // { Category: 'Appearance Allowance', Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%',Job: '60%'},
    // { Category: 'Betterment', Hours: '9.8', Rates: '$72.00 / hr', SaleAmount: '$ 705.60', CostAmount: '$3,266.83', GrossProfit: '$ 705.60', Target: '60%',Job: '60%'}, 
] 
let PayItem = [
    { name: ' Days to Repair', price: '000' },
    { name: ' Total Job Hours', price: '000' },
    { name: ' Cycle Time', price: '$0.00' },
    { name: 'Gross Profit Per Day', price: '$0.00' },
]
</script>
<template>
    <div class="scrool-delevry">
        <ul class="nav nav-nav nav-tabs mt-2">
            <li class="nav-item">
                <a class="nav-link show active" data-bs-toggle="tab" href="#ACTIVITY">
                    Reports</a>
            </li>
        </ul>
    </div>
    <div class="PaymentBox mb-5 w-75 mx-auto">
        <div class="d-flex justify-content-start overflow-auto ">
            <div class="paymentContent" v-for="(Item, index) in PayItem" v-bind:key="index">
                <div class="paymentContentHead">
                    <div class="text-nowrap ">
                        {{ Item.name }}
                    </div>
                </div>
                <div class="paymentContentDeck">{{ Item.price }}</div>
            </div>
        </div>
    </div>
    <div class="row g-5">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="table-responsive mystripetable summ">
                <table class="table table-bordered text-center ">
                    <thead>
                        <tr>
                            <th class="text-nowrap">Category</th>
                            <th class="text-nowrap">Hours</th>
                            <th class="text-nowrap">Rates</th>
                            <th class="text-nowrap">Sale Amount</th>
                            <th class="text-nowrap">Cost Amount</th>
                            <th class="text-nowrap">Gross Profit</th>
                            <th class="text-nowrap">Target%</th>
                            <th class="text-nowrap">Job %</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-left" v-for="(Item, index) in SummaryItem" v-bind:key="index">
                            <td class="text-left">{{ Item.Category }}</td>
                            <td class="text-center">{{ Item.Hours }}</td>
                            <td class="text-center">{{ Item.Rates }}</td>
                            <td class="text-center">{{ Item.SaleAmount }}</td>
                            <td class="text-center">{{ Item.CostAmount }}</td>
                            <td class="text-center">{{ Item.GrossProfit }}</td>
                            <td class="text-center">{{ Item.Target }}</td>
                            <td class="text-center">{{ Item.Job }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>


</template>
<style scoped>
.mystripetable.summ table th {
    background-color: #ccdff1;
}
</style>
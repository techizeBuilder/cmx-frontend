<script setup>

</script>
<template>
   
      <div class="d-flex align-items-center  gap-4  justify-content-end pt-4 ">
          <button type="btn" class="btn btn-dark text-nowrap px-4">EDIT</button>
          <button type="btn" class="btn btn-dark text-nowrap px-4">CANCEL</button>
          <button type="btn" class="btn btn-dark text-nowrap px-4">SAVE</button>
      </div>
  
    <div class="row">
        <div class="col-sm-12 col-md-4">
            <div class="shopratetabnew mt-4">

                <div class="table-responsive  px-2">
                    <table class="table table-bordered ">
                        <thead>
                            <tr class="table-primary">
                                <th colspan="2">Demo Plan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Demo</td>
                                <td class="text-center">
                                    <div class="form-check form-switch text-center">
                                        <input class="form-check-input float-none" type="checkbox" id="flexSwitchCheckChecked"
                                            checked >
                                    </div>
                                </td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Demo Start Date
                                </td>
                                <td class="text-center">MM/DD/YYYY</td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Demo Days Remaining</td>
                                <td class="text-center">90</td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Demo End Date</td>
                                <td class="text-center">MM/DD/YYYY</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-md-4">
            <div class="shopratetabnew mt-4">

                <div class="table-responsive  px-2">
                    <table class="table table-bordered ">
                        <thead>
                            <tr class="table-primary">
                                <th colspan="2">CollisionMateX Plan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Member Status</td>
                                <td class="text-center">
                                    <div class="form-check form-switch text-center">
                                        <input class="form-check-input float-none" type="checkbox" id="flexSwitchCheckChecked"
                                            checked >
                                    </div>
                                </td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Member Start Date
                                </td>
                                <td class="text-center">MM/DD/YYYY</td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Subscription Rate</td>
                                <td class="text-center">$0.00</td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Subscription Frequency</td>
                                <td class="text-center">Monthly</td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Renewal Monthly Day</td>
                                <td class="text-center">1st</td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Discount Rate</td>
                                <td class="text-center">-$0.00</td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Net Membership Rate</td>
                                <td class="text-center">$0.00</td>
                            </tr>
                            <tr class="table-primary">
                                <th colspan="2">Cancellation</th>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Cancellation Status</td>
                                <td class="text-center">
                                    <div class="form-check form-switch text-center">
                                        <input class="form-check-input float-none" type="checkbox" id="flexSwitchCheckChecked"
                                            checked >
                                    </div>
                                </td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Cancellation Date</td>
                                <td class="text-center">MM/DD/YYYY</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="col-sm-12 col-md-4">
            <div class="shopratetabnew mt-4">
                <div class="table-responsive  px-2">
                    <table class="table table-bordered ">
                        <thead>
                            <tr class="table-primary">
                                <th colspan="2">QPay Integration </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Member Status</td>
                                <td class="text-center">
                                    <div class="form-check form-switch text-center">
                                        <input class="form-check-input float-none" type="checkbox" id="flexSwitchCheckChecked"
                                            checked >
                                    </div>
                                </td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Member Start Date
                                </td>
                                <td class="text-center">MM/DD/YYYY</td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Card Not Present Rate</td>
                                <td class="text-center">2.8%</td>
                            </tr>
                            <tr class="text-center table-primary">
                                <td class="text-start" :style="{ width: '230px' }">Card Present Rate</td>
                                <td class="text-center">2.3%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>
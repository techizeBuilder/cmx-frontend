<script setup>
</script>
<template>
    <div class="supdashAccoNav">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link show active" data-bs-toggle="tab" href="#RepostsStatus">
                    Status</a>
            </li>
        </ul>

        <div class="cmx-tabsection">
            <div class="tab-content">
                <div class="tab-pane show active" id="RepostsStatus">
                    <div class="supadmshoptabs">
                        <div class="row">
                            <div class="col-lg-5 col-md-6 col6">
                                <form action="#" method="post">

                                    <div class="shopratetabnew mt-4">

                                        <div class="table-responsive  px-2">
                                            <table class="table table-bordered ">
                                                <thead>
                                                    <tr class="table-primary">
                                                        <th colspan="2">Total Shop Demo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start text-underline"
                                                            :style="{ width: '330px' }">In Process</td>
                                                        <td class="text-center">0000</td>
                                                    </tr>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start text-underline"
                                                            :style="{ width: '330px' }">Converted
                                                        </td>
                                                        <td class="text-center">0000</td>
                                                    </tr>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start text-underline"
                                                            :style="{ width: '330px' }">Canceled</td>
                                                        <td class="text-center">0000</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                        <div class="table-responsive px-2 ">
                                            <table class="table table-bordered ">
                                                <thead>
                                                    <tr class="table-primary">
                                                        <th colspan="2">Total Shop Admin Users</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start" :style="{ width: '330px' }">Paid Users
                                                            Active</td>
                                                        <td class="text-center">0000</td>
                                                    </tr>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start" :style="{ width: '330px' }">Canceled
                                                            Users</td>
                                                        <td class="text-center">0000</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                        <div class="table-responsive px-2 ">
                                            <table class="table table-bordered ">
                                                <thead>
                                                    <tr class="table-primary">
                                                        <th colspan="2">Shop Member Sales</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start" :style="{ width: '330px' }">Total Sales Per Month</td>
                                                        <td class="text-center">$0,000,000.00</td>
                                                    </tr>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start" :style="{ width: '330px' }">Average Sale per user</td>
                                                        <td class="text-center">$000.00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                </form>
                            </div>
                            <div class="col-lg-5 col-md-6 col-12">
                                <form action="#" method="post">

                                    <div class="shopratetabnew mt-4">

                                        <div class="table-responsive  px-2">
                                            <table class="table table-bordered ">
                                                <thead>
                                                    <tr class="table-primary">
                                                        <th colspan="2">Member Merchant Users</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start text-underline"
                                                            :style="{ width: '330px' }">Total Merchant Users</td>
                                                        <td class="text-center">0000</td>
                                                    </tr>
                                                  
                                                </tbody>
                                            </table>
                                        </div>
 
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
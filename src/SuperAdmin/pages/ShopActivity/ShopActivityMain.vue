<script setup>
</script>
<template>
    <div class="supdashAccoNav">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link show active" data-bs-toggle="tab" href="#Detailsshopactive">
                    Details</a>
            </li>
        </ul>

        <div class="cmx-tabsection">
            <div class="tab-content">
                <div class="tab-pane show active" id="Detailsshopactive">
                    <div class="supadmshoptabs">
                        <div class="d-flex align-items-center gap-4 w-25 my-4">
                            <select class="form-select form-select-superdash">
                                <option>Month</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                            <select class="form-select form-select-superdash">
                                <option>Year</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-12 col-12">
                                <form action="#" method="post">


                                    <div class="form-group  ">
                                        <label for="Vendorname" class="text-start ps-2">Total Customers</label>
                                        <input type="text" placeholder="00000" name="00000" required>
                                    </div>
                                    <div class="shopratetabnew mt-4">

                                        <div class="table-responsive  px-2">
                                            <table class="table table-bordered ">
                                                <thead>
                                                    <tr class="table-primary">
                                                        <th colspan="2">Estimate Profiles</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start" :style="{ width: '330px' }">Created</td>
                                                        <td class="text-center">000</td>
                                                    </tr>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start" :style="{ width: '330px' }">Converted
                                                        </td>
                                                        <td class="text-center">000</td>
                                                    </tr>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start" :style="{ width: '330px' }">Archived</td>
                                                        <td class="text-center">000</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                        <div class="table-responsive px-2 ">
                                            <table class="table table-bordered ">
                                                <thead>
                                                    <tr class="table-primary">
                                                        <th colspan="2">RO</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start" :style="{ width: '330px' }">RO -
                                                            Accounts Receivable</td>
                                                        <td class="text-center">000</td>
                                                    </tr>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start" :style="{ width: '330px' }">RO
                                                            Archived</td>
                                                        <td class="text-center">000</td>
                                                    </tr>
                                                    <tr class="text-center table-primary">
                                                        <td class="text-start" :style="{ width: '330px' }">Archived</td>
                                                        <td class="text-center">000</td>
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
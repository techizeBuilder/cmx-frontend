<script setup>
</script>

<template>
    <div class="accordion-body"> 
        <div class="cmx-dashcusprosection">
            <div class="d-flex align-items-center mb-4 justify-content-end">
                <div class="input-group w-25">
                    <input class="form-control border-end-0 border" type="search" placeholder="VIN, RO, Last Name, Cell, Cust ID" id="example-search-input">
                    <span class="input-group-append">
                        <button class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                            type="button">
                            <i class="fa fa-search"></i>
                        </button>
                    </span>
                </div>
              
            </div>
            <div class="row"> 
                <div class="col-lg-12">
                    <div class="staffsectiontableresponsive">
                        <div class="table-responsive">
                            <table class="text-center">
                                <thead>
                                    <tr>
                                        <th class="text-center">RO #</th>
                                        <th class="text-center">RO Status</th>
                                        <th class="text-center">Delivered</th>
                                        <th class="text-center">Delivery Date</th> 
                                        <th class="text-center">First Name</th>
                                        <th class="text-center">Last Name</th>
                                        <th class="text-center">Year</th>
                                        <th class="text-center">Make</th>
                                        <th class="text-center">Model</th>   
                                        <th class="text-center">Insurance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  
                                    
                                    <tr>
                                        <td>
                                        </td>
                                        <td class="text-center">Open</td>
                                        <td class="text-center">Delivered</td>
                                        <td class="text-center">03/24/2024</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td> 
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                        </td>
                                        <td class="text-center">Open</td>
                                        <td class="text-center">Delivered</td>
                                        <td class="text-center">03/24/2024</td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td> 
                                    </tr>

                                    <!-- Add more rows as needed -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navigation-sectionsame">
                <div class="box">
                    <select class="form-select">
                        <option selected>25</option>
                        <option value="1">50</option>
                        <option value="2">75</option>
                        <option value="3">100</option>
                    </select>
                </div>
                <div class="boxsg">
                    <div class="sect-box-arrow">
                        <i class="fa-solid fa-angle-left"></i>
                        <div class="box-count">01</div>
                        <i class="fa-solid fa-angle-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
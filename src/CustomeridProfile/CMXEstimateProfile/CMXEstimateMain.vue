<script setup>

const props = defineProps(['title']) 
</script>

<template>
    <div class="accordion-body">
        <div class="cmx-dashcusprosection">
            <div class="scrool-delevry">
                <ul class="nav nav-nav nav-tabs ">
                    <li class="nav-item">
                        <a class="nav-link show active" data-bs-toggle="tab" href="#ActiveTab">Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#ArchivedTab">Archived</a>
                    </li>

                </ul>
            </div>
            <div class="cmx-tabsection">
                <div class="tab-content">
                    <div class="tab-pane show active" id="ActiveTab">
                        <div class="estimatedetailsection">
                            <div class="row">
                                <div class="col-lg-12 col-rowset">
                                    <div class="d-flex flex-wrap align-items-end gap-sm-4 mb-4 justify-content-between">
                                        <div class="input-group w-25">
                                            <input class="form-control border-end-0 border" type="search" value="search"
                                                id="example-search-input">
                                            <span class="input-group-append">
                                                <button
                                                    class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                                                    type="button">
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </span>
                                        </div>
                                        <div class="d-flex align-items-end gap-4 mt-3 mt-sm-0  justify-content-end">
                                            <button type="button" class="btn viewall">View All</button>
                                            <div class="edit-section gap-4">

                                                <div class="edit-section">
                                                    <div class="form-cont">
                                                        <div class="form-group  ">
                                                           
                                                            <input type="text" id="year" name="Year" required=""
                                                                placeholder="Year">
                                                        </div>
                                                        <div class="form-group">
                                                          
                                                            <select class="form-select">
                                                                <option selected disabled>Month</option>
                                                                <option>January</option>
                                                                <option>February</option>
                                                                <option>March</option>
                                                                <option>April</option>
                                                                <option>May</option>
                                                                <option>June</option>
                                                                <option>July</option>
                                                                <option>August</option>
                                                                <option>September</option>
                                                                <option>October</option>
                                                                <option>November</option>
                                                                <option>December</option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div class="col-lg-12">
                                    <div class="staffsectiontableresponsive">
                                        <div class='table-responsive'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>EIDP</th>
                                                        <th>Last Name</th>
                                                        <th>First Name</th>
                                                        <th>Year</th>
                                                        <th>Make</th>
                                                        <th>Model</th>
                                                        <th>VIN</th>
                                                        <th>Insurance</th>
                                                        <th>Estimator</th>
                                                        <th>Total</th>
                                                        <th>Estimator Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- Add table rows (data) here -->
                                                    <!-- Example: -->
                                                    <tr>
                                                        <td>
                                                        </td>
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
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
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
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
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
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
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
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
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
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
                        </div>
                    </div>
                    <div class="tab-pane show  " id="ArchivedTab">
                        <div class="estimatedetailsection">
                            <div class="row">
                                <div class="col-lg-12 col-rowset">
                                    <div class="d-flex flex-wrap align-items-end gap-sm-4 mb-4 justify-content-between">
                                        <div class="input-group w-25">
                                            <input class="form-control border-end-0 border" type="search" value="search"
                                                id="example-search-input">
                                            <span class="input-group-append">
                                                <button
                                                    class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                                                    type="button">
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </span>
                                        </div>
                                        <div class="d-flex align-items-end gap-4 mt-3 mt-sm-0 justify-content-end">
                                            <button type="button" class="btn viewall">View All</button>
                                            <div class="edit-section gap-4">

                                                <div class="edit-section">
                                                    <div class="form-cont">
                                                        <div class="form-group  ">
                                                           
                                                            <input type="text" id="year" name="Year" required=""
                                                                placeholder="Year">
                                                        </div>
                                                        <div class="form-group">
                                                          
                                                            <select class="form-select">
                                                                <option selected disabled>Month</option>
                                                                <option>January</option>
                                                                <option>February</option>
                                                                <option>March</option>
                                                                <option>April</option>
                                                                <option>May</option>
                                                                <option>June</option>
                                                                <option>July</option>
                                                                <option>August</option>
                                                                <option>September</option>
                                                                <option>October</option>
                                                                <option>November</option>
                                                                <option>December</option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div class="col-lg-12">
                                    <div class="staffsectiontableresponsive">
                                        <div class='table-responsive'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>EIDP</th>
                                                        <th>Last Name</th>
                                                        <th>First Name</th>
                                                        <th>Year</th>
                                                        <th>Make</th>
                                                        <th>Model</th>
                                                        <th>VIN</th>
                                                        <th>Insurance</th>
                                                        <th>Estimator</th>
                                                        <th>Total</th>
                                                        <th>Estimator Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <!-- Add table rows (data) here -->
                                                    <!-- Example: -->
                                                    <tr>
                                                        <td>
                                                        </td>
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
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
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
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
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
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
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
                                                        <td> </td>
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
<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
//import 'datatables.net-colReorder';
DataTable.use(DataTablesCore);
const options = {
    colReorder: true,

};
</script>

<template>
    <div class="staffpermissionsection">


        <!-- <div class="row">
            <div class="col-lg-12">
                <div class="d-lg-flex align-items-end gap-4 mb-4 justify-content-end">

                    <div class="d-flex align-items-end gap-4  justify-content-end">
                        <div class="d-flex align-items-end gap-4  justify-content-end">
                            <button type="button" class="btn btn-light text-nowrap" data-bs-toggle="modal"
                                data-bs-target="#updatetitle">
                                UPDATE TITLE LIST</button>  
                          
                            <button type="button" class="btn btn-light text-nowrap px-4"
                                :style="{ backgroundColor: '#2400FF', boxShadow: 'none', color: '#fff' }">
                                Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="row">

            <div class="col-lg-12">
                <div class="VendorXstaffresponsive mystaffTable">

                  
                    <DataTable :options="options" class="display stafftbss text-center" width="100%">
                        <thead>
                            <tr class="text-center">
                                <th class="text-center">Action</th>
                                <th class="text-center">Status</th>
                                <th class="text-center">Title
                                </th>
                                <th class="text-center">First Name
                                </th>
                                <th class="text-center">Last Name
                                </th>
                                <th class="text-center">Email
                                </th>
                                <th class="text-center">Phone# 1
                                </th>
                                <th class="text-center">Phone# 2
                                </th>
                                <th class="text-center">User ID
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <!-- Add table rows (data) here -->
                            <!-- Example: -->
                            <tr class="text-center">
                                <td class="text-center">
                                    <div class="btn-group dropend">
                                        <a href="javascript:void(0)" class="dropdown-toggle" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis"></i>
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">UPDATE</a></li>
                                        </ul>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="time" name="times" value="yes"></div>
                                </td>
                                <td class="text-center">Title</td>
                                <td class="text-center">First Name</td>
                                <td class="text-center">Last Name</td>
                                <td class="text-center">Email</td>
                                <td class="text-center">Cell #</td>
                                <td class="text-center">Cell #</td>
                                <td class="text-center">User ID</td>
                            </tr>
                            <tr class="text-center">
                                <td class="text-center">
                                    <div class="btn-group dropend">
                                        <a href="javascript:void(0)" class="dropdown-toggle" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis"></i>
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">UPDATE</a></li>
                                        </ul>
                                    </div>
                                </td>
                                <td class="text-center">
                                      <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="time" name="times" value="yes"></div>
                                        
                                </td>
                                <td class="text-center">Title</td>
                                <td class="text-center">First Name</td>
                                <td class="text-center">Last Name</td>
                                <td class="text-center">Email</td>
                                <td class="text-center">Cell #</td>
                                <td class="text-center">Cell #</td>
                                <td class="text-center">User ID</td>
                            </tr>
                            <tr class="text-center">
                                <td class="text-center">
                                    <div class="btn-group dropend">
                                        <a href="javascript:void(0)" class="dropdown-toggle" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis"></i>
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">UPDATE</a></li>
                                        </ul>
                                    </div>
                                </td>
                                <td class="text-center">
                                      <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="time" name="times" value="yes"></div>
                                        
                                </td>
                                <td class="text-center">Title</td>
                                <td class="text-center">First Name</td>
                                <td class="text-center">Last Name</td>
                                <td class="text-center">Email</td>
                                <td class="text-center">Cell #</td>
                                <td class="text-center">Cell #</td>
                                <td class="text-center">User ID</td>
                            </tr>
                            <tr class="text-center">
                                <td class="text-center">
                                    <div class="btn-group dropend">
                                        <a href="javascript:void(0)" class="dropdown-toggle" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis"></i>
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">UPDATE</a></li>
                                        </ul>
                                    </div>
                                </td>
                                <td class="text-center">
                                      <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="time" name="times" value="yes"></div>
                                        
                                </td>
                                <td class="text-center">Title</td>
                                <td class="text-center">First Name</td>
                                <td class="text-center">Last Name</td>
                                <td class="text-center">Email</td>
                                <td class="text-center">Cell #</td>
                                <td class="text-center">Cell #</td>
                                <td class="text-center">User ID</td>
                            </tr>

                            <!-- Add more rows as needed -->
                        </tbody>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
    <div class="navigation-sectionsame">
        <div class="box">
            <select class="form-select">
                <option selected>1-25</option>
                <option value="1">25-50</option>
                <option value="2">50-75</option>
                <option value="3">75-100</option>
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
    <div class="modal fade login-popup-dashtwo " id="updatetitle">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-body">
                    <div class="section referpagesection">
                        <div class="header-Refershop">
                            <div class="header-nom">
                                <div class="silde">
                                    <div class="sliderone d-flex align-items-center justify-content-between w-100">
                                        <p class="shopnow">Update Title</p>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="container ">
                            <div class="space-btm-space">

                                <div class="row">
                                    <div class="col-lg-6">

                                        <p class="datexlable">Enter new title</p>
                                        <div class="customerXBox">
                                            <input class="form-control" type="text" />
                                        </div>
                                        <button type="button" class="btn btn-light mt-3">Add</button>
                                    </div>

                                    <div class="col-lg-6 ">
                                        <p class="datexlable">Title List</p>
                                        <div class="card  pb-2">
                                            <div class="card-body TitleOverflow">
                                                <ul class="noList">
                                                    <li>CEO (Chief Executive Officer)</li>
                                                    <li>Owner</li>
                                                    <li>NVP (National Vice President)</li>
                                                    <li>RVP (Regional Vice President) </li>
                                                    <li>COO (Chief Operating Officer)</li>
                                                    <li>Director</li>
                                                    <li>Controller</li>
                                                    <li>Administrative</li>
                                                    <li>Accountant</li>
                                                    <li>Office</li>
                                                    <li>Shop Foreman</li>
                                                    <li>Shop Manager</li>
                                                    <li>Estimator </li>
                                                    <li>Parts</li>
                                                    <li>Body Technician</li>
                                                    <li>Frame Technician</li>
                                                    <li>Painter</li>
                                                    <li>Detailer Technician</li>
                                                    <li>Paint Prepper</li>
                                                    <li>Maintenance Technician</li>
                                                    <li>Parts Delivery Driver</li>
                                                    <li>Shop Helper</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-end">
                                            <button type="button" class="btn btn-light mt-1"
                                                :style="{ fontSize: '12px' }">Remove</button>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-4">
                                        <div class="btn-btn d-flex justify-content-between gap-5">
                                            <button class="Cancel" type="button">Cancel</button>
                                            <button class="submit" type="submit">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
.TitleOverflow {
    max-height: 250px;
    overflow-y: auto;
}

.noList {
    list-style: none;
    padding: 0;
    margin: 0;
}

.addBtnx {
    position: absolute;
    right: 350px;
} 
.VendorXstaffresponsive .form-switch .form-check-input{
    float: none;
}
</style>
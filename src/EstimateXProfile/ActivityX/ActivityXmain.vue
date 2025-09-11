<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
//import 'datatables.net-colReorder';
DataTable.use(DataTablesCore);
const options = {

    searching: false,
};
</script>
<template>
    <div class="scrool-delevry">
        <ul class="nav nav-nav nav-tabs mt-2">
            <li class="nav-item">
                <a class="nav-link show active" data-bs-toggle="tab" href="#ACTIVITY">
                    ACTIVITY</a>
            </li>

        </ul>
    </div>
   
    <div class="table-set-holdcmsdash">

        <div class="staffsectiontableresponsive">

            <DataTable :options="options">
                <thead>
                    <tr class="text-center">
                        <th class="text-center">Activity Log</th>
                        <th class="text-center">Date | Time </th>
                        <th class="text-center">Staff ID</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Add table rows (data) here -->
                    <!-- Example: -->
                    <tr>
                        <td>Action</td>
                        <td class="text-center">Action</td>
                        <td class="text-center">Action</td>
                    </tr>
                    <tr>
                        <td>Action</td>
                        <td class="text-center">Action</td>
                        <td class="text-center">Action</td>
                    </tr>
                    <tr>
                        <td>Action</td>
                        <td class="text-center">Action</td>
                        <td class="text-center">Action</td>
                    </tr>
                    <tr>
                        <td>Action</td>
                        <td class="text-center">Action</td>
                        <td class="text-center">Action</td>
                    </tr>
                    <tr>
                        <td>Action</td>
                        <td class="text-center">Action</td>
                        <td class="text-center">Action</td>
                    </tr>



                    <!-- Add more rows as needed -->
                </tbody>
            </DataTable>

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
</template>
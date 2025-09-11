<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
//import 'datatables.net-colReorder';

import plus from './Icons/plus.png'
DataTable.use(DataTablesCore);
 
</script>
<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-12 col-rowset">
                    <div class="d-sm-flex align-items-center justify-content-between gap-2"> 
                        <h6>Vehicles Owned</h6>
                        <img :src="plus" alt="plus" :style="{width: '18px', height: '18px'}"/>
                    </div>
                </div>
            </div>

            <div class="staffsectiontableresponsive">

                <DataTable :options="options" class="display" width="100%">
                    <thead>
                        <tr>
                            <th class="text-center">Action</th>
                            <th class="text-center">Year</th>
                            <th class="text-center">Make</th>
                            <th class="text-center">Model</th>
                            <th class="text-center">VIN</th> 

                        </tr>
                    </thead>
                    <tbody class="text-center">

                        <tr>
                            <td>
                                <select class="fomr-select">
                                    <option>select</option>
                                    <option></option>
                                    <option></option>
                                </select>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td> 
                        </tr>
                        <tr>
                            <td>
                                <select class="fomr-select">
                                    <option>select</option>
                                    <option></option>
                                    <option></option>
                                </select>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td> 
                        </tr> <tr>
                            <td>
                                <select class="fomr-select">
                                    <option>select</option>
                                    <option></option>
                                    <option></option>
                                </select>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td> 
                        </tr> <tr>
                            <td>
                                <select class="fomr-select">
                                    <option>select</option>
                                    <option></option>
                                    <option></option>
                                </select>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td> 
                        </tr> <tr>
                            <td>
                                <select class="fomr-select">
                                    <option>select</option>
                                    <option></option>
                                    <option></option>
                                </select>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td> 
                        </tr>

                    </tbody>
                </DataTable>
            </div>

        </div>
    </div>
</template>
<style scoped>
select.fomr-select {
    border: none;
    background-color: transparent;
}

select.fomr-select:focus {
    outline: none;
}

tbody>tr>td {
    text-align: center;
}
</style>
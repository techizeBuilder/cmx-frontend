<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
//import 'datatables.net-colReorder';
DataTable.use(DataTablesCore);
</script>
<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-lg-12 col-rowset">
          <div class="d-sm-flex align-items-center justify-content-start gap-2">
            <i class="fa-solid fa-link"></i>
            <h6>Linked Customers (Family Members)</h6>
          </div>
        </div>
      </div>

      <div class="staffsectiontableresponsive">
        <DataTable :options="options" class="display" width="100%">
          <thead>
            <tr>
              <th class="text-center">Link / Unlink</th>
              <th class="text-center">C.I.D</th>
              <th class="text-center">Last Name</th>
              <th class="text-center">First Name</th>
              <th class="text-center">Phone / Cell 1</th>
              <th class="text-center">Phone 2</th>
              <th class="text-center">Owner?</th>
              <th class="text-center">Driver?</th>
              <th class="text-center">Relationship</th>
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

tbody > tr > td {
  text-align: center;
}
</style>

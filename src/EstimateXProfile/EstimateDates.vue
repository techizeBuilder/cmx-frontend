<script setup>
let EstimateDatesItem = [
  { name: "DRP Assignment Received", desc: "" },
  { name: "Estimate Appointment", desc: "" },
  { name: "Vertical Estimate Appointment", desc: "" },
  { name: "Estimate Completed", desc: "" },
  { name: "Appointment for repair set", desc: "" },
];

let VehicleItem = [{ name: "VIN", desc: "" }];
</script>

<template>
  <div class="card my-4">
    <div class="card-body">
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-5">
          <div class="mt-1">
            <a :href="'#CUSTOMERX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="estimateAnnHead">Estimate Dates</h6>
            </a>
            <div class="table-responsive estimateAnn">
              <table class="table table-bordered">
                <tbody>
                  <tr v-for="Item in EstimateDatesItem" v-bind:key="Item.name">
                    <th style="width: 120px;" class="text-end text-nowrap">
                      {{ Item.name }}
                    </th>
                    <td>{{ Item.desc }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-3">
          <div class="mt-0">
            <a :href="'#VEHICLEX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="estimateAnnHead">Days Active</h6>
            </a>
            <div class="table-responsive estimateAnn">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th style="width: 130px;" class="text-center">01</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="mt-0">
            <a :href="'#VEHICLEX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="estimateAnnHead">Estimate # Open</h6>
            </a>
            <div class="table-responsive estimateAnn">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th style="width: 130px;" class="text-center">
                      MM/DD/YYYY
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="mt-0">
            <a :href="'#VEHICLEX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="estimateAnnHead">Estimate Status</h6>
            </a>
            <div class="table-responsive estimateAnn">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th style="width: 130px;" class="text-center">
                      <select
                        class="form-select p-0"
                        :style="{
                          backgroundColor: 'transparent',
                          border: 'none',
                        }"
                      >
                        <option>In process</option>
                        <option>Archived Sale - Lost</option>
                        <option>Sold</option>
                      </select>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.table-responsive.estimateAnn .table tbody tr th {
  font-weight: 400;
  font-size: 14px;
  color: #000000;
}
</style>

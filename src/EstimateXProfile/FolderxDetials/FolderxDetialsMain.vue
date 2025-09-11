<script setup>
import { ref, computed, watch } from "vue";
import SettingsCol from "./SettingsCol.vue";
import { useStore } from "vuex";
import moment from "moment";
const store = useStore();
const storeCustomerDetails = computed(() => store.getters.getCustomerDetails);
const storeVehicalDetails = computed(() => store.getters.getVehicals);
const storeEstimateDetails = computed(() => store.getters.getEstimateDetails);
const storeInsuranceDetails = computed(() => store.getters.getInsuranceDetails);
const storeDatesDetails = computed(() => store.getters.getDatesDetails);
const storeStaffNames = computed(() => store.getters.getStaffNames);

let CustomerItem = ref([
  {
    name: "Owner",
    desc: "Last Name, First name",
  },
  { name: "1 Phone", desc: "555-555-5555" },
  { name: "2 Phone", desc: "555-555-5555" },
  { name: "Email", desc: "email@mail.com" },
  { name: "CID", desc: "10001" },
]);

let ESignatureitem = ref([
  { name: "Authorization Signed", signOne: "-", signSecond: "-" },
]);

let DatesOneItem = ref([
  { name: "Appointment | Tow | Drop", dateA: "", dateB: "" },
  { name: "Appointment Date", dateA: "", dateB: "" },
  { name: "Vehicle Arrival Date", dateA: "", dateB: "" },
]);
let DatesSecondItem = ref([
  { name: "Total Job Hours", dateC: "", dateD: "" },
  { name: "Target Date", dateC: "", dateD: "" },
  { name: "Days to Repair", dateC: "", dateD: "" },
]);
let DatesThirdItem = ref([
  { name: "Ready for Pickup", dateThirdE: "", dateThirdF: "" },
  { name: "Customer Notified", dateThirdE: "", dateThirdF: "" },
  { name: "Vehicle Delivered", dateThirdE: "", dateThirdF: "" },
]);

let VehicleItem = ref([
  { name: "VIN", desc: "" },
  { name: "Year", desc: "" },
  { name: "Make", desc: "" },
  { name: "Model", desc: "" },
  { name: "Mileage In", desc: "" },
  { name: "Mileage Out", desc: "" },
  { name: "Exterior Color", desc: "" },
  { name: "License Plate", desc: "" },
]);
let InsuranceItem = ref([
  { name: "Company", desc: "" },
  { name: "Claim#", desc: "" },
  { name: "1 Phone", desc: "" },
  { name: "Loss Type", desc: "" },
  { name: "Email", desc: "" },
  { name: "Adjuster", desc: "" },
  { name: "Deductible", desc: "" },
  { name: "Party to Loss", desc: "" },
]);

let StaffItem = ref([
  { name: "Estimator", desc: "Full name" },
  { name: "Body Tech", desc: "Full name" },
  { name: "Paint Tech", desc: "Full name" },
  { name: "Frame Tech", desc: "Full name" },
  { name: "Office", desc: "Full name" },
  { name: "Detail Tech", desc: "Full name" },
]);
let PartsItem = [
  { name: "Estimate Parts Ordered", PartsA: "", PartsB: "", PartsC: "" },
  { name: "Estimate Parts Arrived", PartsA: "", PartsB: "", PartsC: "" },
  { name: "Supplement Parts Ordered", PartsA: "", PartsB: "", PartsC: "" },
  { name: "Supplement Parts Arrived", PartsA: "", PartsB: "", PartsC: "" },
];
let ProductionOneItem = [
  { name: "Repair Plan Completed", ProdA: "", ProdB: "" },
  { name: "Supplement Hold", ProdA: "", ProdB: "" },
  { name: "Supplement Approved", ProdA: "", ProdB: "" },
];
let ProductionSecondItem = [
  { name: "Vehicle In Shop", ProdSecA: "", ProdSecB: "" },
  { name: "Vehicle Quality Check", ProdSecA: "", ProdSecB: "" },
  { name: "Vehicle Test Drive", ProdSecA: "", ProdSecB: "" },
  { name: "Vehicle Completed", ProdSecA: "", ProdSecB: "" },
];
let ProductionThirdItem = [
  { name: "Pre Scan", ProdThirA: "", ProdThirB: "", ProdThirC: "" },
  { name: "Post Scan", ProdThirA: "", ProdThirB: "", ProdThirC: "" },
  { name: "ADAS", ProdThirA: "", ProdThirB: "", ProdThirC: "" },
  { name: "Alignment", ProdThirA: "", ProdThirB: "", ProdThirC: "" },
  { name: "Wheel Sublet", ProdThirA: "", ProdThirB: "", ProdThirC: "" },
  { name: "Sublet Repair", ProdThirA: "", ProdThirB: "", ProdThirC: "" },
  { name: "Dealership", ProdThirA: "", ProdThirB: "", ProdThirC: "" },
  { name: "Custom I", ProdThirA: "", ProdThirB: "", ProdThirC: "" },
  { name: "Custom II", ProdThirA: "", ProdThirB: "", ProdThirC: "" },
  { name: "Custom III", ProdThirA: "", ProdThirB: "", ProdThirC: "" },
];

const backgroundColor = ref(null);

const refreshData = (items) => {
  backgroundColor.value = items.backgroundColor;
};
const updateItems = (source, target, fields) => {
  target.value = fields.map((field) => {
    let desc = "";
    if (field.name === "1 Phone" || field.name === "2 Phone") {
      desc = source.value ? formatPhoneNumber(source.value[field.key]) : "";
    } else {
      desc = source.value
        ? field.format
          ? field.format(source.value)
          : source.value[field.key]
        : "";
    }
    return { name: field.name, desc };
  });
};

const customerFields = [
  {
    name: "Owner",
    key: "lastName",
    format: (val) =>
      `${val.lastName}, ${storeCustomerDetails.value?.firstName}`,
  },
  { name: "1 Phone", key: "phone" },
  { name: "2 Phone", key: "phone2" },
  { name: "Email", key: "email" },
  { name: "CID", key: "customerId" },
];

const vehicleFields = [
  { name: "VIN", key: "vin" },
  { name: "Year", key: "year" },
  { name: "Make", key: "make" },
  { name: "Model", key: "model" },
  { name: "Mileage In", key: "milegeIn" },
  { name: "Mileage Out", key: "milegeOut" },
  { name: "Exterior Color", key: "exteriorColor" },
  { name: "License Plate", key: "licensePlate" },
];

const staffFields = [
  { name: "Estimator", key: "Estimator" },
  { name: "Body Tech", key: "Body Technician" },
  { name: "Paint Tech", key: "Painter" },
  { name: "Frame Tech", key: "Frame Technician" },
  { name: "Office", key: "Office" },
  { name: "Detail Tech", key: "Detail Technician" },
];

const insuranceFields = [
  { name: "Company", key: "InsuranceName" },
  { name: "Claim#", key: "claim" },
  { name: "1 Phone", key: "phone1" },
  { name: "Loss Type", key: "lossType" },
  { name: "Email", key: "email" },
  { name: "Adjuster", key: "AdjusterName" },
  { name: "Deductible", key: "deductible" },
  { name: "Party to Loss", key: "InsuredOrClaimant" },
];

const handleEstimateDate = (totalJobHour, cycleTime, daysForParts) => {
  if (isNaN(cycleTime) || Number(cycleTime) === 0) {
    return 0;
  }
  return isNaN(
    parseFloat(totalJobHour) / (Number(cycleTime) + Number(daysForParts))
  )
    ? 0
    : (
        parseFloat(totalJobHour) / Number(cycleTime) +
        Number(daysForParts)
      ).toFixed(2);
};

watch(storeEstimateDetails, () => {
  ESignatureitem.value = [
    {
      name: storeEstimateDetails.value?.eSignatureAuthorizationSigned,
      signOne: storeEstimateDetails.value?.eSignaturesDate
        ? moment(storeEstimateDetails.value?.eSignaturesDate)
            .tz("America/New_York")
            .format("MMMM Do YYYY, h:mm:ss a")
        : "Pending",
      signSecond: storeEstimateDetails.value?.eSignatureAuthorizationSigned,
    },
  ];
});

watch(storeCustomerDetails, () => {
  updateItems(storeCustomerDetails, CustomerItem, customerFields);
});

watch(storeVehicalDetails, () => {
  updateItems(storeVehicalDetails, VehicleItem, vehicleFields);
});

watch(storeInsuranceDetails, () => {
  updateItems(storeInsuranceDetails, InsuranceItem, insuranceFields);
});
watch(storeDatesDetails, () => {
  DatesOneItem.value[0].dateA =
    storeDatesDetails.value?.appTowDrop || "Pending";
  DatesOneItem.value[1].dateA = moment(
    storeDatesDetails.value?.appointmentDate
  ).isValid()
    ? moment(storeDatesDetails.value?.appointmentDate)
        .tz("America/New_York")
        .format("MM/DD/YYYY - hh:mm A")
    : "Pending";
  DatesOneItem.value[2].dateA = moment(
    storeDatesDetails.value?.vehicalArrivalDate
  ).isValid()
    ? moment(storeDatesDetails.value?.vehicalArrivalDate)
        .tz("America/New_York")
        .format("MM/DD/YYYY - hh:mm A")
    : "Pending";

  DatesSecondItem.value[0].dateC =
    storeDatesDetails.value?.totalJobHour || "Pending";
  DatesSecondItem.value[1].dateC = moment(
    storeDatesDetails.value?.targetDate
  ).isValid()
    ? moment(storeDatesDetails.value?.targetDate)
        .tz("America/New_York")
        .format("MM/DD/YYYY - hh:mm A")
    : "Pending";
  DatesSecondItem.value[2].dateC =
    handleEstimateDate(
      storeDatesDetails.value?.totalJobHour,
      storeDatesDetails.value?.cycleTime,
      storeDatesDetails.value?.daysForParts
    ) || "Pending";

  DatesThirdItem.value[0].dateThirdE = moment(
    storeDatesDetails.value?.pickupDate
  ).isValid()
    ? moment(storeDatesDetails.value?.pickupDate)
        .tz("America/New_York")
        .format("MM/DD/YYYY - hh:mm A")
    : "Pending";
  DatesThirdItem.value[1].dateThirdE =
    storeDatesDetails.value?.customerNotified || "Pending";
  DatesThirdItem.value[2].dateThirdE =
    storeDatesDetails.value?.vehicalDelivered || "Pending";
});

watch(storeStaffNames, () => {
  updateItems(storeStaffNames, StaffItem, staffFields);
});

function formatPhoneNumber(input) {
  if (input) {
    let phoneInput = input.replace(/\D+/g, "");
    phoneInput = phoneInput.substring(0, 10);
    if (phoneInput.length >= 4 && phoneInput.length <= 6) {
      return `${phoneInput.slice(0, 3)}-${phoneInput.slice(3)}`;
    } else if (phoneInput.length >= 7) {
      return `${phoneInput.slice(0, 3)}-${phoneInput.slice(
        3,
        6
      )}-${phoneInput.slice(6, 10)}`;
    } else {
      return phoneInput;
    }
  }
  return input;
}
</script>

<template>
  <div class="card">
    <SettingsCol @elementAdded="refreshData" />
    <div class="card-body pt-0">
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="mt-0">
            <h6 class="detialsMainH4folderx" :style="{ opacity: '0' }">
              &nbsp;
            </h6>

            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th
                      :style="{
                        width: '120px',
                        verticalAlign: 'middle',
                        fontWeight: '600',
                        fontSize: '18px',
                        color: '#636363',
                        backgroundColor: backgroundColor,
                      }"
                      class="text-end text-nowrap"
                    >
                      Estimate Profile #
                    </th>
                    <td
                      class="text-center"
                      colspan="2"
                      :style="{
                        fontSize: '22px',
                        fontWeight: '600',
                        verticalAlign: 'middle',
                        color: '#636363',
                        backgroundColor: backgroundColor,
                      }"
                    >
                      {{ storeEstimateDetails?.estimateId }}
                    </td>
                    <td
                      class="text-center"
                      :style="{
                        fontSize: '20px',
                        verticalAlign: 'middle',
                        color: '#636363',
                        backgroundColor: backgroundColor,
                      }"
                    >
                      S1
                    </td>
                  </tr>
                  <tr>
                    <th
                      class="text-end text-nowrap text-center"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      Linked RO
                    </th>
                    <td
                      class="text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    ></td>
                    <td
                      class="text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    ></td>
                    <td
                      class="text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Customer -->
          <div class="mt-1">
            <a :href="'#CUSTOMERX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">Customer</h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr
                    v-for="Item in CustomerItem"
                    v-bind:key="Item.name"
                    :style="{ backgroundColor: backgroundColor }"
                  >
                    <th
                      style="width: 120px;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.name }}
                    </th>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.desc }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- E-Signature -->
          <div class="mt-0">
            <a :href="'#ESIGNX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">
                E-Signature
              </h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr v-for="Item in ESignatureitem" v-bind:key="Item.name">
                    <th
                      style="width: 180px;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.name }}
                    </th>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.signOne }}
                    </td>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.signSecond }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Dates I -->
          <div class="mt-0">
            <a :href="'#DATESX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">
                Dates I
              </h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr v-for="Item in DatesOneItem" v-bind:key="Item.name">
                    <th
                      style="width: 180px;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.name }}
                    </th>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.dateA }}
                    </td>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.dateB }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Dates II -->
          <div class="mt-0">
            <a :href="'#DATESX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">
                Dates II
              </h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr v-for="Item in DatesSecondItem" v-bind:key="Item.name">
                    <th
                      style="width: 180px;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.name }}
                    </th>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.dateC }}
                    </td>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.dateD }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Dates III -->
          <div class="mt-0">
            <a :href="'#DATESX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">
                Dates III
              </h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr v-for="Item in DatesThirdItem" v-bind:key="Item.name">
                    <th
                      style="width: 180px;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.name }}
                    </th>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.dateThirdE }}
                    </td>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.dateThirdF }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4">
          <div class="mt-0">
            <a :href="'#VEHICLEX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">
                Vehicle
              </h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr v-for="Item in VehicleItem" v-bind:key="Item.name">
                    <th
                      style="width: 130px;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.name }}
                    </th>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.desc }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Insurance -->
          <div class="mt-0">
            <a :href="'#INSURANCEX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">
                Insurance
              </h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr v-for="Item in InsuranceItem" v-bind:key="Item.name">
                    <th
                      style="width: 130px;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.name }}
                    </th>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.desc }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Staff -->
          <div class="mt-0">
            <a :href="'#STAFFXFolder'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">
                Staff
              </h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr v-for="Item in StaffItem" v-bind:key="Item?.name">
                    <th
                      style="width: 130px;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item?.name }}
                    </th>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item?.desc }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4">
          <!-- PartsItem -->
          <div class="mt-0">
            <a :href="'#PARTSX'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">
                Parts
              </h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr v-for="Item in PartsItem" v-bind:key="Item.name">
                    <th
                      style="width: 160px; text-wrap: nowrap;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.name }}
                    </th>
                    <td
                      style="width: 120px; text-wrap: nowrap;"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.PartsA }}
                    </td>
                    <td
                      style="min-width: 100px; width: 100px; text-wrap: nowrap;"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.PartsB }}
                    </td>
                    <td
                      style="min-width: 50px; width: 50px; text-wrap: nowrap;"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.PartsC }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Production I -->
          <div class="mt-0">
            <a :href="'#PRODUCTIONXFolder'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">
                Production I
              </h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr v-for="Item in ProductionOneItem" v-bind:key="Item.name">
                    <th
                      style="width: 200px;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.name }}
                    </th>
                    <td
                      style="width: 180px;"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.PartsA }}
                    </td>
                    <td
                      style="min-width: 80px; width: 80px;"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.PartsB }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Production II -->
          <div class="mt-0">
            <a :href="'#PRODUCTIONXFolder'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">
                Production II
              </h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr
                    v-for="Item in ProductionSecondItem"
                    v-bind:key="Item.name"
                  >
                    <th
                      style="width: 200px;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.name }}
                    </th>
                    <td
                      style="width: 180px;"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.ProdSecA }}
                    </td>
                    <td
                      style="min-width: 80px; width: 80px;"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.ProdSecB }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Production III -->
          <div class="mt-0">
            <a :href="'#PRODUCTIONXFolder'" v-smooth-scroll="{ offset: -50 }">
              <h6 class="detialsMainH4folderx">
                Production III
              </h6>
            </a>
            <div class="table-responsive detialsAnna">
              <table class="table table-bordered">
                <tbody>
                  <tr
                    v-for="Item in ProductionThirdItem"
                    v-bind:key="Item.name"
                  >
                    <th
                      style="width: 200px;"
                      class="text-end text-nowrap"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.name }}
                    </th>
                    <td
                      style="width: 200px;"
                      :style="{ backgroundColor: backgroundColor }"
                    >
                      {{ Item.ProdThirA }}
                    </td>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.ProdThirB }}
                    </td>
                    <td :style="{ backgroundColor: backgroundColor }">
                      {{ Item.ProdThirC }}
                    </td>
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
.table-responsive.detialsAnna .table tbody tr th {
  font-weight: 400;
  font-size: 14px;
  color: #000000;
}
.detialsMainH4folderx {
  color: #434343;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
  margin-bottom: 0;
}
</style>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useRouter } from "vue-router";

import moment from "moment";

import Estim from "../../Icons/Estim.svg";
import DropdownAX from "../../Icons/DropdownAX.png";
import printAX from "../../Icons/printAX.png";
import Uplaod from "../../Icons/Uplaod.png";
import SearchPopup from "../../../CMXDashboard/SearchPopup.vue";
import axios from "axios";
import { showSuccessToast } from "../../../toster";

const router = useRouter();
const apiUrl = import.meta.env.VITE_API_URL;
const AuthToken = localStorage.getItem("AuthToken");
const shopId = localStorage.getItem("shopId");
const modelDate = ref(null);
const modelTimeStart = ref(null);
const modelTimeEnd = ref(null);
const isSaturdayClosed = ref(false);
const isSundayClosed = ref(false);
const selectedDuration = ref(1);
const todayDate = new Date();
const date = ref([moment(todayDate).day(0), moment(todayDate).day(6)]);
let colCond = 0;

const timeArray = computed(() => {
  const array = [];
  for (let hour = 7; hour <= 19; hour++) {
    array.push({ value: hour });
  }
  return array;
});

const outerValue = (value) => {
  colCond = 0;
  return value;
};
const colSapnFun = (innerIndex) => {
  const result =
    moment(dynEvents.value[eventNo - 1]?.endDate).diff(
      moment(dynEvents.value[eventNo - 1]?.startDate),
      "days"
    ) + 1;
  if (
    moment(dynEvents.value[eventNo - 1]?.endDate).diff(
      moment(dynEvents.value[eventNo - 1]?.startDate),
      "days"
    ) > 0
  ) {
    colCond =
      innerIndex +
      1 +
      moment(dynEvents.value[eventNo - 1]?.endDate).diff(
        moment(dynEvents.value[eventNo - 1]?.startDate),
        "days"
      );
    return result;
  } else {
    colCond = 0;
    return result;
  }
};
const events = ref([]);
const dynEvents = ref(
  events.value.filter((item) => {
    const startDateIsAfterMinDate = moment(item.startDate).isSameOrAfter(
      date.value[0],
      "day"
    );
    const endDateIsBeforeMaxDate = moment(item.endDate).isSameOrBefore(
      date.value[1],
      "day"
    );
    return startDateIsAfterMinDate && endDateIsBeforeMaxDate;
  })
);

let eventNo = 0;
const arrDate = ref([]);
let arrRef = [];
const diffDate = () => {
  const difData = moment(date.value[1]).diff(moment(date.value[0]), "days") + 1;
  // console.log(difData);
  arrDate.value = [];
  const start = moment(date.value[0]);
  while (start.isSameOrBefore(date.value[1])) {
    arrDate.value.push({
      date: start.format("YYYY-MM-DD"),
      event: events.value
        .filter((item) =>
          moment(new Date(item.startDate))
            .utc()
            .startOf("day")
            .isSame(moment(start), "day")
        )
        .sort((a, b) => {
          return new Date(a.startDate) - new Date(b.startDate);
        }),
    });
    start.add(1, "days");
  }
  // console.log(arrDate.value);
  arrRef = arrDate.value.map(() => 0);
  // console.log("Arr Made", arrDate.value);
  return difData;
};

const eventHad = (item, time, index) => {
  const currentdate = new Date(item.event[arrRef[index]]?.startDate);
  const hour = currentdate.getHours();
  if (hour === time.value) {
    const val = arrRef[index];
    arrRef[index] = val + 1;
    return val;
  } else {
    return null;
  }
};

const allEvents = ref(false);
const eventsValues = ref([
  {
    label: "Estimator 1",
    checked: true,
    classnew: "EstimatorOne",
    backgroundColor: "#9FC0FF",
  },
  {
    label: "Estimator 2",

    classnew: "EstimatorTwo",
    backgroundColor: "#C0FFB5",
  },
  {
    label: "Estimator 3",

    classnew: "Estimatorthree",
    backgroundColor: "#00FFFF",
  },
  {
    label: "Estimator 4",

    classnew: "EstimatorFour",
    backgroundColor: "#FFF975",
  },
]);
const ifCondition = (ifData, eventDate) => {
  if (
    ifData === moment(eventDate?.startDate).format("YYYY-MM-DD") &&
    eventNo < events.value.length
  ) {
    eventNo = eventNo + 1;
    return true;
  }
  return false;
};

let eventId = 0;
const dragStart = (event) => {
  const divId = event.target.id;
  eventId = divId;
};

const dragEnd = async (time, data, start) => {
  const updatedDate = moment(data.date).hour(time.value).minute(start);
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.post(
      `${apiUrl}/estimateAppoinment/update/${eventId}`,
      { estimateAppointmentDate: updatedDate.format() },
      config
    );
    await fetchAppoinment();
  } catch (error) {
    console.log(error);
  }
};
watch(
  eventsValues,
  (newEventsValues) => {
    eventNo = 0;
    dynEvents.value = events.value.filter(
      (item) =>
        eventsValues.value.find((event) => event.label === item.category)
          ?.checked
    );
    dynEvents.value = dynEvents.value.filter((item) => {
      const startDateIsAfterMinDate = moment(item.startDate).isSameOrAfter(
        date.value[0],
        "day"
      );
      const endDateIsBeforeMaxDate = moment(item.endDate).isSameOrBefore(
        date.value[1],
        "day"
      );
      return startDateIsAfterMinDate && endDateIsBeforeMaxDate;
    });
  },
  { deep: true }
);
watch(date, (newDate) => {
  eventNo = 0;
  dynEvents.value = events.value.filter((item) => {
    const startDateIsAfterMinDate = moment(item.startDate).isSameOrAfter(
      newDate[0],
      "day"
    );
    const endDateIsBeforeMaxDate = moment(item.endDate).isSameOrBefore(
      newDate[1],
      "day"
    );
    return startDateIsAfterMinDate && endDateIsBeforeMaxDate;
  });
});
watch(selectedDuration, (newSelectedDuration) => {
  eventNo = 0;
  const newEndDate = moment(date.value[0]).add(newSelectedDuration, "weeks");
  date.value = [
    moment(todayDate).day(0),
    newEndDate.subtract(1, "day").toDate(),
  ];
});
watch(allEvents, (newAllEvents) => {
  eventId = 0;
  if (allEvents.value === true) {
    dynEvents.value = events.value.filter((item) => {
      const startDateIsAfterMinDate = moment(item.startDate).isSameOrAfter(
        date.value[0],
        "day"
      );
      const endDateIsBeforeMaxDate = moment(item.endDate).isSameOrBefore(
        date.value[1],
        "day"
      );
      return startDateIsAfterMinDate && endDateIsBeforeMaxDate;
    });
    eventsValues.value = eventsValues.value.map((item) => ({
      ...item,
      checked: true,
    }));
    eventNo = 0;
  } else {
    dynEvents.value = [];
    eventsValues.value = eventsValues.value.map((item) => ({
      ...item,
      checked: false,
    }));
    eventNo = 0;
  }
});
watch(isSaturdayClosed, (newIsSaturdayClosed) => {
  eventId = 0;
  dynEvents.value = dynEvents.value.filter(
    (item) => moment(item.startDate).format("dddd") !== "Saturday"
  );
  eventNo = 0;
});
watch(isSundayClosed, (newIsSundayClosed) => {
  eventId = 0;
  dynEvents.value = dynEvents.value.filter(
    (item) => moment(item.startDate).format("dddd") !== "Sunday"
  );
  eventNo = 0;
});

const handleModel = (time, timeIndex, interval) => {
  const timeAdditions = [0, 15, 30, 45];

  const timeToAdd = timeAdditions[interval];

  appoinmentData.value.estimateAppointmentDate = moment(date.value[0])
    .add(timeIndex, "days")
    .hour(time.value)
    .minute(timeToAdd)
    .toDate();
  appoinmentData.value.appointmentType = "Estimate Appointment";
  appoinmentData.value.durationOfAppointment = 15;

  
  router.push("/officex/estimate-appointment");

  // const modal = document.getElementById("insuranceSetting");
  // const modalInstance = new bootstrap.Modal(modal);
  // modalInstance.show();
};

const appoinmentData = ref({});
const handleAppoinment = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    appoinmentData.value.phone = formatPhoneNumberToDigit(
      appoinmentData.value.phone
    );
    const response = await axios.post(
      `${apiUrl}/estimateAppoinment/register/${shopId}`,
      appoinmentData.value,
      config
    );
    showSuccessToast(response.data.msg);
    document.getElementById("closeCommentModelInsurance").click();
    appoinmentData.value = {};
    await fetchAppoinment();
  } catch (error) {
    console.log(error);
  }
};

const fetchAppoinment = async () => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/estimateAppoinment/get/shop/${shopId}`,
      appoinmentData.value,
      config
    );
    events.value = [];
    response.data.data.map((item) => {
      const startDate = moment(item.estimateAppointmentDate);
      const endDate = startDate
        .clone()
        .add(item.durationOfAppointment, "minutes");
      const durationInMinutes = moment
        .duration(endDate.diff(startDate))
        .asMinutes();
      const startDateHour = startDate.hour();
      const endDateHour = endDate.hour();
      const eventBase = {
        id: item._id,
        folder: "<FolderX#>",
        insurance: item.insurance,
        name: item.firstName,
        body: "B:<Body Tech Name>",
        backgroundColor: "#9FC0FF",
        category: "Come Back",
      };

      if (
        startDateHour !== endDateHour &&
        startDate.minute() !== 0 &&
        endDate.minute() !== 0
      ) {
        const remainingMinutes = 60 - startDate.minute();
        const newStartDate = startDate.clone().add(remainingMinutes, "minutes");

        events.value.push({
          ...eventBase,
          date: startDate.format(),
          startDate: startDate.format(),
          endDate: endDate.format(),
          duration: remainingMinutes,
          startMinute: startDate.minute(),
          endMinute: endDate.minute(),
          secondCheck: false,
          hour: startDate.hour(),
        });

        events.value.push({
          ...eventBase,
          date: newStartDate.format(),
          startDate: newStartDate.format(),
          endDate: endDate.format(),
          duration: durationInMinutes - remainingMinutes,
          startMinute: newStartDate.minute(),
          endMinute: endDate.minute(),
          secondCheck: true,
          hour: newStartDate.hour(),
        });
      } else {
        events.value.push({
          ...eventBase,
          date: startDate.format(),
          startDate: startDate.format(),
          endDate: endDate.format(),
          duration: item.durationOfAppointment,
          startMinute: startDate.minute(),
          endMinute: endDate.minute(),
          secondCheck: false,
          hour: startDate.hour(),
        });
      }
    });
    diffDate();
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await fetchAppoinment();

  const modalElement = document.getElementById("insuranceSetting");
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modalElement.addEventListener("hidden.bs.modal", () => {
      appoinmentData.value = {};
    });
  }
});

const handleEdit = async (id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/estimateAppoinment/get/Appoinment/${id}`,
      appoinmentData.value,
      config
    );
    const modal = document.getElementById("insuranceSetting");
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    appoinmentData.value = response.data.data;
    appoinmentData.value.estimateAppointmentDate = moment(
      response.data.data.estimateAppointmentDate
    );
  } catch (error) {
    console.log(error);
  }
};

const DeleteAppoinment = async (id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${AuthToken}` },
    };
    const response = await axios.get(
      `${apiUrl}/estimateAppoinment/delete/${id}`,
      appoinmentData.value,
      config
    );
    showSuccessToast(response.data.msg);
    document.getElementById("closeCommentModelInsurance").click();
    appoinmentData.value = {};
    await fetchAppoinment();
  } catch (error) {
    console.log(error);
  }
};

function hasValidTimeSlot(item, index) {
  const prevEvent = item.event[arrRef[index] - 1];
  const currentEvent = item.event[arrRef[index]];

  return (
    prevEvent?.endMinute &&
    currentEvent?.startMinute &&
    prevEvent.endMinute !== currentEvent.startMinute &&
    prevEvent.hour === currentEvent.hour
  );
}

const handleNext = () => {
  document.getElementById("closeCommentModelInsurance").click();
  setTimeout(() => {
    router.push("/newestimateappoitment");
  }, 100);
};

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

function formatPhoneNumberToDigit(input) {
  let phoneInput = input.replace(/\D+/g, "");
  if (phoneInput.length >= 4 && phoneInput.length <= 6) {
    return phoneInput.slice(0, 3) + phoneInput.slice(3);
  } else if (phoneInput.length >= 7) {
    return (
      phoneInput.slice(0, 3) + phoneInput.slice(3, 6) + phoneInput.slice(6)
    );
  } else {
    return phoneInput;
  }
}
</script>
<template>
  <div class="row mt-4">
    <div class="col-sm-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <p class="m-0 est">EST</p>
        <select
          class="form-select mb-2 w-50"
          aria-label="small select example"
          v-model="selectedDuration"
        >
          <option value="1">1 Week</option>
          <option value="2">2 Weeks</option>
        </select>
      </div>

      <VueDatePicker v-model="date" inline range week-start="0" />
      <div class="card mt-2">
        <div
          class="card-body"
          :style="{ boxShadow: '0px 3.297px 3.297px 0px rgba(0, 0, 0, 0.25)' }"
        >
          <h6 class="mb-2">Shop Closed</h6>
          <label class="datelableaAq" style="margin-bottom: 2px;">
            <input type="checkbox" v-model="isSaturdayClosed" />
            Saturday
          </label>
          <label class="datelableaAq">
            <input type="checkbox" v-model="isSundayClosed" />
            Sunday
          </label>
        </div>
      </div>
      <div class="mt-5 d-flex align-items-center justify-content-start gap-2">
        <h6 class="m-0">Estimator</h6>
        <img :src="Estim" alt="Estim" />
      </div>
      <div class="mt-3">
        <label
          v-for="(item, index) in eventsValues"
          :key="index"
          class="datelableaAq"
          :style="{ marginBottom: '10px' }"
          :class="item.classnew"
        >
          <input type="checkbox" v-model="eventsValues[index].checked" />
          <span class="dataNuAx">3</span> {{ item.label }}
        </label>
      </div>
    </div>
    <div class="col-sm-9">
      <div class="d-flex justify-content-end">
        <div class="input-container w-25">
          <div class="input-group flex-nowrap">
            <input
              class="form-control border"
              type="search"
              id="example-search-input"
              placeholder="VIN, RO, Last Name, Cell, Cust ID"
            />
            <span class="input-group-append">
              <button
                class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                type="button"
              >
                <i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
      </div>

      <div class="col mt-3" style="position: relative;">
        <div class="table-responsive">
          <div class="text-start d-flex">
            <i
              class="fa-solid fa-chevron-left p-2"
              type="button"
              @click="
                () => {
                  const momentDate0 = moment(date[0]);
                  const momentDate1 = moment(date[1]);
                  date[0] = momentDate0.subtract(7, 'days').toDate();
                  date[1] = momentDate1.subtract(7, 'days').toDate();
                }
              "
            ></i>
            <i
              class="fa-solid fa-chevron-right p-2"
              type="button"
              @click="
                () => {
                  const momentDate0 = moment(date[0]).utc();
                  const momentDate1 = moment(date[1]).utc();
                  date[0] = momentDate0.add(7, 'days').toDate();
                  date[1] = momentDate1.add(7, 'days').toDate();
                }
              "
            ></i>
            <div class="fs-4">
              {{ moment(new Date()).format("MMMM YYYY") }}
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th v-for="index in diffDate()" :key="index">
                  <div
                    style="
                      text-align: center;
                      font-size: small;
                      text-decoration: none;
                    "
                  >
                    {{
                      moment(date[0])
                        .add(index - 1, "days")
                        .format("dddd")
                    }}
                  </div>
                  <div style="text-align: center; font-size: xx-large;">
                    {{
                      moment(date[0])
                        .add(index - 1, "days")
                        .format("D")
                    }}
                  </div>
                  <input
                    type="checkbox"
                    v-if="index === 1 || index === 8"
                    v-model="isSundayClosed"
                  />
                  <input
                    type="checkbox"
                    v-else-if="index === 7 || index === 14"
                    v-model="isSaturdayClosed"
                  />
                  <input v-else type="checkbox" />
                </th>
              </tr>
            </thead>
            <tbody></tbody>
            <tbody>
              <tr v-for="time in timeArray" :key="time.value">
                <td style="width: 35px; white-space: nowrap;">
                  {{ time.value > 12 ? time.value - 12 : time.value }}
                  {{ time.value >= 12 ? "PM" : "AM" }}
                </td>
                <template v-for="(item, index) in arrDate">
                  <td
                    :id="item + '_' + index"
                    :itemTable="item?.event[arrRef[index] - 1].id"
                    v-if="item?.event[eventHad(item, time, index)]"
                    style="width: 80px; height: 96px;"
                    class="p-0"
                  >
                    <!-- :style="{'border-top-color':
                          item?.event[arrRef[index] - 1]?.backgroundColor,'border-bottom-color':
                          item?.event[arrRef[index] - 1]?.backgroundColor,}" -->
                    <div
                      class="w-100 h-25"
                      @click="handleModel(time, index, 0)"
                      v-if="item?.event[arrRef[index] - 1]?.startMinute !== 0"
                      v-for="(dragItem, dragIndex) in item?.event[
                        arrRef[index] - 1
                      ].startMinute / 15"
                      @dragover.prevent
                      @drop.prevent="dragEnd(time, item, dragIndex * 15)"
                    ></div>
                    <div
                      class="d-flex gap-2 p-1"
                      :style="{
                        background:
                          item?.event[arrRef[index] - 1]?.backgroundColor,
                        height: `${
                          (item?.event[arrRef[index] - 1]?.duration / 15) * 25
                        }%`,
                      }"
                      @click="handleEdit(item?.event[arrRef[index] - 1]?.id)"
                      :id="item?.event[arrRef[index] - 1].id"
                      draggable="true"
                      @dragover.prevent
                      @drag.prevent="dragStart($event)"
                    >
                      <div
                        class="CFirstDiv"
                        v-if="!item?.event[arrRef[index] - 1]?.secondCheck"
                      >
                        <div class="CImgD">
                          <img
                            :src="DropdownAX"
                            alt="DropdownAX"
                            :style="{ width: '8px' }"
                          />
                        </div>
                        <div class="CTitleD">
                          {{ item?.event[arrRef[index] - 1]?.name }}
                          {{ item?.event[arrRef[index] - 1]?.duration }}
                          {{ item?.event[arrRef[index] - 1]?.startDate }}
                        </div>
                        <div class="CelliD">
                          <i
                            class="fa-solid fa-ellipsis-vertical"
                            :style="{ fontSize: '15px' }"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="hasValidTimeSlot(item, index)"
                      v-for="(i, dragIndex) in (item?.event[arrRef[index]]
                        ?.startMinute -
                        item?.event[arrRef[index] - 1]?.endMinute) /
                      15"
                      class="h-25 w-100"
                      :id="
                        Number(item?.event[arrRef[index] - 1]?.endMinute) +
                        dragIndex * 15
                      "
                      @dragover.prevent
                      @drop.prevent="dragEnd(time, item, $event.target.id)"
                    ></div>
                    <template
                      v-if="((60 - item?.event[arrRef[index] - 1]?.duration) / 15)"
                      v-for="i in ((60 - item?.event[arrRef[index] - 1]?.duration) / 15)"
                      :key="i"
                    >
                      <div
                        v-if="item?.event[eventHad(item, time, index)]"
                        class="d-flex gap-2 p-1"
                        :style="{
                          background:
                            item?.event[arrRef[index] - 1]?.backgroundColor,
                          height: `${
                            (item?.event[arrRef[index] - 1]?.duration / 15) * 25
                          }%`,
                        }"
                        @click="handleEdit(item?.event[arrRef[index] - 1]?.id)"
                        :id="item?.event[arrRef[index] - 1]?.id"
                        draggable="true"
                        @dragover.prevent
                        @drag.prevent="dragStart($event)"
                      >
                        <div
                          class="d-flex gap-2 p-1"
                          :style="{
                            background:
                              item?.event[arrRef[index] - 1]?.backgroundColor,
                            height: `${
                              (item?.event[arrRef[index] - 1]?.duration / 15) *
                              25
                            }%`,
                          }"
                          @click="
                            handleEdit(item?.event[arrRef[index] - 1]?.id)
                          "
                          :id="item?.event[arrRef[index] - 1]?.id"
                          draggable="true"
                          @dragover.prevent
                          @drag.prevent="dragStart($event)"
                        >
                          <div class="CFirstDiv">
                            <div class="CImgD">
                              <img
                                :src="DropdownAX"
                                alt="DropdownAX"
                                :style="{ width: '8px' }"
                              />
                            </div>
                            <div class="CTitleD">
                              {{ item?.event[arrRef[index] - 1]?.name }}
                              {{ item?.event[arrRef[index] - 1]?.duration }}
                              {{ item?.event[arrRef[index] - 1]?.startMinute }}
                            </div>
                            <div class="CelliD">
                              <i
                                class="fa-solid fa-ellipsis-vertical"
                                :style="{ fontSize: '15px' }"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <div
                      class="w-100 h-25"
                      @click="handleModel(time, index, $event.target.id / 15)"
                      :id="
                        Number(item?.event[arrRef[index] - 1]?.duration) +
                        dragIndex * 15
                      "
                      @dragover.prevent
                      @drop.prevent="dragEnd(time, item, $event.target.id)"
                      v-if="
                        60 -
                          (Number(item?.event[arrRef[index] - 1]?.startMinute) +
                            Number(item?.event[arrRef[index] - 1]?.duration)) >
                        0
                      "
                      v-for="(drag,dragIndex) in ((60 -
                        item?.event[arrRef[index] - 1]?.duration) /
                      15)"
                    ></div>
                  </td>
                  <td
                    v-else
                    style="width: 80px; height: 96px;"
                    class="emptyTb p-0"
                  >
                    <div
                      class="w-100 h-25"
                      @click="handleModel(time, index, 0)"
                      @dragover.prevent
                      @drop.prevent="dragEnd(time, item, 0)"
                    ></div>
                    <div
                      class="w-100 h-25"
                      @click="handleModel(time, index, 1)"
                      @dragover.prevent
                      @drop.prevent="dragEnd(time, item, 15)"
                    ></div>
                    <div
                      class="w-100 h-25"
                      @click="handleModel(time, index, 2)"
                      @dragover.prevent
                      @drop.prevent="dragEnd(time, item, 30)"
                    ></div>
                    <div
                      class="w-100 h-25"
                      @click="handleModel(time, index, 3)"
                      @dragover.prevent
                      @drop.prevent="dragEnd(time, item, 45)"
                    ></div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal vdatepicktimedit"
    id="insuranceSetting"
    tabindex="-1"
    aria-labelledby="insuranceSettingLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header" :style="{ background: '#D2D4D7' }">
          <div class="d-flex align-items-center gap-3">
            <h6 class="m-0">Quick Estimate Appointment</h6>
          </div>
          <button
            type="button"
            class="btn-close"
            id="closeCommentModelInsurance"
            data-bs-dismiss="modal"
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body px-5">
          <div class="d-flex align-items-end justify-content-end">
            <router-link
              to="/newestimateappoitment"
              class="btn btn-light text-nowrap"
              data-bs-dismiss="modal"
            >
              <span data-bs-dismiss="modal"> Welcome Form</span>
            </router-link>
            <SearchPopup
              :options="[
                'Customer ID',
                'Estimate ID',
                'RO #',
                'First Name',
                'Last Name',
                'Company',
                'Customer Phone',
              ]"
            />
          </div>
          <div class="row g-3 mt-4">
            <div class="col-sm-12 col-md-6 px-4">
              <div class="d-flex flex-column gap-4">
                <div>
                  <p class="datexlable">First name</p>
                  <div class="customerXBox">
                    <input
                      v-model="appoinmentData.firstName"
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <p class="datexlable">Last name</p>
                  <div class="customerXBox">
                    <input
                      v-model="appoinmentData.lastName"
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <p class="datexlable">Cell # / Phone 1</p>
                  <div class="customerXBox">
                    <input
                      v-model="appoinmentData.phone"
                      @input="
                        () =>
                          (appoinmentData.phone = formatPhoneNumber(
                            appoinmentData.phone
                          ))
                      "
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-md-6 px-4">
              <div class="d-flex flex-column gap-4">
                <div>
                  <p class="datexlable">Email</p>
                  <div class="customerXBox">
                    <input
                      v-model="appoinmentData.email"
                      class="form-control"
                      type="email"
                    />
                  </div>
                </div>
                <div>
                  <p class="datexlable">Insurance?</p>
                  <div class="customerXBox">
                    <input
                      v-model="appoinmentData.insurance"
                      class="form-control"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="row g-3 mt-5 pt-4"
            :style="{ borderTop: '1px solid #000' }"
          >
            <div class="col-sm-12 col-md-6 px-4">
              <div class="d-flex flex-column gap-4">
                <div>
                  <p class="datexlable">Appointment Type</p>
                  <div class="customerXBox">
                    <select
                      v-model="appoinmentData.appointmentType"
                      class="form-select"
                    >
                      <option value="Estimate Appointment"
                        >Estimate Appointment</option
                      >
                    </select>
                  </div>
                </div>
                <div>
                  <p class="datexlable">Estimate Appointment Date | Time</p>
                  <div class="customerXBox">
                    <VueDatePicker
                      v-model="appoinmentData.estimateAppointmentDate"
                      select-text="Apply"
                      position="left"
                      time-picker-inline
                      :is-24="false"
                    >
                    </VueDatePicker>
                  </div>
                </div>
                <div>
                  <p class="datexlable">Duration of Appointment</p>
                  <div class="customerXBox">
                    <select
                      v-model="appoinmentData.durationOfAppointment"
                      class="form-select"
                    >
                      <option value="15">15 Minute</option>
                      <option value="30">30 Minute</option>
                      <option value="45">45 Minute</option>
                      <option value="60">60 Minute</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 px-4">
              <div class="d-flex flex-column gap-4">
                <div>
                  <p class="datexlable">Estimator</p>
                  <div class="customerXBox">
                    <select
                      v-model="appoinmentData.estimator"
                      class="form-select"
                    >
                      <option selected>Estimator new</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="form-check-label">
                    Chatlink Opt In? &nbsp;&nbsp;
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="remember"
                      v-model="appoinmentData.chatlinkOpt"
                    />
                  </label>
                </div>
                <div>
                  <label class="form-check-label">
                    Welcome Form Completed? &nbsp;&nbsp;
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="remember"
                      v-model="appoinmentData.welcomeFormComp"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div
            class="row g-3 mt-5 pt-4"
            :style="{ borderTop: '1px solid #000' }"
          >
            <div class="col-sm-12 col-md-6 px-4">
              <div class="d-flex flex-column gap-4">
                <div>
                  <p class="datexlable">Customer Profile #</p>
                  <div class="customerXBox d-flex align-items-center gap-2">
                    <img :src="Uplaod" alt="Uplaod" />
                    <input
                      class="form-control"
                      type="text"
                      placeholder="C000001"
                      disabled
                      v-model="appoinmentData.customerProfile"
                    />
                  </div>
                </div>
                <div>
                  <p class="datexlable">Estimate Profile #</p>
                  <div class="customerXBox d-flex align-items-center gap-2">
                    <img :src="Uplaod" alt="Uplaod" />
                    <input
                      class="form-control"
                      type="text"
                      placeholder="E000001"
                      disabled
                      v-model="appoinmentData.estimateProfile"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-6 px-4">
              <div class="d-flex flex-column gap-4">
                <div>
                  <label class="form-check-label">
                    Missed Appointment &nbsp;&nbsp;
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="remember"
                      v-model="appoinmentData.missedAppointment"
                    />
                  </label>
                </div>
                <div>
                  <label class="form-check-label">
                    Completed Appointment ? &nbsp;&nbsp;
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="remember"
                      v-model="appoinmentData.completedAppointment"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div
            class="row g-3 mt-5 pt-4"
            :style="{ borderTop: '1px solid #000' }"
          >
            <div class="d-flex align-items-end justify-content-end mb-4 gap-4">
              <router-link
                to="/officex"
                class="btn btn-light text-nowrap"
                :style="{ backgroundColor: '#FF8080' }"
                @click="DeleteAppoinment(appoinmentData._id)"
              >
                Delete Appointment</router-link
              >

              <router-link to="/officex" class="btn btn-light text-nowrap">
                Back</router-link
              >

              <button
                @click="handleAppoinment"
                type="button"
                class="btn btn-light text-nowrap"
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-light text-nowrap"
                @click="handleNext"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.CFirstDiv {
  display: flex;
}
.CTitleD {
  display: flex;
  margin: 0px 5px 0 2px;
  overflow: hidden;
  white-space: nowrap;
  width: 96px;
  text-overflow: ellipsis;
}
div.w-100.h-25:hover {
  background-color: #bef3f2;
}
</style>

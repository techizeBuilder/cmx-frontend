<template>
  <div class="row">
    <div class="col-sm-3">
      <select
        class="form-select mb-2"
        aria-label="small select example"
        v-model="selectedDuration"
      >
        <option value="1">1 Week</option>
        <option value="2">2 Weeks</option>
      </select>
      <VueDatePicker v-model="date" inline model-auto range week-start="0" />

      <div class="card mt-2">
        <div class="card-body">
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
      <label
        class="datelableaAq"
        style="margin-bottom: 10px; margin-top: 25px;"
      >
        <input type="checkbox" v-model="allEvents" />
        <span class="dataNuAx">53</span> Select All
      </label>
      <label
        v-for="(item, index) in eventsValues"
        :key="index"
        class="datelableaAq"
        :style="{ marginBottom: '10px' }"
        :class="item.classnew"
      >
        <input type="checkbox" v-model="eventsValues[index].checked" />
        <span class="dataNuAx">11</span> {{ item.label }}
      </label>
    </div>
    <div class="col-sm-9">
      <div class="col" style="position: relative;">
        <div class="table-responsive">
          <table class="table table-bordered">
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
            <tbody>
              <tr
                v-for="outerIndex in dynEvents.length"
                :key="outerIndex"
                style="max-height: 100px; overflow-y: auto; font-size: small;"
              >
                <td>{{ outerValue(outerIndex) }}</td>
                <template
                  v-for="(item, innerIndex) in arrDate"
                  :key="innerIndex"
                >
                  <template v-if="colCond > innerIndex"></template>
                  <template
                    v-else-if="
                      ifCondition(arrDate[innerIndex], dynEvents[eventNo])
                    "
                  >
                    <td
                      draggable="true"
                      :itemTable="dynEvents[eventNo - 1]?.id"
                      :id="item + '_' + innerIndex"
                      @dragover.prevent
                      @drag.prevent="dragStart(`${item}_${innerIndex}`)"
                      :style="{
                        background: dynEvents[eventNo - 1]?.backgroundColor,
                      }"
                      style="white-space: nowrap;"
                      :colspan="colSapnFun(innerIndex)"
                    >
                      <div style="font-size: xx-small;">
                        {{ dynEvents[eventNo - 1]?.id }}
                        {{ dynEvents[eventNo - 1]?.folder }}
                        {{ dynEvents[eventNo - 1]?.insurance }}
                      </div>
                      <div style="font-size: xx-small;">
                        {{ dynEvents[eventNo - 1]?.name }}
                      </div>
                      <div style="font-size: xx-small;">
                        {{ dynEvents[eventNo - 1]?.date }}
                      </div>
                      <div style="font-size: xx-small;">
                        {{ dynEvents[eventNo - 1]?.body }}
                      </div>
                    </td>
                  </template>
                  <template v-else>
                    <td
                      v-if="
                        ((innerIndex === 7 || innerIndex === 14) &&
                          isSaturdayClosed) ||
                        ((innerIndex === 1 || innerIndex === 8) &&
                          isSundayClosed)
                      "
                      @dragover.prevent
                      @drop.prevent="dragEnd(item)"
                      style="background-color: darkgray;"
                    ></td>
                    <td
                      v-else
                      @dragover.prevent
                      @drop.prevent="dragEnd(item)"
                    ></td>
                  </template>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import vuedraggable from "vuedraggable";
import moment from "moment";

const isSaturdayClosed = ref(false);
const isSundayClosed = ref(false);
const selectedDuration = ref(1);
const todayDate = new Date();
const date = ref([moment(todayDate).day(0), moment(todayDate).day(6)]);
let colCond = 0;
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
const events = ref([
  {
    id: 1,
    folder: "<FolderX#>",
    insurance: "<insurance>",
    name: "<Last, First Name>",
    date: "<YYYY,MAKE,MODEL>",
    body: "B:<Body Tech Name>",
    startDate: "2024-01-31T15:08:00.000Z",
    endDate: "2024-02-04T15:08:00.000Z",
    backgroundColor: "#CFAF00",
    category: "Come Back",
  },
  {
    id: 2,
    folder: "<FolderX#>",
    insurance: "<insurance>",
    name: "<Last, First Name>",
    date: "<YYYY,MAKE,MODEL>",
    body: "B:<Body Tech Name>",
    startDate: "2024-02-02T15:08:00.000Z",
    endDate: "2024-02-04T15:08:00.000Z",
    backgroundColor: "#C0FFB5",
    category: "Arrived",
  },
  {
    id: 3,
    folder: "<FolderX#>",
    insurance: "<insurance>",
    name: "<Last, First Name>",
    date: "<YYYY,MAKE,MODEL>",
    body: "B:<Body Tech Name>",
    startDate: "2024-02-03T15:08:00.000Z",
    endDate: "2024-02-08T15:08:00.000Z",
    backgroundColor: "#FFF975",
    category: "Repair Plan",
  },
  {
    id: 4,
    folder: "<FolderX#>",
    insurance: "<insurance>",
    name: "<Last, First Name>",
    date: "<YYYY,MAKE,MODEL>",
    body: "B:<Body Tech Name>",
    startDate: "2024-02-01T15:08:00.000Z",
    endDate: "2024-02-06T15:08:00.000Z",
    backgroundColor: "#FFC487",
    category: "Supplement Hold",
  },
  {
    id: 5,
    folder: "<FolderX#>",
    insurance: "<insurance>",
    name: "<Last, First Name>",
    date: "<YYYY,MAKE,MODEL>",
    body: "B:<Body Tech Name>",
    startDate: "2024-02-02T15:08:00.000Z",
    endDate: "2024-02-02T15:08:00.000Z",
    backgroundColor: "#FF8200",
    category: "Supplement Approved",
  },
  {
    id: 6,
    folder: "<FolderX#>",
    insurance: "<insurance>",
    name: "<Last, First Name>",
    date: "<YYYY,MAKE,MODEL>",
    body: "B:<Body Tech Name>",
    startDate: "2024-02-05T15:08:00.000Z",
    endDate: "2024-02-05T15:08:00.000Z",
    backgroundColor: "#D30E0E",
    category: "Parts Hold",
  },
  {
    id: 7,
    folder: "<FolderX#>",
    insurance: "<insurance>",
    name: "<Last, First Name>",
    date: "<YYYY,MAKE,MODEL>",
    body: "B:<Body Tech Name>",
    startDate: "2024-02-01T15:08:00.000Z",
    endDate: "2024-02-05T15:08:00.000Z",
    backgroundColor: "#027A2B",
    category: "Parts Delivered",
  },
  {
    id: 8,
    folder: "<FolderX#>",
    insurance: "<insurance>",
    name: "<Last, First Name>",
    date: "<YYYY,MAKE,MODEL>",
    body: "B:<Body Tech Name>",
    startDate: "2024-02-02T15:08:00.000Z",
    endDate: "2024-02-04T15:08:00.000Z",
    backgroundColor: "#787878",
    category: "Body | Frame | Mech",
  },
  {
    id: 9,
    folder: "<FolderX#>",
    insurance: "<insurance>",
    name: "<Last, First Name>",
    date: "<YYYY,MAKE,MODEL>",
    body: "B:<Body Tech Name>",
    startDate: "2024-02-04T15:08:00.000Z",
    endDate: "2024-02-05T15:08:00.000Z",
    backgroundColor: "#4D93FF",
    category: "sublet | offsite",
  },
]);
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
const diffDate = () => {
  const difData = moment(date.value[1]).diff(moment(date.value[0]), "days") + 1;
  arrDate.value = [];
  const start = moment(date.value[0]);
  while (start.isSameOrBefore(date.value[1])) {
    arrDate.value.push(start.format("YYYY-MM-DD"));
    start.add(1, "days");
  }
  return difData;
};
const allEvents = ref(false);
const eventsValues = ref([
  {
    label: "Come Back",
    checked: true,
    classnew: "comeback",
    backgroundColor: "#CFAF00",
  },
  {
    label: "Arrived",
    checked: true,
    classnew: "arrived",
    backgroundColor: "#C0FFB5",
  },
  {
    label: "Repair Plan",
    checked: true,
    classnew: "repairplan",
    backgroundColor: "#FFF975",
  },
  {
    label: "Supplement Hold",
    checked: true,
    classnew: "Supplementhold",
    backgroundColor: "#FFC487",
  },
  {
    label: "Supplement Approved",
    checked: true,
    classnew: "Supplementapproved",
    backgroundColor: "#FF8200",
  },
  {
    label: "Parts Hold",
    checked: true,
    classnew: "PartsHold",
    backgroundColor: "#CECECE",
  },
  {
    label: "Parts Delivered",
    checked: true,
    classnew: "partsdelivered",
    backgroundColor: "#787878",
  },
  {
    label: "Body | Frame | Mech",
    checked: true,
    classnew: "bodyframe",
    backgroundColor: "#C9DEFF",
  },
  {
    label: "sublet | offsite",
    checked: true,
    classnew: "subletax",
    backgroundColor: "#4D93FF",
  },
  {
    label: "Paint",
    checked: true,
    classnew: "Paintax",
    backgroundColor: "#0FF",
  },
  {
    label: "Reassembly",
    checked: true,
    classnew: "Reassemblyax",
    backgroundColor: "#0066FF",
  },
  {
    label: "ADAS",
    checked: true,
    classnew: "ADASax",
    backgroundColor: "#DB551B8F",
  },
  {
    label: "Detail",
    checked: true,
    classnew: "Detailax",
    backgroundColor: "#B947FF",
  },
  {
    label: "Completed",
    checked: true,
    classnew: "Completedax",
    backgroundColor: "#027A2B",
  },
  {
    label: "Total Loss",
    checked: true,
    classnew: "Totalax",
    backgroundColor: "#D30E0E",
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
const dragStart = (index) => {
  const element = document.getElementById(index);
  const id = element.getAttribute("itemTable");
  eventId = id;
  console.log(id);
};

const dragEnd = (date) => {
  console.log(date);
  console.log(eventId);
  eventNo = 0;
  dynEvents.value = dynEvents.value.map((item) => {
    if (item.id == eventId) {
      const dur = moment(item.endDate).diff(moment(item.startDate), "days");
      return {
        ...item,
        startDate: date,
        endDate: moment(date).add(dur, "days").format("YYYY-MM-DD"),
      };
    } else {
      return item;
    }
  });
  console.log("dynamic event:", dynEvents.value);
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
</script>
<style>
.dp__outer_menu_wrap {
  width: 100%;
}
.fc-scroller {
  overflow-y: scroll !important;
}

.datelableaAq {
  display: flex;
  align-items: center;
  gap: 15px;
}

.dataNuAx {
  border-radius: 3.876px;
  border: 0.775px solid #eee;
  background: #eee;
  padding: 1px 7px;
  font-size: 11px;
  font-weight: 500;
}

.datelableaAq input {
  width: 18px;
  height: 18px;
}

.comeback input {
  accent-color: #cfaf00;
}

.arrived input {
  accent-color: #c0ffb5;
}

.repairplan {
  accent-color: #fff975;
}

.Supplementhold {
  accent-color: #ffc487;
}

.Supplementapproved {
  accent-color: #ff8200;
}

.PartsHold {
  accent-color: #cecece;
}

.partsdelivered {
  accent-color: #787878;
}

.bodyframe {
  accent-color: #c9deff;
}

.subletax {
  accent-color: #4d93ff;
}

.Paintax {
  accent-color: #00ffff;
}

.Reassemblyax {
  accent-color: #0066ff;
}

.ADASax {
  accent-color: #db551b8f;
}

.Detailax {
  accent-color: #b947ff;
}

.Completedax {
  accent-color: #027a2b;
}

.Totalax {
  accent-color: #d30e0e;
}
#eventContainer {
  position: relative;
}

.eventPopup {
  position: absolute;
  z-index: 10;
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid #d2d6dc;
  border-radius: 0.375rem;
  top: 0;
  left: 0;
}

.eventHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #d2d6dc;
}

.eventTitle {
  font-size: 1rem;
}

.eventBody {
  background-color: #a4b0be;
  border-radius: 0 0 6px 6px;
  padding: 1rem;
}

#editor {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
  font-size: 0.875rem;
  background-color: #a4b0be;
  border: 1px solid #d2d6dc;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

#addEvent {
  background-color: #1a4a72;
  color: #ffffff;
  font-size: 0.875rem;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

#addEvent:hover {
  background-color: #2b6cb0;
}
</style>

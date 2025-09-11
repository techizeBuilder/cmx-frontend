<script setup>
import EstimateCalendarMain from "./EstimateCalendar/EstimateCalendarMain.vue";
import EstimatelistMain from "./Estimatelist/EstimatelistMain.vue";
import MissedAppointmentMain from "./MissedAppointment/MissedAppointmentMain.vue";
</script>
<template>
  <div class="shoppage-section">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#tabEstimateCalendar"
            >Estimate Calendar</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#tabEstimatelist"
            >Estimate List</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#tabAppointmentMissed"
            >Missed Appointment</a
          >
        </li>
      </ul>
    </div>
    <div class="select-option-first">
      <div class="tab-content">
        <div class="tab-pane show active" id="tabEstimateCalendar">
          <EstimateCalendarMain />
        </div>
        <div class="tab-pane" id="tabEstimatelist">
          <EstimatelistMain />
        </div>
        <div class="tab-pane" id="tabAppointmentMissed">
          <MissedAppointmentMain />
        </div>
      </div>
    </div>
  </div>
</template>

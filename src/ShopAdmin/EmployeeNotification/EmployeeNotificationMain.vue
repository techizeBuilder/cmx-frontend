<script setup>
import EmployeeNotificationActive from "./EmployeeNotificationActive.vue";
</script>

<template>
  <div class="shoppage-section">
    <div class="scrool-delevry">
      <ul class="nav nav-nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link show active"
            data-bs-toggle="tab"
            href="#employnotificationone"
            >Active</a
          >
        </li>
      </ul>
    </div>
    <div class="select-option-first">
      <div class="tab-content">
        <div class="tab-pane show active" id="employnotificationone">
          <EmployeeNotificationActive />
        </div>
      </div>
    </div>
  </div>
</template>

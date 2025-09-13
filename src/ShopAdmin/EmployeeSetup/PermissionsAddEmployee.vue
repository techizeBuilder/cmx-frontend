<script setup></script>
<template>
  <div class="estimatedetailsection premEmpo">
    <div class="EmpFrame">
      <p class="datexlable"><b> Permissions</b></p>

      <div class="mt-0">
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="Office"
            name="sa"
            style="width: 25px; height: 25px;"
          />
          <label class="form-check-label ms-2 mt-1" for="Office">Office</label>
        </div>
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="Estimator"
            name="s"
            style="width: 25px; height: 25px;"
          />
          <label class="form-check-label ms-2 mt-1" for="Estimator"
            >Estimator</label
          >
        </div>
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="Parts"
            name="se"
            style="width: 25px; height: 25px;"
          />
          <label class="form-check-label ms-2 mt-1" for="Parts">Parts</label>
        </div>
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="Technician"
            name="ss"
            style="width: 25px; height: 25px;"
          />
          <label class="form-check-label ms-2 mt-1" for="Technician"
            >Technician</label
          >
        </div>
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="Accounting"
            name="ss"
            style="width: 25px; height: 25px;"
          />
          <label class="form-check-label ms-2 mt-1" for="Accounting"
            >Accounting</label
          >
        </div>
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="Manager"
            name="ss"
            style="width: 25px; height: 25px;"
          />
          <label class="form-check-label ms-2 mt-1" for="Manager"
            >Manager</label
          >
        </div>
      </div>
      <hr class="my-5" />
      <div class="form-check mb-2">
        <input
          class="form-check-input"
          type="checkbox"
          id="ShopsAdmin"
          name="ss"
          style="width: 25px; height: 25px;"
        />
        <label class="form-check-label ms-2 mt-1" for="ShopsAdmin"
          >Shop Admin</label
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.premEmpo {
  min-width: 250px;
}
label {
  font-weight: 500;
}

.EmpFrame {
  background: rgba(210, 212, 215, 0.2);
  padding: 20px 20px;
  min-height: 470px;
}
</style>

<template>
  <AppLayout />
</template>

<script setup>
import AppLayout from './layout/AppLayout.vue';
// import Layout from './layout/Layout.vue';
</script>

<style lang="scss">
@import 'bootstrap';
@import './assets/css/Header.css';
@import './assets/css/Main.css';
@import './assets/css/cmx.css';
@import 'datatables.net-bs5';
@import './assets/css/styleone.css';

.file {
  position: relative;
  overflow: hidden;
}

.file input {
  position: absolute;
  opacity: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.vertical-checkbox {
  .v-input__control {
    width: 150px;

    .v-selection-control {
      width: 100%;
      display: flex !important;
      flex-direction: column-reverse !important;
      align-items: start;
    }
  }
}

.v-switch {
  min-height: 20px !important;

  .v-switch__track {
    height: 20px !important;
    width: 40px !important;
    min-width: 40px !important;
  }

  .v-switch__thumb {
    height: 16px !important;
    width: 16px !important;
  }
}
.custom-switch {
  min-height: 20px !important;
  
  .v-switch__track {
    height: 20px !important;
    width: 40px !important;
    min-width: 40px !important;
  }
  
  .v-switch__thumb {
    height: 21px !important;
    width: 21px !important;
  }
  
  .v-selection-control--dirty {
    .v-switch__thumb {
      height: 16px !important;
      width: 16px !important;
    }
  }
}

.custom-key-value-details {
  .key-value {
    margin-left: 20px;
    display: flex;
    justify-content: start;
    gap: 40px;

    .key,
    .value {
      display: flex;
      justify-content: end;
      width: 180px;
    }
    .value {
      width: 50%;
      justify-content: start;
    }

    @media (max-width: 1200px) {
      margin-left: 0;
      gap: 0;
      flex-direction: column;

      .key {
        width: 100%;
        justify-content: start;
        margin-bottom: 2px;
      }
      .value {
        width: 100%;
        padding-left: 0 !important;
      }
    }
  }
}
</style>

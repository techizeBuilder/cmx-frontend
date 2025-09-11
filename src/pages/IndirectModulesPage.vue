<template>
  <v-row class="indirect-modules">
    <page-header
      title="Indirect Modules"
      to="/"
    />
    <v-col
      v-for="(item, index) in modules"
      :key="index"
      cols="12"
      class="pb-1"
    >
      <custom-btn
        id="chat-link"
        :to="item.to"
        color="#F0F1F3"
      >
        {{ item.title }}
      </custom-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import CustomBtn from '@/shared/components/CustomBtn.vue';
import PageHeader from '@/components/PageHeader.vue';
import { ref } from 'vue';

const modules = ref([
  {
    title: 'Chat Link',
    to: '/chatkinkx',
  },
  {
    title: 'Estimate Profile Module',
    to: '/estimatexprofile',
  },
  {
    title: 'RO Module',
    to: '/floderxmain',
  },
  {
    title: 'Customer Chatlink Module',
    to: '/chatlink/3bd54d19-214e-476d-a1ee-a4080cdac596',
  },
  {
    title: 'Import Estimate Module',
    to: '/estimatex',
  },
  {
    title: 'Shop VendorX',
    to: '/vendorx',
  },
  {
    title: 'Vendor VendorX',
    to: '/venderxadmin',
  },
  {
    title: 'VendorX Admin',
    to: '/vendorxpartsadmin',
  },
  {
    title: 'VendorX Admin Add Staff',
    to: '/venderspartssdminsddstaff',
  },
  {
    title: 'Customer Profile',
    to: '/newcustomer',
  },
]);
</script>

<style lang="scss">
.indirect-modules {
  .v-btn {
    --v-btn-height: 33px;
  }
}
</style>

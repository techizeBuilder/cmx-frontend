<script setup></script>

<template>
  <div class="px-3">
    <div class="mainhead pb-2 mt-3">
      <div class="d-flex align-items-center gap-3 justify-content-between">
        <router-link to="/">Indirect Modules</router-link>
      </div>
    </div>
    <div class="mt-5 d-flex flex-column gap-3 indirect">
      <router-link class="btn btn-light mb-0" to="/chatkinkx"
        >Chat Link</router-link
      >
      <router-link class="btn btn-light mb-0" to="/estimatexprofile"
        >Estimate Profile Module</router-link
      >
      <router-link class="btn btn-light mb-0" to="/floderxmain"
        >RO Module</router-link
      >
      <router-link
        class="btn btn-light mb-0"
        to="/chatlink/3bd54d19-214e-476d-a1ee-a4080cdac596"
        >Customer Chatlink Module</router-link
      >
      <router-link class="btn btn-light mb-0" to="/estimatex"
        >Import Estimate Module</router-link
      >
      <router-link class="btn btn-light mb-0" to="/vendorx"
        >Shop VendorX</router-link
      >
      <router-link class="btn btn-light mb-0" to="/venderxadmin"
        >Vendor VendorX</router-link
      >
      <router-link class="btn btn-light mb-0" to="/vendorxpartsadmin"
        >VendorX Admin</router-link
      >
      <router-link class="btn btn-light mb-0" to="/venderspartssdminsddstaff"
        >VendorX Admin Add Staff</router-link
      >

      <router-link class="btn btn-light mb-0" to="/newcustomer"
        >Customer Profile</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.indirect .btn.btn-light {
  max-width: fit-content;
}
</style>

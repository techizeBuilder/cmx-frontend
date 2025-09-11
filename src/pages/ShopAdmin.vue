<template>
  <v-row
    v-if="!showCreateUpdateStaffModule"
    :class="{
      'px-3': vuetifyDisplay.smAndUp.value,
      'mx-1': $vuetify.display.xs,
    }"
  >
    <page-header
      title="Shop Profile"
      :subtitles="[{ title: shopDetails.shopName, to: route.path }]"
      class="mt-1"
      :class="{
        'ml-2': $vuetify.display.xs,
      }"
      :subtitle-props="{
        to: route.path,
      }"
      mb="0"
      hide-divider
    />

    <v-col
      cols="12"
      class="pt-0"
      :class="{
        'px-3 pb-5': vuetifyDisplay.smAndUp.value,
      }"
    >
      <custom-key-value-pair
        flat
        class="my-elevation px-5 py-3 custom-key-value-details"
        :config="[
          { title: 'Shop Name:', value: shopDetails.name ?? '' },
          {
            title: 'Phone Number:',
            value: formatPhoneNumber(shopDetails.contact.phone),
          },
          { title: 'Address:', value: shopDetails.address.street ?? '' },
          {
            title: 'City, State, Zip:',
            value: `${shopDetails.address.city ?? ''}, ${shopDetails.address.state ?? ''
              }, ${shopDetails.address.zipCode ?? ''}`,
          },
        ]"
      />
    </v-col>

    <v-col
      cols="12"
      :class="{
        'px-1': vuetifyDisplay.xs.value,
      }"
    >
      <custom-expansion-panel
        v-model="activePanels"
        :panels="panels"
      >
      </custom-expansion-panel>
    </v-col>
  </v-row>

  <create-update-staff
    v-else
    :user-id="route.params.userId"
  />
  <!-- The Modal -->
  <div
    class="modal fade login-popup-dashtwo"
    id="exampleModaladd"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100"
                  >
                    <p class="shopnow">Add New Shop</p>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="space-btm-space">
                <div
                  class="row"
                  style="align-items: center"
                >
                  <div class="col-lg-6">
                    <div class="col-same">
                      <div class="box">
                        <form>
                          <div class="input-container text-center mb-3">
                            <input
                              type="text"
                              class="form-control text-center"
                              id="shopID"
                              placeholder="  Shop ID"
                              disabled=""
                            />
                          </div>
                          <div class="input-container mb-3">
                            <select
                              id="shopName"
                              class="form-control text-center"
                              required=""
                            >
                              <option value="">Shop Name</option>
                              <option value="shop1">Shop 1</option>
                              <option value="shop2">Shop 2</option>
                              <option value="shop3">Shop 3</option>
                              <!-- Add more options as needed -->
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="col-same">
                      <div class="box">
                        <form>
                          <h4 class="headingrefer mb-3">
                            Add a New Shop
                          </h4>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="text"
                              id="Contactname"
                              name="Contactname"
                              placeholder="Contact Name"
                              required=""
                            />
                          </div>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              placeholder="Phone Number"
                              required=""
                            />
                          </div>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Email Address"
                              required=""
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="btn-btn d-flex justify-content-center gap-5">
                      <button
                        class="Cancel"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        class="submit"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade login-popup-dashtwo"
    id="exampleModalrefer"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <div class="section referpagesection">
            <div class="header-Refershop">
              <div class="header-nom">
                <div class="silde">
                  <div
                    class="sliderone d-flex align-items-center justify-content-between w-100"
                  >
                    <p class="shopnow">Refer a Shop</p>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="space-btm-space">
                <div
                  class="row"
                  style="align-items: center"
                >
                  <div class="col-lg-6">
                    <div class="col-same">
                      <div class="box">
                        <form>
                          <div class="input-container text-center mb-3">
                            <input
                              type="text"
                              class="form-control text-center"
                              id="shopID"
                              placeholder="  Shop ID"
                              disabled=""
                            />
                          </div>
                          <div class="input-container mb-3">
                            <select
                              id="shopName"
                              class="form-control text-center"
                              required=""
                            >
                              <option value="">Shop Name</option>
                              <option value="shop1">Shop 1</option>
                              <option value="shop2">Shop 2</option>
                              <option value="shop3">Shop 3</option>
                              <!-- Add more options as needed -->
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="col-same">
                      <div class="box">
                        <form>
                          <h4 class="headingrefer mb-3">
                            Refer a Shop
                          </h4>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="text"
                              id="NameofShop"
                              name="NameofShop"
                              placeholder="Name of Shop"
                              required=""
                            />
                          </div>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              placeholder="Phone Number"
                              required=""
                            />
                          </div>
                          <div class="input-container mb-4">
                            <input
                              class="form-control"
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Email Address"
                              required=""
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="btn-btn d-flex justify-content-center gap-5">
                      <button
                        class="Cancel"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        class="submit"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, shallowRef } from 'vue';
import ShopProfile from '@/components/ShopAdmin/ShopProfile.vue';
import PageHeader from '@/components/PageHeader.vue';
import CustomKeyValuePair from '@/shared/components/CustomKeyValuePair.vue';
import CustomExpansionPanel from '@/shared/components/CustomExpansionPanel.vue';
import StaffSetup from '@/components/ShopAdmin/StaffSetup.vue';
import CreateUpdateStaff from '@/components/ShopAdmin/CreateUpdateStaff.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import StaffPermissions from '@/components/StaffPermissions.vue';
import StaffNotifications from '@/components/ShopAdmin/StaffNotifications.vue';
import APIGateway from '@/components/ShopAdmin/APIGateway.vue';
import ROCustomSettings from '@/components/ShopAdmin/ROCustomSettings.vue';
import { useStore } from 'vuex';
import { useDisplay } from 'vuetify';
import { formatPhoneNumber } from '@/composables';

const vuetifyDisplay = useDisplay();
const store = useStore();
const route = useRoute();
const activePanels = ref([]);
const panels = ref([
  {
    title: 'Shop Profile',
    icon: 'storeProfile.png',
    component: shallowRef(ShopProfile),
  },
  {
    title: 'Staff Setup',
    icon: 'staffSetup.png',
    component: shallowRef(StaffSetup),
  },
  {
    title: 'Staff Permissions',
    icon: 'staffPermissions.png',
    iconProps: {
      maxWidth: 24,
      width: 24,
    },
    component: shallowRef(StaffPermissions),
  },
  {
    title: 'Staff Notifications',
    icon: 'staffNotification.png',
    minHeight:'700px',
    component: shallowRef(StaffNotifications),
  },    
  {
    title: 'API Gateway',
    icon: 'APIGateway.png',
    minHeight:'650px',
    component: shallowRef(APIGateway),
  },
  {
    title: 'RO Custom Settings',
    icon: 'ROCustomSettings.png',
    component: shallowRef(ROCustomSettings),
  },
]);

const showCreateUpdateStaffModule = computed(() => {
  return !!route.fullPath.includes('staff');
});
const shopDetails = computed(() => {
  return store.getters.getShopDetails;
});

onMounted(() => {
  store.dispatch('fetchShopDetails');
});
</script>

<style lang="scss"></style>

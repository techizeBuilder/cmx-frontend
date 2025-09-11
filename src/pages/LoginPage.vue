<template>
  <v-row
    justify="center"
    class="align-center h-100"
  >
    <v-col
      cols="12"
      md="4"
      style="max-width: 480px"
    >
      <custom-card
        class="border-md border-black"
        card-text-style="pa-0"
        :cardTitleStyle="{
          'px-6': false,
        }"
        :title-props="{
          class: 'bg-black pa-1',
          style: {
            borderRadius: '5px 5px 0px 0px',
          },
        }"
        hide-header-bg
      >
        <template #title>
          <v-img
            :src="getImageUrl('cmxLogo01.png')"
            alt="CMX Logo"
            height="20"
            width="160"
            style="border-radius: 5px 5px 0px 0px"
          />
        </template>
        <v-form
          ref="loginForm"
          v-model="isFormValid"
        >
          <v-row
            :class="{
              'px-11 pt-6 pb-8': vuetifyDisplay.smAndUp.value,
              'px-8 pt-6 pb-8': vuetifyDisplay.xs.value,
            }"
          >
            <v-col cols="12">
              <h5 class="font-weight-bold">Shop Login</h5>
            </v-col>
            <v-col
              v-if="errorMessage"
              cols="12"
              class="py-0"
            >
              <span class="text-red">
                {{ errorMessage ?? 'Incorrect Information Entered!' }}
              </span>
            </v-col>

            <v-col
              cols="12"
              class="pb-1"
            >
              <custom-field
                v-model="loginDetails.shopId"
                id="shop-number"
                label="Shop / Vendor"
                type="password"
                required
                :show-prepend-icon="false"
                hide-details="auto"
              />
            </v-col>
            <v-col
              cols="12"
              class="pb-1"
            >
              <custom-field
                v-model="loginDetails.username"
                id="username"
                label="Username"
                hide-details="auto"
                required
              />
            </v-col>
            <v-col
              cols="12"
              class="pb-1"
            >
              <custom-field
                v-model="loginDetails.password"
                id="password"
                label="Password"
                type="password"
                required
                hide-details="auto"
              />
            </v-col>

            <v-col cols="8">
              <v-checkbox
                v-model="loginDetails.rememberMe"
                label="Remember Me"
                color="blue"
                density="compact"
                hide-details="auto"
                class="login-checkbox"
              />
            </v-col>
            <v-col
              cols="4"
              class="d-flex align-center justify-end"
            >
              <custom-btn
                id="login-btn"
                color="blue"
                variant="flat"
                rounded="md"
                :loading="isLoading"
                @click="onSubmit"
              >
                Login
              </custom-btn>
            </v-col>

            <v-col
              cols="12"
              class="d-flex pb-0"
              :class="{
                'flex-column text-center': vuetifyDisplay.xs.value,
              }"
            >
              <h6>Don’t have an Account?</h6>
              <router-link
                to="#"
                class="ml-4 text-decoration-underline font-weight-medium"
              >
                Learn More
              </router-link>
            </v-col>
            <v-col
              cols="12"
              class="d-flex align-center ga-2 pb-0"
            >
              <v-divider class="border-opacity-25" />
              <span
                class="text-grey-darken-1"
                style="font-size: 12px"
              >
                OR
              </span>
              <v-divider class="border-opacity-25" />
            </v-col>
            <v-col
              cols="12"
              class="text-center"
            >
              <router-link
                to="/loginassistance"
                class="text-grey-darken-4"
              >
                Need Help Signing in?
              </router-link>
            </v-col>
          </v-row>
        </v-form>
      </custom-card>
    </v-col>
  </v-row>
</template>

<script setup>
import CustomCard from '@/shared/components/CustomCard.vue';
import CustomField from '@/shared/components/CustomField.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import { getImageUrl } from '@/composables';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { handleError } from '@/handleError';
import { showSuccessToast } from '@/toster';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';

const vuetifyDisplay = useDisplay();
const store = useStore();
const router = useRouter();

const isFormValid = ref(true);
const loginForm = ref(null);
const errorMessage = ref(null);
const isLoading = ref(false);
const loginDetails = ref({
  shopId: '',
  username: '',
  password: '',
  rememberMe: false,
});

const setDataOnLocalStorage = (response) => {
  console.log('response in setDataOnLocalStorage', response.token);
  localStorage.setItem('AuthToken', response.token);
  localStorage.setItem('shopId', response.data.shopId._id);
  localStorage.setItem(
    'shopData',
    JSON.stringify(response.data.shopId)
  );
  localStorage.setItem('shopIdStr', loginDetails.value.shopId);
  localStorage.setItem('userId', response.data._id);
  localStorage.setItem('userData', JSON.stringify(response.data));
};
const onSubmit = async () => {
  isLoading.value = true;

  if (loginDetails.value.rememberMe) {
    localStorage.setItem(
      'login_details',
      JSON.stringify(loginDetails.value)
    );
  } else {
    localStorage.removeItem('login_details');
  }
  console.log(loginDetails.value);
  const response = await store.dispatch('login', loginDetails.value);

  if (!response.success) {
    isLoading.value = false;
    return handleError(response);
  }

  store.dispatch('setShopId', response.data.shopId._id);
  setDataOnLocalStorage(response);
  showSuccessToast(response.msg);
  console.log('login response', response);
  router.push({ path: '/' });

  isLoading.value = false;
};

onMounted(() => {
  loginDetails.value = JSON.parse(
    localStorage.getItem('login_details') ?? '{}'
  );
});
</script>

<style lang="scss">
.login-checkbox {
  .v-label {
    font-size: 14px;
  }
}
</style>

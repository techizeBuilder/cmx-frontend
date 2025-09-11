<template>
  <v-app class="rounded rounded-md">
    <v-app-bar
      v-if="$route.meta.header === 1"
      flat
      color="black"
      density="comfortable"
      class="px-4"
    >
      <div
        class="d-flex align-center"
        :class="{
          'ga-12': $vuetify.display.smAndUp,
          'ga-4': $vuetify.display.xs,
        }"
      >
        <v-icon
          size="32"
          :class="{
            'invert-icon': $vuetify.display.smAndDown
              ? toggleDrawer
              : toggleDrawerRail,
          }"
          @click="toggleMenu"
        >
          mdi-format-indent-increase
        </v-icon>
        <v-img
          :src="getImageUrl('CollisionMateX.png')"
          alt="logo"
          class="app-bar-logo"
          :style="{
            'min-width': $vuetify.display.xs ? '170px' : '270px',
            'max-width': $vuetify.display.xs ? '170px' : '270px',
          }"
        />
        <custom-field
          v-if="$vuetify.display.mdAndUp"
          id="searchShop"
          bg-color="white"
          append-inner-icon="mdi-magnify"
          clearable
          hide-details
          density="compact"
          placeholder="VIN, RO, Last Name, Cell, Cust ID"
          class="searchWrapper"
        />
      </div>

      <template #append>
        <div
          class="d-flex align-center"
          :class="{
            'ga-4': $vuetify.display.smAndUp,
            'ga-2': $vuetify.display.xs,
          }"
        >
          <v-icon
            color="orange"
            size="25"
          >
            mdi-bell
          </v-icon>
          <template v-if="$vuetify.display.mdAndUp">
            <p class="mb-0">
              {{
                shopData
                  ? shopData.shopName
                  : 'Collision & Glass Shop'
              }}
            </p>
            <span>|</span>
            <p class="mb-0">
              {{ shopId ? shopId.toUpperCase() : 'XXXXX' }}
            </p>
          </template>

          <v-menu offset="5">
            <template #activator="{ props }">
              <custom-btn
                id="profileMenuBtn"
                color="white"
                base-color="white"
                rounded="pill"
                variant="flat"
                :class="{
                  'px-7': $vuetify.display.smAndUp,
                }"
                density="comfortable"
                append-icon="mdi-chevron-down"
                v-bind="props"
              >
                {{ userData?.firstName }}
              </custom-btn>
            </template>

            <v-card
              elevation="3"
              class="rounded-md"
            >
              <v-list
                density="comfortable"
                class="text-grey-darken-2 menuListParent"
              >
                <v-list-item>
                  <h5 class="text-center text-accent px-4 mb-0">
                    User {{ userData?.firstName }}
                  </h5>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  v-for="(link, i) in userProfileMenuLinks"
                  :key="i"
                  :to="link.to"
                  variant="plain"
                  :base-color="
                    $route.path.includes(link.to) ? 'black' : ''
                  "
                  @click="link.click"
                >
                  <div class="d-flex ga-2">
                    <v-img
                      v-if="link.img"
                      :src="getImageUrl(link.img)"
                      max-width="20"
                      max-height="20"
                    />
                    <v-icon
                      v-else-if="link.icon"
                      :icon="link.icon"
                    />
                    {{ link.title }}
                  </div>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-if="$route.meta.header === 1"
      v-model="toggleDrawer"
      :width="$vuetify.display.mdAndUp ? 100 : 350"
      class="navigation-drawer"
      :class="{ 'closed-drawer': !toggleDrawerRail }"
      :rail="!toggleDrawerRail"
      :permanent="$vuetify.display.mdAndUp"
    >
      <v-list
        nav
        class="pa-0"
      >
        <v-list-item
          v-for="(link, index) in sideBarLinks"
          :key="`${link.title}${index}`"
          :id="index"
          :to="link.to"
          class="sidebar-link px-0 py-3 mb-0"
          :class="{
            active: activeSidebarIndex === index,
          }"
        >
          <div
            class="d-flex align-center text-center font-12"
            :class="{
              'flex-column justify-center': $vuetify.display.mdAndUp,
              'mx-6 ga-6': $vuetify.display.smAndDown,
            }"
            style="font-weight: 700"
          >
            <v-img
              :src="getImageUrl(link.img)"
              max-width="30px"
              width="30px"
              max-height="30px"
              class="mb-2"
            />
            <p
              v-if="toggleDrawerRail"
              class="mb-0"
            >
              {{ link.title }}
            </p>
          </div>
        </v-list-item>

        <v-list-item
          class="d-flex justify-center align-center sidebar-link py-3"
          @click="toggleMenu"
        >
          <v-icon size="32">
            {{
              toggleDrawerRail
                ? 'mdi-chevron-double-left'
                : 'mdi-chevron-double-right'
            }}
          </v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex justify-center"
      style="min-height: 300px; background-color: #f9fbfd !important"
    >
      <v-container
        fluid
        class="mx-2"
        :class="{
          'px-2': vuetifyDisplay.xs.value,
        }"
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { showErrorToast } from '../toster';
import CustomField from '@/shared/components/CustomField.vue';
import CustomBtn from '@/shared/components/CustomBtn.vue';
import { useDisplay } from 'vuetify';
import { getImageUrl } from '@/composables';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const vuetifyDisplay = useDisplay();
const shopId = localStorage.getItem('shopIdStr');
// const activeSidebarIndex = ref(0);
const toggleDrawer = ref(false);
const toggleDrawerRail = ref(false);
let sideBarLinks = ref([
  {
    title: 'CMX Dashboard',
    to: '/',
    img: 'icons/dashboard.svg',
  },
  {
    title: 'OfficeX',
    to: '/officex',
    img: 'icons/officeX.svg',
  },
  {
    title: 'EstimateX',
    to: '/estimatex',
    img: 'icons/EstimateX.svg',
  },
  {
    title: 'ProductionX',
    to: '/production-x',
    img: 'icons/productionX.svg',
  },
  {
    title: 'PartsX',
    to: '/parts-x',
    img: 'icons/PartsX.svg',
  },
  {
    title: 'TachX',
    to: '/tachx',
    img: 'icons/TechX.svg',
  },
  {
    title: 'Chat Link',
    to: '/chat-link-x',
    img: 'icons/ChatIcon.svg',
  },
  // { title: 'Shop Admin', // to: 'ShopAdmin', img: ShopAdmin },
  {
    title: 'Indirect Modules',
    to: '/indirect-modules',
    img: 'icons/links.jpg',
  },
]);

const activeSidebarIndex = computed(() => {
  return sideBarLinks.value.findIndex(
    (link) => router.currentRoute.value.fullPath === link.to
  );
});
const userProfileMenuLinks = computed(() => [
  {
    title: 'User Profile',
    to: '/userprofile',
    icon: 'mdi-account-outline',
  },
  {
    title: 'Tech Support',
    to: '/techsupport',
    icon: 'mdi-face-agent',
  },
  {
    title: 'Shop Profile',
    to: '/Shop_Profile',
    img: 'icons/shop.svg',
  },
  {
    title: 'Log Out',
    to: '#',
    icon: 'mdi-logout',
    click: logOut,
  },
]);
const shopData = computed(() =>
  JSON.parse(localStorage.getItem('shopData'))
);
const userData = computed(() =>
  JSON.parse(localStorage.getItem('userData'))
);

const toggleMenu = () => {
  if (vuetifyDisplay.smAndDown.value) {
    toggleDrawer.value = !toggleDrawer.value;
    toggleDrawerRail.value = true;
    return;
  }
  toggleDrawer.value = true;
  toggleDrawerRail.value = !toggleDrawerRail.value;
  localStorage.setItem('is_expanded', toggleDrawerRail.value);
};
const logOut = () => {
  showErrorToast('Log Out !!!');
  let rememberMe = false;
  let shopId = '';
  let Username = '';
  let password = '';
  if (localStorage.getItem('is_remember')) {
    rememberMe = true;
    shopId = localStorage.getItem('remember_shopId');
    Username = localStorage.getItem('remember_username');
    password = localStorage.getItem('remember_password');
  }
  localStorage.clear();
  if (rememberMe) {
    localStorage.setItem('is_remember', rememberMe);
    localStorage.setItem('remember_shopId', shopId);
    localStorage.setItem('remember_username', Username);
    localStorage.setItem('remember_password', password);
  }

  router.push({ path: '/login' });
};
const configureAppDetails = () => {
  const shopId = localStorage.getItem('shopId');
  store.dispatch('setShopId', shopId);
};

onMounted(() => {
  configureAppDetails();
  if (vuetifyDisplay.smAndDown.value) {
    toggleDrawerRail.value = true;
    toggleDrawer.value = false;
  } else {
    toggleDrawer.value = true;
    toggleDrawerRail.value = JSON.parse(
      localStorage.getItem('is_expanded') || 'false'
    );
  }
});
</script>

<style lang="scss">
.app-bar-logo {
  @media (max-width: 400px) {
    min-width: 150px !important;
    max-width: 150px !important;
  }
}

.searchWrapper {
  .v-field {
    width: 200px;
    height: 36px;
    margin-bottom: 4px;
  }
}

.invert-icon {
  transform: rotate(180deg);
}

.menuListParent {
  .v-list-item__content:hover {
    color: rgba(var(--v-theme-accent));
  }
}

.navigation-drawer {
  .v-navigation-drawer__content {
    padding-bottom: 30px;
    background-color: #0066ff1c;
  }

  .v-navigation-drawer__content::-webkit-scrollbar {
    width: 3px !important;
  }

  .sidebar-link {
    cursor: pointer;
    border-block: 1px solid #cccccc;

    .v-list-item__overlay {
      opacity: 0 !important;
    }
  }
  .sidebar-link:hover {
    background-color: aliceblue !important;
  }
  .sidebar-link.active {
    background-color: white;
  }
}

.closed-drawer {
  .v-list-item {
    padding-block: 18px !important;

    .v-img {
      margin-bottom: 0 !important;
    }
  }
}
</style>

<template>
  <div class="dashborard-main shopadmindashboard">
    <div
      class="section-main"
      v-if="$route.meta.header === 1"
    >
      <div class="main-header-dashboard">
        <div class="container-section">
          <div
            class="row"
            style="align-items: center"
          >
            <div class="col-lg-6 col-md-5 col-sm-5 col-7">
              <div
                class="d-inline-flex justify-content-start align-items-center gap-sm-5 gap-3 w-full"
              >
                <div
                  class="menu-toggle"
                  :class="`${is_expanded ? 'menuin' : 'menuout'}`"
                  @click="ToggleMenu"
                >
                  <i
                    class="fa-solid fa-indent"
                    style="color: #fff; font-size: 25px"
                  ></i>
                  <!-- <img src="../assets/menuarrow.png" alt="logo" style="width: 30px;"> -->
                  <!-- <i class="fa-solid fa-angles-right" style="color:#fff; font-size: 25px;"></i> -->
                </div>
                <div class="set w-full">
                  <img
                    src="../assets/CollisionMateX.png"
                    alt="logo"
                    class="logoMain"
                  />
                  <div class="input-container">
                    <div class="input-group flex-nowrap">
                      <input
                        class="form-control border"
                        type="search"
                        id="example-search-input"
                        placeholder="VIN, RO, Last Name, Cell, Cust ID"
                      />
                      <span class="input-group-append">
                        <button
                          class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                          type="button"
                        >
                          <i class="fa fa-search"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-7 col-sm-7 col-5">
              <div class="settwo">
                <i class="fa-solid fa-bell"></i>
                <p class="d-noneone">
                  {{
                    shopData
                      ? shopData.shopName
                      : 'Collision & Glass Shop'
                  }}
                </p>
                <p class="d-noneone">
                  |
                  {{ shopId ? shopId.toUpperCase() : 'XXXXX' }}
                </p>
                <div class="dropdown">
                  <a
                    class="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {{ userData?.firstName }}
                  </a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                    :style="{ minWidth: '200px' }"
                  >
                    <div class="profile-set">
                      <div class="profilename">
                        <p>User {{ userData?.firstName }}</p>
                      </div>
                    </div>
                    <div class="d-flex flex-column">
                      <router-link to="userprofile">
                        <img
                          :src="User"
                          alt="User"
                        />&nbsp; User Profile</router-link
                      >
                      <router-link to="techsupport"
                        ><img
                          :src="support"
                          alt="support"
                        />&nbsp; Tech Support</router-link
                      >
                      <router-link to="/ShopAdmin">
                        <img
                          :src="Shopicon"
                          alt="Shopicon"
                        />&nbsp; Shop Admin</router-link
                      >
                      <a
                        href="#"
                        @click="logOut"
                        ><img
                          :src="logout"
                          alt="logout"
                        />&nbsp; Log Out</a
                      >
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
      class="container-fluid siderbar-section-subhead px-0"
      v-if="$route.meta.header === 1"
    >
      <div
        class="side-navbar d-flex justify-content-between flex-wrap flex-column active-nav"
        :class="`${is_expanded ? 'is-expanded' : 'out-expanded'}`"
        v-if="$route.meta.header === 1"
      >
        <div class="static">
          <div class="siderbar-menu-main">
            <div
              class="d-md-block d-none"
              v-for="link in Links"
              v-bind:key="link"
            >
              <router-link :to="{ path: link.link }">
                <div class="box">
                  <img :src="link.img" />
                  <p>{{ link.name }}</p>
                </div>
              </router-link>
            </div>

            <div class="mobileMenus">
              <div
                class="d-md-none d-block"
                v-for="link in Links"
                v-bind:key="link"
              >
                <router-link
                  :to="{ path: link.link }"
                  @click="ToggleMenu"
                >
                  <div class="box">
                    <img :src="link.img" />
                    <p>{{ link.name }}</p>
                  </div>
                </router-link>
              </div>
            </div>
            <div
              class="box"
              :class="`${is_expanded ? 'anglesin' : 'anglesout'}`"
              @click="ToggleMenu"
            >
              <i class="fa-solid fa-angles-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div
        :class="[
          is_expanded ? 'is-activeAllpage' : 'in-activeAllpage',
          $route.meta.header == 1 ? 'right-sliderbarallpage' : '',
        ]"
      >
        <router-view />
      </div>
    </div>
  </div>

  <div
    class="dashborard-main shopadmindashboard"
    v-if="$route.meta.header === 0"
  >
    <div class="container-fluid siderbar-section-subhead px-0">
      <router-view />
    </div>
  </div>

  <div
    v-if="$route.meta.header === 2"
    :style="{ background: '#343434', height: '100vh' }"
  >
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { showErrorToast } from '../toster';
const is_expanded = ref(true);

const router = useRouter();
const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem('is_expanded', is_expanded.value);
};
import officrxDashboard from '../assets/officrxDashboard.svg';
import OfficeX from '../assets/OfficeX.svg';

import EstimateX from '../assets/EstimateX.svg';
import producitonX from '../assets/producitonX.svg';
import PartsX from '../assets/PartsX.svg';
import TechX from '../assets/TechX.svg';
import chatIcon from '../assets/ChatIcon.svg';
import ShopAdmin from '../assets/ShopAdmin.svg';
import Incedible from '../assets/incedible.jpg';
import User from '../assets/UserIcons/User.svg';
import support from '../assets/UserIcons/support.svg';
import Shopicon from '../assets/UserIcons/ShopAdmin.svg';
import logout from '../assets/UserIcons/logout.svg';

import Header from '../SuperAdmin/components/Header.vue';

let Links = [
  { name: 'CMX Dashboard', link: '/', img: officrxDashboard },
  { name: 'OfficeX', link: '/officex', img: OfficeX },
  { name: 'EstimateX', link: '/', img: EstimateX },
  { name: 'ProductionX', link: '/producitonx', img: producitonX },
  { name: 'PartsX', link: '/partsx', img: PartsX },
  { name: 'TachX', link: '/tachx', img: TechX },
  { name: 'Chatlink', link: '/chatkinkx', img: chatIcon },
  // { name: 'Shop Admin', link: 'ShopAdmin', img: ShopAdmin },
  {
    name: 'Indirect Modules',
    link: '/indirectmodules',
    img: Incedible,
  },
];

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

const shopId = localStorage.getItem('shopIdStr');
const shopData = computed(() =>
  JSON.parse(localStorage.getItem('shopData'))
);
const userData = computed(() =>
  JSON.parse(localStorage.getItem('userData'))
);
</script>

<style scoped>
.dashborard-main
  .main-header-dashboard
  .set
  .input-container
  .input-group
  .form-control {
  border-radius: 4px !important;
}

.logoMain {
  width: 270px;
}

@media screen and (max-width: 767px) {
  .logoMain {
    width: 170px;
  }
}
</style>

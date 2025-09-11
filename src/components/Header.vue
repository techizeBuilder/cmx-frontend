<script setup>
import { ref } from "vue";

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
};
const shopId = localStorage.getItem("shopIdStr");
const shopData = computed(() => JSON.parse(localStorage.getItem("shopData")));
</script>

<template>
  <div class="section-main">
    <div class="main-header-dashboard">
      <div class="container-section">
        <div class="row" style="align-items: center;">
          <div class="col-lg-6 col-md-4 col-6">
            <div
              class="d-inline-flex justify-content-start align-items-center gap-2"
            >
              <div class="menu-toggle" @click="ToggleMenu">
                <!-- <i class="fa-solid fa-angles-right" style="color:#fff; font-size: 25px;"></i> -->
                <!-- <img src="../assets/menuarrow.png" alt="logo"> -->
                <span class="material-symbols-outlined">
                  menu_open
                </span>
              </div>
              <div class="set">
                <img src="../assets/logo.svg" alt="logo" />
                <div class="input-container">
                  <input type="search" placeholder="search" />
                  <i class="fa-solid fa-magnifying-glass icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-8 col-6">
            <div class="settwo">
              <i class="fa-solid fa-bell"></i>
              <p class="d-noneone">
                {{ shopData ? shopData?.shopName : "Collision & Glass Shop" }}
              </p>
              <p class="d-noneone">
                | Shop ID:
                {{ shopId ? shopId.toUpperCase() : "XXXXX" }}
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
                  Profile Name
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <div class="profile-set">
                    <div class="image">
                      <img src="../assets/avtar.png" alt="" />
                    </div>
                    <div class="profilename">
                      <p>Govind Sharma</p>
                    </div>
                  </div>
                  <a href="#"
                    ><button class="dropdown-item-logout">Logout</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

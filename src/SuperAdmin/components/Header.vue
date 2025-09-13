<script setup>
import '../assets/css/main.css'
import Logo from '../assets/images/logo.png'
import Bell from '../assets/images/Bell.png'
import User from "../assets/images/UserIcons/User.svg"
import support from "../assets/images/UserIcons/support.svg"
import Shopicon from "../assets/images/UserIcons/ShopAdmin.svg"
import logout from "../assets/images/UserIcons/logout.svg"
</script>

<template>

  <div class="superdashboard">
    <div class="section-main">
      <div class="main-header-dashboard">
        <div class="container-section">
          <div class="row" style="align-items: center;">
            <div class="col-lg-6 col-md-5 col-sm-5 col-7">
              <div class="d-inline-flex justify-content-start align-items-center gap-sm-5 gap-3 w-full">

                <div class="d-flex align-items-center w-full">
                  <img :src="Logo" alt="logo" class="logoMain" />
                  <div class="mainSearch w-full">
                    <div class="input-container">
                      <div class="input-group flex-nowrap">
                        <input class="form-control border" type="search" id="example-search-input"
                          placeholder="Search" />
                        <span class="input-group-append">
                          <button class="btn btn-outline-secondary bg-black border-start-0 border-bottom-0 border"
                            type="button">
                            <i class="fa fa-search"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-7 col-sm-7 col-5">
              <div class="d-flex align-items-center justify-content-end w-full gap-5">
                <img :src='Bell' alt="Bell" :style="{ width: '26px', height: '34px' }" />

                <div class="dropdown">
                  <a class="btn btn-dark dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Profile Name
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" :style="{ minWidth: '200px' }">
                    <div class="profile-set">
                      <div class="profilename text-center">
                        <p>User First Name</p>
                      </div>
                    </div>
                    <div class="d-flex flex-column">
                      <router-link to="/admin">
                        <img :src="User" alt="User" />&nbsp; User
                        Profile</router-link>
                      <router-link to="/admin"><img :src="support" alt="support" />&nbsp; Tech
                        Support</router-link>
                      <router-link to="/admin">
                        <img :src="Shopicon" alt="Shopicon" />&nbsp; Shop
                        Admin</router-link>
                      <a href="#" @click="logOut"><img :src="logout" alt="logout" />&nbsp; Log Out</a>
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

<style></style>

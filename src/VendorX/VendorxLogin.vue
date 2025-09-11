<script setup>


import cmxLogo01 from "../assets/cmxLogo01.png";
import NetworkIcons from './Icons/NetworkIcons.png'
</script>

<template>
    <div style="background-color: #FCFCFC;">
        <div class="d-flex align-items-center justify-content-center" :style="{height: '100vh'}">
            <div class="loginBox">
                <div class="loginLogo">
                    <img :src="cmxLogo01" alt="cmxLogo01" class="img-fluid" />
                </div>
                <div class="loginBody text-center">
                    <div class="text-center my-5">
                        <h3 class="vH3 fw-bold">VendorX Network</h3>
                        <img :src="NetworkIcons" alt="NetworkIcons" :style="{ width: '45px' }" />
                    </div>
                    <p class="fw-bold mt-5" :style="{ color: '#027A2B' }">Check your email for login instructions</p>
                    <div class="w-75 m-auto mt-3">
                        <p class="thankTxt">Thank you for joining CMX VendorX Network <br> Your shop will be able to now Vendor
                            Link with your shops</p>
                    </div>
                    <button type="button" class="btn btn-light px-5" :style="{ backgroundColor: '#FF8100' }">login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loginBox {
    width: 650px;
    background-color: #fff;
    border-radius: 0px 0px 5px 5px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.loginLogo {
    background-color: #000;
    padding: 3px 5px;
    border-radius: 5px 5px 0px 0px;
}

.loginLogo img {
    width: 135px;
}

.loginBody {
    padding: 1.5rem 2.8rem;
}

.vH3 {
    color: #008B38
}

p.thankTxt {
    color: #787878;
    text-align: center;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}
</style>

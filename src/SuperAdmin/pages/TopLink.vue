<script setup>

let Links = [
    { name: 'SHOP DEMOS', link: '#SHOPDEMOS', id: 'SHOPDEMOS' },
    { name: 'SHOP ADMIN', link: '#SHOPADMIN', id: 'SHOPADMIN' },
    { name: 'VENDORX', link: '#VENDORX', id: 'VENDORX' },
    { name: 'REPORTS', link: '#Reports', id: 'Reports' },
 
    { name: 'CUSTOMER', link: '#CUSTOMERX', id: 'CUSTOMER' },

]

</script>

<script>
export default {
    props: {
        showhideaccordion: Function
    },
}
</script>

<template>
    <div class="card">
        <div class="card-body">

            <div class="d-flex align-items-center justify-content-start gap-1 flex-sm-wrap overflow-auto">
                <div class="boxLi" v-for="(Items, index) in  Links " v-bind:key="index">
                    <a v-on:click="showhideaccordion(Items.id)" :href="Items.link" v-smooth-scroll="{ offset: -81 }">
                        {{ Items.name }}

                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.SupTopLink .card{
    border-radius: 5px;
    background: #2F2F2F;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 7px 35px;
  
}
.SupTopLink .card  .card-body{
    background-color: #000;
    border: 5px solid #787878;
    border-radius: 7px;  
    padding: 0 ;
}
.SupTopLink .card  .card-body a{
    color: #fff;
    padding: 10px 30px;
    text-decoration: underline !important;
    display: block;
    border-right: 5px solid #787878;
    font-size: 13px;
    font-weight: 600;
}
.SupTopLink .card  .card-body a:hover{
    background: #2F2F2F;
}
</style>
<script setup>

</script>

<script>
export default {
    props: {
        showhideaccordion: Function
    },
}
</script>

<template>
    <div class="partstopdetials mt-2 mb-5">
        <div class="d-flex flex-wrap gap-4">

            <div class="partstopdetialsBox NEEDSBox">

                <div class="d-flex justify-content-between align-items-start ">
                    <p class="m-0">NEEDS <br> ORDERED</p>
                    <div class="btn-group dropend">
                        <a href="javascript:void(0)" class="dropdown-toggle text-black" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Update</a></li>
                            <li><a class="dropdown-item" href="#">Pending</a></li>
                        </ul>
                    </div>
                </div>
                <a href="#PendingOrderAllVehicle" v-on:click="showhideaccordion('PendingOrderAllVehicle')"
                    class="text-black" v-smooth-scroll="{ offset: -58 }">
                    <h1 class="mt-2 text-center">7</h1>
                    <h6 class="text-center">PARTS</h6>
                </a>
            </div>
            <div class="partstopdetialsBox ORDEREDBox">

                <div class="d-flex justify-content-between align-items-start ">
                    <p class="m-0">ORDERED</p>
                    <div class="btn-group dropend">
                        <a href="javascript:void(0)" class="dropdown-toggle text-black" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Update</a></li>
                            <li><a class="dropdown-item" href="#">Pending</a></li>
                        </ul>
                    </div>
                </div>
                <a href="#OrderAllVehicle" v-on:click="showhideaccordion('OrderAllVehicle')" class="text-black"
                    v-smooth-scroll="{ offset: -58 }">
                    <h1 class="mt-2 text-center">12</h1>
                    <h6 class="text-center">PARTS</h6>
                </a>
            </div>
            <div class="partstopdetialsBox PARTIALBOX">

                <div class="d-flex justify-content-between align-items-start ">
                    <p class="m-0">PARTIAL <br /> DELIVERY</p>
                    <div class="btn-group dropend">
                        <a href="javascript:void(0)" class="dropdown-toggle text-black" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Update</a></li>
                            <li><a class="dropdown-item" href="#">Pending</a></li>
                        </ul>
                    </div>
                </div>
                <a href="#PartialDelivery" v-on:click="showhideaccordion('PartialDelivery')" class="text-black"
                    v-smooth-scroll="{ offset: -58 }">
                    <h1 class="mt-2 text-center">8</h1>
                    <h6 class="text-center">PARTS</h6>
                </a>
            </div>
            <div class="partstopdetialsBox ArrivedBox">

                <div class="d-flex justify-content-between align-items-start ">
                    <p class="m-0">Arrived<br /> 100%</p>
                    <div class="btn-group dropend">
                        <a href="javascript:void(0)" class="dropdown-toggle text-black" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Update</a></li>
                            <li><a class="dropdown-item" href="#">Pending</a></li>
                        </ul>
                    </div>
                </div>
                <a href="#DeliveredAllvehicle" v-on:click="showhideaccordion('DeliveredAllvehicle')" class="text-black"
                    v-smooth-scroll="{ offset: -58 }">
                    <h1 class="mt-2 text-center">8</h1>
                    <h6 class="text-center">PARTS</h6>
                </a>
            </div>
            <div class="partstopdetialsBox pendingBox">

                <div class="d-flex justify-content-between align-items-start ">
                    <p class="m-0">pending <br /> RETURNs</p>
                    <div class="btn-group dropend">
                        <a href="javascript:void(0)" class="dropdown-toggle text-black" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Update</a></li>
                            <li><a class="dropdown-item" href="#">Pending</a></li>
                        </ul>
                    </div>
                </div>
                <a href="#PendingReturnsAllvehicle" v-on:click="showhideaccordion('PendingReturnsAllvehicle')"
                    class="text-black" v-smooth-scroll="{ offset: -58 }">
                    <h1 class="mt-2 text-center">10</h1>
                    <h6 class="text-center">In Shop</h6>
                </a>
            </div>
            <div class="partstopdetialsBox RETURNsBox">

                <div class="d-flex justify-content-between align-items-start ">
                    <p class="m-0">RETURNs</p>
                    <div class="btn-group dropend">
                        <a href="javascript:void(0)" class="dropdown-toggle text-black" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Update</a></li>
                            <li><a class="dropdown-item" href="#">Pending</a></li>
                        </ul>
                    </div>
                </div>
                <a href="#ReturnedAllvehicle" v-on:click="showhideaccordion('ReturnedAllvehicle')" class="text-black"
                    v-smooth-scroll="{ offset: -58 }">
                    <h1 class="mt-2 text-center">10</h1>
                    <h6 class="text-center">PENDING CREDIT</h6>
                </a>
            </div>
        </div>

    </div>
</template>

<style scoped>
.partstopdetialsBox {
    width: 150px;
    height: 150px;
    flex-shrink: 0;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.partstopdetialsBox p {
    color: #000;
    font-size: 13px;
    line-height: 15px;
    min-height: 30px;
    font-style: normal;
    font-weight: 600;
    text-transform: uppercase;
}

.partstopdetialsBox h1 {
    font-weight: 700;
}

.partstopdetialsBox h6 {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
}

.partstopdetialsBox.AllVehiclBox {
    border: 3px solid #FFF;
    background: #FFF;
}

.partstopdetialsBox.NEEDSBox {
    border: 3px solid #FFF;
    background: #F0F511;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
}

.partstopdetialsBox.ORDEREDBox {
    border: 3px solid #FFF;
    background: #ccdff0;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
}

.partstopdetialsBox.PARTIALBOX {
    border: 3px solid #FFF;
    background: #B9DBC7;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
}

.partstopdetialsBox.ArrivedBox {
    border: 3px solid #FFF;
    background: #4DAC73;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
}

.partstopdetialsBox.pendingBox {
    border: 3px solid #FFF;
    background: #F0C9C9;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
}

.partstopdetialsBox.RETURNsBox {
    border: 2.015px solid #FFF;
    background: #FF4C4C;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
}

.partstopdetialsBox.supplementBox {
    border: 3px solid #FFF;
    background: #FFDDBA;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
}

.partstopdetialsBox.approvedBox {
    border: 3px solid #FFF;
    background: #FFAA52;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
}

.partstopdetialsBox.pARTSBox {
    border: 3px solid #FFF;
    background: #D2D4D7;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
}

.partstopdetialsBox.TechBox {
    border: 3px solid #FFF;
    background: #9747FF;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);


}

.partstopdetialsBox.TechBox p {
    color: #fff;
}
</style>
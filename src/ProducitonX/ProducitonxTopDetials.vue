<script setup>
const ProduDataTop = [
    {
        Id: 'arrivalboxA',
        className: 'ARRIVALBox',
        Heading: 'Arrival open tech',
        Number: '',
        Link: '',
        Hdata: 'H: 255',
    },
    {
        Id: 'BodyTechLi',
        className: 'BodyTechA',
        Heading: 'Body Tech 1 <Full Name>',
        Number: '',
        Link: 'BodyTechA',
        Hdata: 'H: 255',
    },
    {
        Id: 'BodyTechTwo',
        className: 'BodyTechA',
        Heading: 'Body Tech 2 <Full Name>',
        Number: '',
        Link: 'BodyTechA',
        Hdata: 'H: 255',
    },
    {
        Id: 'BodyTechThree',
        className: 'BodyTechA',
        Heading: 'Body Tech 3 <Full Name>',
        Number: '',
        Link: 'BodyTechA',
        Hdata: 'H: 255',
    },
    {
        Id: 'BodyTechFour',
        className: 'BodyTechA',
        Heading: 'Body Tech 4 <Full Name>',
        Number: '',
        Link: 'BodyTechA',
        Hdata: 'H: 255',
    },
    {
        Id: 'BodyTechFive',
        className: 'BodyTechA',
        Heading: 'Body Tech 5 <Full Name>',
        Number: '',
        Link: 'BodyTechA',
        Hdata: 'H: 255',
    },
    {
        Id: 'BodyTechSix',
        className: 'BodyTechA',
        Heading: 'Body Tech 6 <Full Name>',
        Number: '',
        Link: 'BodyTechA',
        Hdata: 'H: 255',
    },
    {
        Id: 'MechtechOne',
        className: 'BodyTechA',
        Heading: 'Mech Tech 7 <Full Name>',
        Number: '',
        Link: 'BodyTechA',
        Hdata: 'H: 255',
    }
]
const ProduDataSec = [
    {
        Id: 'paintechOne',
        className: 'PaintTech',
        Heading: 'Paint Tech 1 <Full Name>',
        Number: '',
        Link: '',
        Hdata: 'H: 255',
    },
    {
        Id: 'paintechTwo',
        className: 'PaintTech',
        Heading: 'Paint Tech 2 <Full Name>',
        Number: '',
        Link: '',
        Hdata: 'H: 255',
    },
    {
        Id: 'DetailTechOne',
        className: 'DetailTech',
        Heading: 'Detail Tech 1 <Full Name>',
        Number: '',
        Link: '',
        Hdata: 'H: 255',
    },
    {
        Id: 'DetailTechTwo',
        className: 'DetailTech',
        Heading: 'Detail Tech 2 <Full Name>',
        Number: '',
        Link: '',
        Hdata: 'H: 255',
    },
    {
        Id: 'completedTch',
        className: 'CompletedBox',
        Heading: 'Completed',
        Number: '',
        Link: '',
 
    },
]
</script>
<script>
export default {    
    props:{
        showhideaccordion:Function
    },
}
</script>
<template>
    <div class="partstopdetials mt-2 mb-5">
        <div class="d-flex flex-wrap gap-4">
            <div class="productionxBox" :class="item.className" v-for="(item, index) in ProduDataTop" v-bind:key="index">
                <div class="d-flex justify-content-between align-items-start ">
                    <p class="proHead m-0">{{ item.Heading }}</p>
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
                <a v-bind:href="`#${item.Id}`" v-on:click="showhideaccordion(item.Id)" class="text-black" v-smooth-scroll="{ offset: -58 }">
                    <h1 class="mt-2 text-center">10</h1>
                    <p class="proH">{{ item.Hdata }}</p>
                </a>
            </div>
        </div>
        <div class="d-flex flex-wrap gap-4 mt-4">
            <div class="productionxBox pendingBox" :class="item.className" v-for="(item, index) in ProduDataSec"
                v-bind:key="index">
                <div class="d-flex justify-content-between align-items-start ">
                    <p class="proHead m-0">{{ item.Heading }}</p>
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
                <a v-bind:href="`#${item.Id}`" v-on:click="showhideaccordion(item.Id)" class="text-black" v-smooth-scroll="{ offset: -58 }">
                    <h1 class="mt-2 text-center">10</h1>
                    <p class="proH">{{ item.Hdata }}</p>
                </a>
            </div>
        </div>
    </div>
</template>
<style scoped>
.productionxBox {
    width: 150px;
    height: 150px;
    flex-shrink: 0;
    box-shadow: 0px 2.686px 2.686px 0px rgba(0, 0, 0, 0.25);
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
}

.productionxBox p.proHead {
    color: #000;
    font-size: 13px;
    line-height: 15px;
    min-height: 30px;
    font-style: normal;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.productionxBox h1 {
    font-weight: 700;
}


.productionxBox .proH {
    position: absolute;
    left: 5px;
    bottom: 0;
    margin: 0;
    min-height: 0;
    color: #000;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
}

.productionxBox.TechBox p {
    color: #fff;
}

.productionxBox.ARRIVALBox {
    border: 3px solid #FFF;
    background: #00FF51;
}

.productionxBox.BodyTechA {
    border: 3px solid #FFF;
    background: #ccdff0;
}

.productionxBox.BodyTechA {
    border: 3px solid #FFF;
    background: #ccdff0;
}

.productionxBox.PaintTech {
    border: 3px solid #FFF;
    background: #00FFFF;
}

.productionxBox.CompletedBox {
    border: 3px solid #FFF;
    background: #008836;
}
.productionxBox.DetailTech {
    border: 3px solid #FFF;
    background: #B947FF;
}

</style>
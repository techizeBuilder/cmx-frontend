<script setup> 
import flexIcon from '../../../Icons/flexIcon.png'
import Uplaod from '../../../Icons/Uplaod.png'
import Photor from '../../../Icons/Photor.png'
import FileAx from '../../../Icons/FileAx.png'
import printAX from '../../../Icons/printAX.png'
import ChatAx from '../../../Icons/ChatAx.png'
import FIcon from '../../../Icons/FIcon.png'
import NumImg from '../../../Icons/NumImg.png'
import DropdownAX from '../../../Icons/DropdownAX.png'

import TimelineModul from './TimelineModul.vue'
import PhotoViewModul from './PhotoViewModul.vue'


</script>
<template>
    <div class="card boxAX mt-1">
        <div class="topVgZ d-flex justify-content-between" :style="{ backgroundColor: '#CFAF00' }">

            <div class="d-flex gap-3 align-items-center">
                <input type="text" class="StagNum" placeholder="1" value="1" />
                <div class="tooltips">
                    <img class='cursor-pointer' :src="Uplaod" alt="Uplaod" />
                    <span class="tooltiptext">Open FoldX </span>
                </div>
                <div class="tooltips">
                    <img class='cursor-pointer'  data-bs-toggle="modal" data-bs-target="#PhotoViewModul" :src="Photor" alt="Photor" />
                    <span class="tooltiptext">View Photos </span>
                </div>
                <div class="tooltips">
                    <img class='cursor-pointer' :src="FileAx" alt="FileAx" />
                    <span class="tooltiptext">View Estimate </span>
                </div>
                <div class="tooltips">
                    <img class='cursor-pointer' :src="printAX" alt="printAX" />
                    <span class="tooltiptext">Print File </span>
                </div>
               
                <div class="tooltips">
                    <img class='cursor-pointer'  data-bs-toggle="modal" data-bs-target="#TimelineModul" :src="ChatAx" alt="ChatAx" />
                    <span class="tooltiptext">Timeline </span>
                </div>
                <div class="tooltips">
                    <img class='cursor-pointer' :src="FIcon" alt="FIcon" />
                    <span class="tooltiptext">Flag Tech </span>
                </div> 
              
               
            </div>
            <div>
                <img :src="DropdownAX" alt="DropdownAX">
            </div>
        </div>

        <div class="timeLineBox" v-show="isOpenPhoto">
            <div class="card-body p-1">
                <div class="card mt-1">
                    <div class="timeLineBoxtop">
                        <p class="m-0">Photo Preview</p>
                        <div class='cursor-pointer' @click="isOpenPhoto = false">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>

                    <div class="p-3">
                        <div id="FlowXBo" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#FlowXBo" data-bs-slide-to="0"
                                    class="active"></button>
                                <button type="button" data-bs-target="#FlowXBo" data-bs-slide-to="1"></button>
                                <button type="button" data-bs-target="#FlowXBo" data-bs-slide-to="2"></button>
                            </div>
                            <div class="carousel-inner" :style="{ width: '350px' }">
                                <div class="carousel-item active">
                                    <img :src="cmx" alt="Los Angeles" class="img-fluid"
                                        :style="{ width: '350px', borderRadius: '5px' }" />
                                </div>
                                <div class="carousel-item">
                                    <img :src="cmx01" alt="Los Angeles" class="img-fluid"
                                        :style="{ width: '350px', borderRadius: '5px' }" />
                                </div>
                                <div class="carousel-item">
                                    <img :src="cmx02" alt="Los Angeles" class="img-fluid"
                                        :style="{ width: '350px', borderRadius: '5px' }" />
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#FlowXBo"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#FlowXBo"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>



   


        <div class="card-body p-1">
            <div class="card mt-1">
                <div class="card-body py-1">
                    <div class="d-flex  justify-content-between">
                        <div>
                            <p class="m-0">floderX#</p>
                            <p class="m-0">STAGE</p>
                        </div>
                        <div>
                            <img :src="flexIcon" alt="flexIcon">

                        </div>
                    </div>


                </div>

            </div>
            <div class="card mt-1">
                <div class="card-body py-1">
                    <p class="m-0 fw-bold">Target: MM/DD/YYYY </p>
                    <p class="m-0">Days to Repair: 001</p>
                    <p class="m-0">Arrival: MM/DD/YYYY HH:MM PM</p>
                    <p class="m-0">Completed: MM/DD/YYYY</p>
                </div>
            </div>
            <div class="card mt-1">
                <div class="card-body py-1">
                    <p class="m-0 ">YYYY Make Model </p>
                    <p class="m-0">Last Name, First Name</p>
                    <p class="m-0">Insurance</p>
                </div>
            </div>
            <div class="card mt-1">
                <div class="card-body py-1">
                    <p class="m-0 ">Estimator: Full Name</p>
                    <p class="m-0">Body Tech: Full Name</p>
                    <p class="m-0">Paint Tech: Full Name</p>
                    <p class="m-0">Frame Tech: Full Name</p>
                    <p class="m-0">Mech Tech: Full Name</p>
                    <p class="m-0">Detail Tech: Full Name</p>
                </div>
            </div>
            <div class="pTableFlow">
                <table class="table table-bordered table-sm mt-1 text-center mb-1">
                    <thead>
                        <tr>
                            <td class="text-center">Pre Scan</td>
                            <td class="text-center">Post Scan</td>
                            <td class="text-center">ADAS</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pTableFlow">
                <table class="table table-bordered table-sm mt-1 text-center mb-1">
                    <thead>
                        <tr>
                            <td class="text-start" colspan="5">Estimate Amount: $00,000.00</td>
                        </tr>
                        <tr>
                            <td class="text-center">Total Hrs</td>
                            <td class="text-center">Body</td>
                            <td class="text-center">Mech</td>
                            <td class="text-center">Frame</td>
                            <td class="text-center">Paint</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center">28.5</td>
                            <td class="text-center">14.0</td>
                            <td class="text-center">2.0</td>
                            <td class="text-center">4.5</td>
                            <td class="text-center">8.0</td> 
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pTableFlow">
                <table class="table table-bordered table-sm text-center">
                    <thead>
                        <tr>
                            <td class="text-center">Total Parts</td>
                            <td class="text-center">Ordered</td>
                            <td class="text-center">Delivered</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center">005</td>
                            <td class="text-center">002</td>
                            <td class="text-center">003</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="card boxAX mt-1">
        <div class="topVgZ d-flex justify-content-between" :style="{ backgroundColor: '#CFAF00' }">

            <div class="d-flex gap-3 align-items-center">
                <input type="text" class="StagNum" placeholder="1" value="1" />
                <div class="tooltips">
                    <img class='cursor-pointer' :src="Uplaod" alt="Uplaod" />
                    <span class="tooltiptext">Open FoldX </span>
                </div>
                <div class="tooltips">
                    <img class='cursor-pointer'  data-bs-toggle="modal" data-bs-target="#PhotoViewModul" :src="Photor" alt="Photor" />
                    <span class="tooltiptext">View Photos </span>
                </div>
                <div class="tooltips">
                    <img class='cursor-pointer' :src="FileAx" alt="FileAx" />
                    <span class="tooltiptext">View Estimate </span>
                </div>
                <div class="tooltips">
                    <img class='cursor-pointer' :src="printAX" alt="printAX" />
                    <span class="tooltiptext">Print File </span>
                </div>
               
                <div class="tooltips">
                    <img class='cursor-pointer'  data-bs-toggle="modal" data-bs-target="#TimelineModul" :src="ChatAx" alt="ChatAx" />
                    <span class="tooltiptext">Timeline </span>
                </div>
                <div class="tooltips">
                    <img class='cursor-pointer' :src="FIcon" alt="FIcon" />
                    <span class="tooltiptext">Flag Tech </span>
                </div> 
              
               
            </div>
            <div>
                <img :src="DropdownAX" alt="DropdownAX">
            </div>
        </div>

        

        <div class="card-body p-1">
            <div class="card mt-1">
                <div class="card-body py-1">
                    <div class="d-flex  justify-content-between">
                        <div>
                            <p class="m-0">floderX#</p>
                            <p class="m-0">STAGE</p>
                        </div>
                        <div>
                            <img :src="flexIcon" alt="flexIcon">

                        </div>
                    </div>


                </div>

            </div>
            <div class="card mt-1">
                <div class="card-body py-1">
                    <p class="m-0 fw-bold">Target: MM/DD/YYYY </p>
                    <p class="m-0">Days to Repair: 001</p>
                    <p class="m-0">Arrival: MM/DD/YYYY HH:MM PM</p>
                    <p class="m-0">Completed: MM/DD/YYYY</p>
                </div>
            </div>
            <div class="card mt-1">
                <div class="card-body py-1">
                    <p class="m-0 ">YYYY Make Model </p>
                    <p class="m-0">Last Name, First Name</p>
                    <p class="m-0">Insurance</p>
                </div>
            </div>
            <div class="card mt-1">
                <div class="card-body py-1">
                    <p class="m-0 ">Estimator: Full Name</p>
                    <p class="m-0">Body Tech: Full Name</p>
                    <p class="m-0">Paint Tech: Full Name</p>
                    <p class="m-0">Frame Tech: Full Name</p>
                    <p class="m-0">Mech Tech: Full Name</p>
                    <p class="m-0">Detail Tech: Full Name</p>
                </div>
            </div>
            <div class="pTableFlow">
                <table class="table table-bordered table-sm mt-1 text-center mb-1">
                    <thead>
                        <tr>
                            <td class="text-center">Pre Scan</td>
                            <td class="text-center">Post Scan</td>
                            <td class="text-center">ADAS</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pTableFlow">
                <table class="table table-bordered table-sm mt-1 text-center mb-1">
                    <thead>
                        <tr>
                            <td class="text-start" colspan="5">Estimate Amount: $00,000.00</td>
                        </tr>
                        <tr>
                            <td class="text-center">Total Hrs</td>
                            <td class="text-center">Body</td>
                            <td class="text-center">Mech</td>
                            <td class="text-center">Frame</td>
                            <td class="text-center">Paint</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center">28.5</td>
                            <td class="text-center">14.0</td>
                            <td class="text-center">2.0</td>
                            <td class="text-center">4.5</td>
                            <td class="text-center">8.0</td> 
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pTableFlow">
                <table class="table table-bordered table-sm text-center">
                    <thead>
                        <tr>
                            <td class="text-center">Total Parts</td>
                            <td class="text-center">Ordered</td>
                            <td class="text-center">Delivered</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center">005</td>
                            <td class="text-center">002</td>
                            <td class="text-center">003</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  
    <TimelineModul />
    <div class="modal" id="PhotoViewModul">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-0">

                <!-- Modal body -->
                <div class="modal-body p-0">
                    <div class="timeLineBox">
                        <div class="card-body p-0">
                            <div class="card mt-0">
                                <div class="timeLineBoxtop">
                                    <p class="m-0">Photo Preview</p>
                                    <div class='cursor-pointer' data-bs-dismiss="modal">
                                        <i class="fa-solid fa-xmark"></i>
                                    </div>
                                </div>

                                <div class="p-3">
                                    <div id="PhotoTimew" class="carousel slide" data-bs-ride="carousel">
                                        <div class="carousel-indicators">
                                            <button type="button" data-bs-target="#PhotoTimew" data-bs-slide-to="0"
                                                class="active"></button>
                                            <button type="button" data-bs-target="#PhotoTimew"
                                                data-bs-slide-to="1"></button>
                                            <button type="button" data-bs-target="#PhotoTimew"
                                                data-bs-slide-to="2"></button>
                                        </div>
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img :src="cmx" alt="Los Angeles" class="img-fluid"
                                                    :style="{ borderRadius: '5px' }" />
                                            </div>
                                            <div class="carousel-item">
                                                <img :src="cmx01" alt="Los Angeles" class="img-fluid"
                                                    :style="{ borderRadius: '5px' }" />
                                            </div>
                                            <div class="carousel-item">
                                                <img :src="cmx02" alt="Los Angeles" class="img-fluid"
                                                    :style="{ borderRadius: '5px' }" />
                                            </div>
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#PhotoTimew"
                                            data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon"></span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#PhotoTimew"
                                            data-bs-slide="next">
                                            <span class="carousel-control-next-icon"></span>
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
</template>
<style scoped>
.pTableFlow {
    border-radius: 3px;
}

.pTableFlow table.table td {
    font-size: 16px;
}

.boxAX {
    border-radius: 5px 5px 5px 5px;
    border: 1px solid #cacaca;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.topVgZ {

    padding: 4px 5px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.StagNum {
    border-radius: 5px;
    text-align: center;
    width: 30px;
    height: 25px;
    background-color: transparent;
    border: 1px solid #000;
    font-weight: 600;
}

.StagNum:hover {
    box-shadow: none;
}

input.StagNum:focus,
.StagNum:focus-visible {
    box-shadow: none;
    outline: none;
}

/* timeLineBoxtop */
 
 

p.NumTos.m-0 {
    width: 35px;
    height: 25px;
    background-color: #EEEEEE;
    text-align: center;
    border-radius: 4px;
    vertical-align: middle;
}


.tooltips {
    position: relative;

}

.tooltips .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    font-size: 14px; 

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -60px;
}

.tooltips:hover .tooltiptext {
    visibility: visible;
}
</style>
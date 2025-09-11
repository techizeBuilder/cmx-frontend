 
<script setup>
import Listcard from './Listcard.vue'
 
</script>
<template>
    <swiper 
    @swiper="onSwiper"
          @slideChange="onSlideChange"
     :slidesPerView="2" :navigation="true" :spaceBetween="30" :pagination="pagination" :modules="modules"
        class="mySwiper">
        <swiper-slide>

            <div class="swiper-no-swiping">
                <h3>Draggable 1</h3>
               <Listcard />


            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="swiper-no-swiping">
                
                <h3>Draggable 2</h3>
                <vuedraggable class="dragArea list-group" :list="ArrivalData" group="people" item-key="id">
                    <template #item="{ element }">
                        <div class="list-group-item">
                            {{ element.floderX }}
                        </div>
                    </template>
                </vuedraggable>
            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="swiper-no-swiping">
                <h3>Draggable 2</h3>
                <vuedraggable class="dragArea list-group" :list="list3" group="people" item-key="id">
                    <template #item="{ element }">
                        <div class="list-group-item">
                            {{ element.name }}
                        </div>
                    </template>
                </vuedraggable>
            </div>
        </swiper-slide>


    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import vuedraggable from "vuedraggable";

import vueDraggerData from "./vueDraggerData.vue";


let idGlobal = 0;
export default {
    name: "clone-on-control",
    display: "Clone on Control",
    instruction: "Press Ctrl to clone element from list 1",
    order: 4,
    components: {
        vuedraggable,
        Swiper,
        SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Navigation, Pagination, Scrollbar],
      };
    },
    setup() {
        return {
            pagination: {
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
            },
            modules: [Pagination, Navigation],
        };
    },
    data() {
        return {
            ComeBackData: [
                {
                    id: 1,
                    Color: "#cfaf00",
                    floderX: "XXXXXX001",
                    STAGE: "",
                    Target: "25/01/2024",
                    DaystoRepair: "001",
                    Arrival: "MM/DD/YYYY HH:MM PM",
                    Completed: "MM/DD/YYYY",
                    YYYY: "YYYY ",
                    Make: "Make",
                    Model: "Model",
                    LastName: "Last Name",
                    FirstName: "First Name",
                    Insurance: "Insurance",
                    Estimator: "Full Name",
                    BodyTech: "Full Name",
                    PaintTech: "Full Name",
                    FrameTech: "Full Name",
                    MechTech: "Full Name",
                    DetailTech: "Full Name",
                    PreScan: "-",
                    PostScan: "-",
                    ADAS: "-",
                    EstimateAmount: "$00,000.00",
                    TotalHrs: "28.5",
                    Body: "14.0",
                    Mech: "2.0",
                    Frame: "4.5",
                    Paint: "8.0",
                    TotalParts: "005",
                    Ordered: "002",
                    Delivered: "003",
                },
                {
                    id: 2,
                    Color: "#cfaf00",
                    floderX: "XXXXXX002",
                    STAGE: "",
                    Target: "25/01/2024",
                    DaystoRepair: "001",
                    Arrival: "MM/DD/YYYY HH:MM PM",
                    Completed: "MM/DD/YYYY",
                    YYYY: "YYYY ",
                    Make: "Make",
                    Model: "Model",
                    LastName: "LastName",
                    FirstName: "FirstName",
                    Insurance: "Insurance",
                    Estimator: "Full Name",
                    BodyTech: "Full Name",
                    PaintTech: "Full Name",
                    FrameTech: "Full Name",
                    MechTech: "Full Name",
                    DetailTech: "Full Name",
                    PreScan: "-",
                    PostScan: "-",
                    ADAS: "-",
                    EstimateAmount: "$00,000.00",
                    TotalHrs: "28.5",
                    Body: "14.0",
                    Mech: "2.0",
                    Frame: "4.5",
                    Paint: "8.0",
                    TotalParts: "005",
                    Ordered: "002",
                    Delivered: "003",
                },
            ],
            ArrivalData: [
                {
                    id: 3,
                    Color: "#c0ffb5",
                    floderX: "XXXXXX003",
                    STAGE: "",
                    Target: "25/01/2024",
                    DaystoRepair: "001",
                    Arrival: "MM/DD/YYYY HH:MM PM",
                    Completed: "MM/DD/YYYY",
                    YYYY: "YYYY ",
                    Make: "",
                    Model: "",
                    LastName: "",
                    FirstName: "",
                    Insurance: "",
                    Estimator: "Full Name",
                    BodyTech: "Full Name",
                    PaintTech: "Full Name",
                    FrameTech: "Full Name",
                    MechTech: "Full Name",
                    DetailTech: "Full Name",
                    PreScan: "-",
                    PostScan: "-",
                    ADAS: "-",
                    EstimateAmount: "$00,000.00",
                    TotalHrs: "28.5",
                    Body: "14.0",
                    Mech: "2.0",
                    Frame: "4.5",
                    Paint: "8.0",
                    TotalParts: "005",
                    Ordered: "002",
                    Delivered: "003",
                },
                {
                    id: 4,
                    Color: "#c0ffb5",
                    floderX: "XXXXXX004",
                    STAGE: "",
                    Target: "25/01/2024",
                    DaystoRepair: "001",
                    Arrival: "MM/DD/YYYY HH:MM PM",
                    Completed: "MM/DD/YYYY",
                    YYYY: "YYYY ",
                    Make: "",
                    Model: "",
                    LastName: "",
                    FirstName: "",
                    Insurance: "",
                    Estimator: "Full Name",
                    BodyTech: "Full Name",
                    PaintTech: "Full Name",
                    FrameTech: "Full Name",
                    MechTech: "Full Name",
                    DetailTech: "Full Name",
                    PreScan: "-",
                    PostScan: "-",
                    ADAS: "-",
                    EstimateAmount: "$00,000.00",
                    TotalHrs: "28.5",
                    Body: "14.0",
                    Mech: "2.0",
                    Frame: "4.5",
                    Paint: "8.0",
                    TotalParts: "005",
                    Ordered: "002",
                    Delivered: "003",
                },
            ],
            list1: [
                { name: "Jesus", id: 1 },
                { name: "Paul", id: 2 },
                { name: "Peter", id: 3 }
            ],
            list2: [
                { name: "Luc", id: 5 },
                { name: "Thomas", id: 6 },
                { name: "John", id: 7 }
            ],
            list3: [
                { name: "Luc", id: 5 },
                { name: "Thomas", id: 6 },
                { name: "John", id: 7 }
            ],
            controlOnStart: true
        };
    },

};
 
</script>
<style scoped></style>
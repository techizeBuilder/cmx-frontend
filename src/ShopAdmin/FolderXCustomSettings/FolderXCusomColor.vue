<script setup>
import set from "../icons/set.png";
import dropdownicons from "../icons/timeMove.png";
let StagesItems = [
  
    {
        id: 1,
        backgroundColor: "#FFFB9F",
        category: "Customer Pay",
    },
    {
        id: 2,
        backgroundColor: "#FFB5B5",
        category: "Total Loss",
    },
    {
        id: 3,
        backgroundColor: "#DDC2FF",
        category: "Insurance Name",
    },
    {
        id: 4,
        backgroundColor: "#9FFFC6",
        category: "Insurance Name",
    },
    {
        id: 5,
        backgroundColor: "#8DBBFF",
        category: "Insurance Name",
    },
    {
        id: 6,
        backgroundColor: "#CFAF00",
        category: "Insurance Name",
    },
    {
        id: 7,
        backgroundColor: "#A7FFFF",
        category: "Insurance Name",
    },
    {
        id: 8,
        backgroundColor: "#CECECE",
        category: "Insurance",
    },

];

</script>
<template>
    <div class="pb-2 mt-3">
        <div class="d-flex align-items-center gap-3 justify-content-end">
            <div class="d-flex justify-content-end gap-3">
                <button type="button" class="btn btn-light px-4">Add</button>
                <button type="button" class="btn btn-light px-4">Edit</button>
                <button type="button" class="btn btn-light px-4">Cancel</button>
                <button type="button" class="btn btn-light px-4">Save</button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-4 mx-auto">
            <div class="card">
                <div class="card-body">

                    <ul class=" Tul px-4 ms-1 py-4">
                        <h5 class="offcanvas-title mb-4">
                            <img :src="set" alt="set" :style="{ width: '25px' }" />
                            File Custom Color
                        </h5>
                        <div class="input-container mb-4">
                            <div class="input-group flex-nowrap">
                                <input class="form-control border" type="search" id="example-search-input"
                                    placeholder="Quick Search" />
                                <span class="input-group-append">
                                    <button
                                        class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                                        type="button">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                        <li class="ps-5"> 
                            <div class="form-check form-switch d-flex align-items-center gap-4">                                  
                                <span class="stagColor" :style="{backgroundColor: '#E6F0FF'}"></span>
                                <label class="form-check-label">Default </label>
                            </div>
                        </li>
                        <li v-for="(items, index) in StagesItems">
                            <div class="form-check form-switch d-flex align-items-center gap-4">
                                <input class="form-check-input" type="checkbox" :id="items.category"
                                    :name="items.category" />
                                <img :src="dropdownicons" alt="DropdownIcons" />
                                <span class="stagColor" :style="`background-color: ${items.backgroundColor}`"></span>
                                <label class="form-check-label" :for="items.category">
                                    {{ items.category }}</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.dropdown.setDashFex button.btn:focus {
    outline: none;
    box-shadow: none;
    border: none;
}

.Tul {
    list-style: none;
    padding-bottom: 2rem;
}

.Tul li {
    color: #787878;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  
    margin-bottom: 0.5rem;
}

.stagColor {
    width: 20px;
    height: 20px;
    display: block;
}

.Uplist {
    list-style: none;
    padding-bottom: 2rem;
}
</style>

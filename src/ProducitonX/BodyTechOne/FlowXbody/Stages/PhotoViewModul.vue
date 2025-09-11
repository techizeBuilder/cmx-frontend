<script setup>
import cmx from '../../../Icons/cmx.jpeg'
import cmx01 from '../../../Icons/cmx01.jpeg'
import cmx02 from '../../../Icons/cmx02.jpeg'
</script>
<template>
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


/* timeLineBoxtop */
.timeLineBoxtop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background-color: #D9D9D9;
}

.TimeAZ {
    display: flex;
    justify-content: start;
    gap: 11px;
    align-items: center;
    padding: 3px 3px;
    text-wrap: nowrap;
}

.DotA {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    box-shadow: 0px 4.258px 4.258px rgba(0, 0, 0, 0.25);
    display: inline-block;
}
 
</style>
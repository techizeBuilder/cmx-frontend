<script setup>

</script>
<template>
    <h4 class=" text-center mt-5">Point Of Impact</h4>
    <div class="metodo mt-3" id="metodo">
        <!-- <img :src='pointOfImpact' alt="pointOfImpact" class="img-fluid" :style="{ width: '380px' }" /> -->
        <div class="circle">

            <!-- box -->
            <div class="box link-1">
                <div>
                    A
                </div>
                <span>Front Center</span>
            </div>

            <!-- box -->
            <div class="box link-2">
                <div>
                    B
                </div>
                <span>RT Front</span>
            </div>
            <!-- /box -->

            <!-- box -->
            <div class="box link-3">
                <div>
                    C
                </div>
                <span>RT Side</span>
            </div>
            <!-- /box -->

            <!-- box -->
            <div class="box link-4">
                <div>
                    D
                </div>
                <span>RT Rear</span>
            </div>
            <!-- /box -->

            <!-- box -->
            <div class="box link-5">
                <div>
                    E
                </div>
                <span>Rear Center</span>
            </div>
            <!-- /box -->

            <!-- box -->
            <div class="box link-6">
                <div>
                    F
                </div>
                <span>LT Rear</span>
            </div>
            <!-- /box -->

            <!-- box -->
            <div class="box link-7">
                <div>
                    G
                </div>
                <span>LT Side</span>
            </div>
            <!-- /box -->

            <!-- box -->
            <div class="box link-8">
                <div>
                    H
                </div>
                <span>LT Front </span>
            </div>
            <!-- /box -->
            <div class="box link-9">
                <div>
                    I
                </div>
                <span>Windshield</span>
            </div>
            <!-- /box -->
            <div class="box link-10">
                <div>
                    J
                </div>
                <span>Top</span>
            </div>
            <!-- /box -->

        </div>
        <ul class="mt-2">
            <li class="Orange">Orange: Primary Point of Impact</li>
            <li class="Orange"> Light Orange: Secondary Point of Impact</li>
        </ul>



    </div>



</template>
<style scoped>
.metodo {
    width: 100%;

}.Orange {
    font-size: 12px;
}

.circle {
    position: relative;
    width: 350px;
    height: 350px;
    margin: 0px auto;
    background-image: url('../Icons/pointOfImpact01.png');
    background-size: cover;
    background-position: center center;
}

.box {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    border-radius: 50%;
    transition: all linear 0.2s;
}

.box>div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #000;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
}

.box>span {
    display: none;
    background-color: #e0ebfd;
    padding: 5px 10px;
    width: 100%;
    position: relative;
    font-size: 12px;
    min-width: max-content;
    border-radius: 5px;
    color: #000;
    font-weight: 600;
    /* border: 1px solid #969694; */
    box-shadow: 2px 3px 2px 1px #949494;
    z-index: 999999;
}

.box:hover span {
    display: block;
    z-index: 999999;
}

.box img {
    width: 100%;
    height: auto;
}

.link-1 {
    background: #d9d9d9;
    transform: translate(-50%, -50%) rotate(0deg) translateY(-151px) rotate(-0deg);
}


.link-2 {
    background: #ff8100;
    /*gris*/
    transform: translate(-50%, -50%) rotate(45deg) translateY(-151px) rotate(-45deg);

}

.link-3 {
    background: #ffcd99;
    /*gris*/
    transform: translate(-50%, -50%) rotate(90deg) translateY(-151px) rotate(-90deg);

}

.link-4 {
    background: #d9d9d9;
    /*gris*/
    transform: translate(-50%, -50%) rotate(135deg) translateY(-151px) rotate(-135deg);

}

.link-5 {
    background: #d9d9d9;
    /*amarillo*/
    transform: translate(-50%, -50%) rotate(180deg) translateY(-151px) rotate(-180deg);

}

.link-6 {
    background: #d9d9d9;
    /*amarillo*/
    transform: translate(-50%, -50%) rotate(226deg) translateY(-151px) rotate(-220deg);

}

.link-7 {
    background: #d9d9d9;
    /*naranja*/
    transform: translate(-50%, -50%) rotate(270deg) translateY(-151px) rotate(-270deg);

}

.link-8 {
    background: #d9d9d9;
    /*naranja*/
    transform: translate(-50%, -50%) rotate(315deg) translateY(-151px) rotate(-315deg);

}

.link-9 {
    background: #d9d9d9;
    /*naranja*/
    transform: translate(-50%, -50%) rotate(0deg) translateY(-40px) rotate(-0deg);

}

.link-10 {
    background: #0066ee;
    /*naranja*/
    transform: translate(-50%, -50%) rotate(0deg) translateY(20px) rotate(-0deg);

}
</style>
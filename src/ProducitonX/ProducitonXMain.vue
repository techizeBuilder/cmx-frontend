<script setup>
import zoomout from "./Icons/zoomout.png";
import expandImg from "./Icons/expandImg.png";
import ProducitonxTopDetials from "./ProducitonxTopDetials.vue";
import BodyTechOneMain from "./BodyTechOne/BodyTechOneMain.vue";
import scrollTopIcons from "./Icons/scrollTopIcons.png";
import ArrivalOpenTechMain from "./ArrivalOpenTech/ArrivalOpenTechMain.vue";
function scrollToTop() {
  window.scrollTo(0, 0);
}
</script>
<script>
export default {
  data() {
    return {
      showhideaccordionref: "",
    };
  },
  methods: {
    showhideaccordion(id) {
      this.showhideaccordionref = id;
    },
  },
};
</script>
<template>
  <div class="px-3">
    <div class="d-sm-flex align-items-center justify-content-end my-3 gap-5">
      <div class="dropdown mb-sm-0 text-end">
        <button
          type="button"
          class="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          :style="{ backgroundColor: '#FF8100', color: '#ffffff' }"
        >
          OPTIONS
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#"> Open New RO</a></li>
          <li><a class="dropdown-item" href="#">Print Tags</a></li>
          <li><a class="dropdown-item" href="#">Print Final</a></li>
        </ul>
      </div>
    </div>

    <ProducitonxTopDetials :showhideaccordion="showhideaccordion" />
    <div class="cmxdashboard-set-main mt-3">
      <div class="d-sm-flex align-items-center justify-content-end mt-0">
        <div class="zoom-sign d-flex justify-content-end">
          <div class="img">
            <img class="zoomout" :src="zoomout" alt="zoomout" />
          </div>
          <div class="img">
            <img :src="expandImg" alt="expandImg" />
          </div>
        </div>
      </div>
      <div class="sectionaccomadation" :style="{ height: '400vh' }">
        <ul class="link-section">
          <li class="li-drop" id="arrivalboxA">
            <div class="accordion accordion-flush" id="accordionAllVehicles">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsAllVehicles"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>Arrival - Open Tech</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmsAllVehicles"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'arrivalboxA' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionAllVehicles"
                >
                  <ArrivalOpenTechMain />
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="BodyTechLi">
            <div class="accordion accordion-flush" id="accordionBodyTechLi">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsBodyTechLi"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>Body Tech 1: Full Name</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmsBodyTechLi"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'BodyTechLi' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionBodyTechLi"
                >
                  <BodyTechOneMain />
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="BodyTechTwo">
            <div class="accordion accordion-flush" id="accordionBodyTechTwo">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsBodyTechTwo"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>Body Tech 2: Full Name</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmsBodyTechTwo"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'BodyTechTwo' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionBodyTechTwo"
                >
                  <p>Body Tech 2: Full Name</p>
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="BodyTechThree">
            <div class="accordion accordion-flush" id="accordionBodyTechThree">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsBodyTechThree"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>Body Tech 3: Full Name</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmsBodyTechThree"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'BodyTechThree' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionBodyTechThree"
                >
                  <p>Body Tech 3: Full Name</p>
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="BodyTechFour">
            <div class="accordion accordion-flush" id="accordionBodyTechFour">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsBodyTechFour"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>Body Tech 4: Full Name</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmsBodyTechFour"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'BodyTechFour' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionBodyTechFour"
                >
                  <h6 class="p-4">Body Tech 4</h6>
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="BodyTechFive">
            <div class="accordion accordion-flush" id="accordionBodyTechFive">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsBodyTechFive"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>Body Tech 5: Full Name</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmsBodyTechFive"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'BodyTechFive' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionBodyTechFive"
                >
                  <h6 class="p-4">Body Tech 5</h6>
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="BodyTechSix">
            <div class="accordion accordion-flush" id="accordionBodyTechSix">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsBodyTechSix"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>Body Tech 6: Full Name</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmsBodyTechSix"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'BodyTechSix' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionBodyTechSix"
                >
                  <h6 class="p-4">Body Tech 6</h6>
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="MechtechOne">
            <div class="accordion accordion-flush" id="accordionMechtechOne">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsMechtechOne"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>MECH Tech 1: Full Name</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmsMechtechOne"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'MechtechOne' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionMechtechOne"
                >
                  <h6 class="p-4">MECH Tech 1</h6>
                </div>
              </div>
            </div>
          </li>

          <li class="li-drop" id="paintechOne">
            <div class="accordion accordion-flush" id="accordionpaintechOne">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmspaintechOne"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>paint Tech 1: Full Name</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmspaintechOne"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'paintechOne' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionpaintechOne"
                >
                  <h6 class="p-4">paint Tech</h6>
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="paintechTwo">
            <div class="accordion accordion-flush" id="accordionpaintechTwo">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmspaintechTwo"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>paint Tech 2: Full Name</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmspaintechTwo"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'paintechTwo' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionpaintechTwo"
                >
                  <h6 class="p-4">paint Tech</h6>
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="DetailTechOne">
            <div class="accordion accordion-flush" id="accordionDetailTechOne">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsDetailTechOne"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>Detail Tech 1: Full Name</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmsDetailTechOne"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'DetailTechOne' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionDetailTechOne"
                >
                  <h6 class="p-4">Detail Tech</h6>
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="DetailTechTwo">
            <div class="accordion accordion-flush" id="accordionDetailTechTwo">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmsDetailTechTwo"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>Detail Tech 2: Full Name</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmsDetailTechTwo"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'DetailTechTwo' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordionDetailTechTwo"
                >
                  <h6 class="p-4">Detail Tech</h6>
                </div>
              </div>
            </div>
          </li>
          <li class="li-drop" id="completedTch">
            <div class="accordion accordion-flush" id="accordioncompletedTch">
              <div class="accordion-item">
                <div class="pages">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapsecmscompletedTch"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>completed</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapsecmscompletedTch"
                  class="accordion-collapse collapse"
                  :class="[
                    showhideaccordionref == 'completedTch' ? 'show' : 'hide',
                  ]"
                  data-bs-parent="#accordioncompletedTch"
                >
                  <h6 class="p-4">completed</h6>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div
          class="d-flex justify-content-end cursor-pointer mt-5"
          :style="{ marginRight: '20px' }"
          @click="scrollToTop"
        >
          <img
            :src="scrollTopIcons"
            alt="scrollTopIcons"
            class="img-fluid"
            :style="{ width: '24px' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.shopadmindashboard
  .right-sliderbarallpage
  .link-section
  .li-drop
  .accordion-flush
  .accordion-item
  .accordion-button.folderXAccor {
  padding: 10px 0px;
}
</style>

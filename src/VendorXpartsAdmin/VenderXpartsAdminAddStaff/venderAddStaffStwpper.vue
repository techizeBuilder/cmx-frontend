<script setup>
import { ref } from "vue";
 
import ContactDetailAddStaff from './ContactDetailAddStaff.vue'
import LoginAddStaff from './LoginAddStaff.vue'
import PermissionsAddStaff from './PermissionsAddStaff.vue'

const step = ref(1);
const next = () => {
    step.value = step.value + 1;
};
const prev = () => {
    step.value = step.value - 1;
};
</script>

<template>
    <div class="sectionaccomadation container-fluid">
        <div class="panel panel-primary">

            <div class="d-flex text-center gap-2 mt-4">
                <div v-if="step === 1">
                    <button type="button" 
                    :class='step === 1 ? "mansih" : "over"'
                    class="btn btnSuccess btnSuccess">
                        1
                    </button>
                    <p>Add Staff</p>

                </div>
                <div v-else>
                    <button type="button" class="btn btnSuccess btnSuccess">
                        1
                    </button>
                    <p>Add Staff</p>
                </div>
                <div v-if="step <= 2">
                    <button type="button"
                    :class='step === 2 ? "Btnonovber" : null'
                    class="btn btnAS ">
                      2
                    </button>
                    <p>Permissions</p>

                </div>
                <div v-else>
                    <button type="button" class="btn btnSuccess btnSuccess">
                        2
                    </button>
                    <p>Permissions</p>
                </div>
             
                
            </div>

            <form class="form-horizontal" action="/action_page.php">
                <div class="d-flex justify-content-end gap-3 mb-4" v-show="step !== 5">
                    <button @click.prevent="prev()" :disabled="step === 1" class="btn btn-light px-5">
                        &lt; Back
                    </button>
                    <button v-if="step < 3" @click.prevent="next()" class="btn btn-light px-5">
                        Next >
                    </button>
                    <button v-else @click.prevent="next()" class="btn btnNexeAs px-5">
                        Complete >
                    </button>
                </div>
                <fieldset v-if="step == 1">
                    <div class="panel-body">
                        <div class="d-flex justify-content-center gap-4">
                           <ContactDetailAddStaff />
                            <LoginAddStaff />
                        </div>
                      
                    </div>
                </fieldset>
                <fieldset v-if="step == 2">
                    <div class="panel-body">
                        <PermissionsAddStaff />
                    </div>
                </fieldset>
               
               
               
             
            </form>
        </div>
    </div>
</template>
<style scoped>
.accomdationset-head {
    display: flex;
    align-items: center;
    gap: 40px;
    margin-left: 50px;
}

.accordion-item .pages h3 {
    font-size: 13.5px;
    margin-bottom: 0;
    font-weight: 600;
}

.btnAS {
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    width: 120px;
    border: 0.5px solid #ededed;


}

.btnSuccess {
    background: #24FF00;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    width: 120px;
    border: none;
    text-align: center;

}

.btnNexeAs {
    background: #ededed;
    box-shadow: 0px 2.952px 2.952px 0px rgba(0, 0, 0, 0.15);
}
.Btnonovber{
    background: #eee;
}

ul.link-section {
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>


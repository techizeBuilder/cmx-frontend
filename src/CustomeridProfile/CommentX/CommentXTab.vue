<script setup>
import { ref, watch } from "vue";
import lock from "../Icons/lock.png";
 

let PayItem = [
  { name: " Customer", price: "0.00" },
  { name: " Insurance", price: "0.00" },
  { name: " Grand Total", price: "0.00" },
  { name: "Total Posted", price: "0.00" },
];
const page = ref(1);
const ShowPage = ref(1);
const prevComments = ref(0);
const comments = ref(25);
const decPage = () => {
  if (page.value) {
    ShowPage.value--;
    // prevComments.value = prevComments.value + 25;
  }
};
const incPage = () => {
  ShowPage.value++;
  //   if (comments.value / 25 > page.value) {
  //     page.value++;
  //     prevComments.value = prevComments.value - 25;
  //   }
};
watch(comments, (newComments) => {
  page.value = newComments / 25;
});
</script>
<template>
  <div class="estimatedetailsection">
   
    <div class="table-responsive mystripetable mt-4">
      <table class="table table-bordered text-center table-striped">
        <thead>
          <tr>
            <th>Select</th>
            <th class="text-start" :style="{ minWidth: '600px' }">Comment</th>
            <th>Category</th>
            <th>Staff ID</th>
            <th class="text-nowrap">Date | Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center" :style="{ verticalAlign: 'middle' }">
              <div class="dropdown">
                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"></button>
                <ul class="dropdown-menu py-2">
                  <li class="ps-4 mb-2">Edit</li>
                  <li class="ps-4">Save</li>
                </ul>
              </div>
            </td>
            <td>
              <textarea class="form-control" rows="5" id="comment" name="text">Lorem  Ipsum is simply dummy text of the printing and typesettingLorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Lorem  Ipsum is simply dummy text of the printing and 
                            </textarea>
            </td>
            <td class="text-center"></td>
            <td class="text-center">-</td>
            <td class="text-center"></td>
          </tr>
          <tr class="text-center">
            <td class="text-center" :style="{ verticalAlign: 'middle' }">
              <img class="sidebar-icon w-25 h-25" :src="lock" alt="Payment" />
            </td>
            <td>
              <textarea disabled class="form-control" rows="5" id="comment"
                name="text">Lorem  Ipsum is simply dummy text of the printing and typesettingLorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Lorem  Ipsum is simply dummy text of the printing and </textarea>
            </td>
            <td class="text-center"></td>
            <td class="text-center">-</td>
            <td class="text-center"></td>
          </tr>
          <tr class="text-center">
            <td class="text-center" :style="{ verticalAlign: 'middle' }">
              <img class="sidebar-icon w-25 h-25" :src="lock" alt="Payment" />
            </td>
            <td>
              <textarea disabled class="form-control" rows="5" id="comment"
                name="text">Lorem  Ipsum is simply dummy text of the printing and typesettingLorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Lorem  Ipsum is simply dummy text of the printing and typesettingLorem Ipsume Lorem Ipsume Lorem Ipsume Lor </textarea>
            </td>
            <td class="text-center"></td>
            <td class="text-center">-</td>
            <td class="text-center"></td>
          </tr>
          <tr v-for="index in ((25 * page) - 3)" :key="index">
            <td class="text-center" :style="{ verticalAlign: 'middle' }">
              <div class="dropdown">
                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown"></button>
                <ul class="dropdown-menu py-2">
                  <li class="ps-4 mb-2">Edit</li>
                  <li class="ps-4">Save</li>
                </ul>
              </div>
            </td>
            <td>
              <textarea class="form-control" rows="5" id="comment" name="text">Lorem  Ipsum is simply dummy text of the printing and typesettingLorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Lorem  Ipsum is simply dummy text of the printing and 
                            </textarea>
            </td>
            <td class="text-center"></td>
            <td class="text-center">-</td>
            <td class="text-center"></td>
          </tr>
        </tbody>
      </table>
      <small class="d-flex justify-content-end mt-1">Edit not available after end of day</small>
    </div>
    <div class="navigation-sectionsame mt-3">
      <div class="box">
        <select class="form-select" v-model="comments">
          <option selected>25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </select>
      </div>
      <div class="boxsg">
        <div class="sect-box-arrow">
          <i @click="decPage" class="fa-solid fa-angle-left"></i>
          <div class="box-count">{{ ShowPage }}</div>
          <i @click="incPage" class="fa-solid fa-angle-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

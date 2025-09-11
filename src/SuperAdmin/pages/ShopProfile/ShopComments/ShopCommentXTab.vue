<script setup>
import { ref, watch } from "vue";
import lock from "../../../assets/images/lock.png";
import arrow from "../../../assets/images/jobarrw.png";

let PayItem = [
  { name: " Customer", price: "0.00" },
  { name: " Insurance", price: "0.00" },
  { name: " Grand Total", price: "0.00" },
  { name: "Total Posted", price: "0.00" },
];
const page = ref(1);
const ShowPage = ref(1);
const prevComments = ref(0);
const comments = ref(10);
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
  <div class="shopratetabnew ">
    <div class="table-responsive   mt-4">
      <table class="table table-bordered text-center table-striped">
        <thead>
          <tr>
            <th>Comment #</th>
            <th>Select</th>
            <th class="text-start" :style="{ minWidth: '600px' }">Comment</th>
            <th>Category</th>
            <th>Staff ID</th>
            <th class="text-nowrap">Date | Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
             <td class="text-center">2</td>
            <td class="text-center" :style="{ verticalAlign: 'middle' }">
              <div class="dropdown">
                <button
                  type="button"
                  class="btn dropdown-toggle"
                  data-bs-toggle="dropdown"
                ></button>
                <ul class="dropdown-menu py-2">
                  <li class="ps-4 mb-2"><button class="btn">Edit</button></li>
                  <li class="ps-4"><button class="btn">Save</button></li>
                </ul>
              </div>
            </td>
            <td>
              <textarea class="form-control shopcomment-control" rows="1" id="comment" name="text">Lorem  Ipsum is simply dummy text of the printing and type setting Lorem Ipsume Lorem Ipsume </textarea>
            </td>
            <td class="text-center"></td>
            <td class="text-center">-</td>
            <td class="text-center"></td>
          </tr>
          <tr class="text-center">
             <td class="text-center">2</td>
            <td class="text-center" :style="{ verticalAlign: 'middle' }">
              <img class="sidebar-icon w-25 h-25" :src="lock" alt="Payment" />
            </td>
            <td>
              <textarea
                disabled
                class="form-control shopcomment-control"
                rows="1"
                id="comment"
                name="text"
              >Lorem  Ipsum is simply dummy text of the printing and typesettingLorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Lorem  Ipsum is simply dummy text of the printing and</textarea
              >
            </td>
            <td class="text-center"></td>
            <td class="text-center">-</td>
            <td class="text-center"></td>
          </tr>
          <tr class="text-center">
             <td class="text-center">2</td>
            <td class="text-center" :style="{ verticalAlign: 'middle' }">
              <img class="sidebar-icon w-25 h-25" :src="lock" alt="Payment" />
            </td>
            <td>
              <textarea
                disabled
                class="form-control shopcomment-control"
                rows="1"
                id="comment"
                name="text"
              >Lorem  Ipsum is simply dummy text of the printing and typesettingLorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Lorem  Ipsum is simply dummy text of the printing and typesettingLorem Ipsume Lorem Ipsume Lorem Ipsume Lor </textarea
              >
            </td>
            <td class="text-center"></td>
            <td class="text-center">-</td>
            <td class="text-center"></td>
          </tr>
          <tr v-for="index in ((comments) - 3)" :key="index">
             <td class="text-center">2</td>
            <td class="text-center" :style="{ verticalAlign: 'middle' }">
              <div class="dropdown">
                <button
                  type="button"
                  class="btn dropdown-toggle"
                  data-bs-toggle="dropdown"
                ></button>
                <ul class="dropdown-menu py-2">
                  <li class="ps-4 mb-2"><button class="btn dropdown-item">Edit</button></li>
                  <li class="ps-4 mb-2"><button class="btn dropdown-item">Save</button></li>
                </ul>
              </div>
            </td>
            <td>
              <textarea class="form-control shopcomment-control" rows="1" id="comment" name="text">Lorem  Ipsum is simply dummy text of the printing and typesettingLorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Lorem  Ipsum is simply dummy text of the printing and</textarea
              >
            </td>
            <td class="text-center"></td>
            <td class="text-center">-</td>
            <td class="text-center"></td>
          </tr>
        </tbody>
      </table>
      <small class="d-flex justify-content-end mt-1"
        >Edit not available after end of day</small
      >
    </div>
    <div class="navigation-shuperadmin">
            <div class="box">
                <select class="form-select form-select-superdash">
                    <option selected>25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div class="navigationBox">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#"> <i class="fa-solid fa-angle-left"></i></a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                  
                    <li class="page-item"><a class="page-link" href="#"><i class="fa-solid fa-angle-right"></i></a></li>
                </ul>
                 
            </div>
        </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checkChecked = ref([false, false, false, false]);

const generateNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const handleCheckBox = (e, val) => {
  checkChecked.value[val] = e.target.checked;
};
</script>

<template>
  <div class="shopsettingdateail">
    <div class="row">
      <div class="col-lg-12">
        <div class="edit-section">
          <button>Edit</button>
          <!-- <button>Cancel</button> -->
          <button>Save</button>
        </div>
      </div>
    </div>
    <div class="settting-contantshop">
      <div class="box">
        <p>Enter Start Number For System Setup</p>
        <p>Enter Check Box In Of The Check Boxes.</p>
        <p>
          If You Selected Automatically This Will Activate the numerical Number
          Aotomatically.
        </p>
        <p>
          If You Select Manually, You will need to enter a manual entry each
          time .
        </p>
        <p>If you select leave blank no number will be populated</p>
        <p></p>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-3 col-md-4 col-sm-6 col-6 col-rowset">
        <div class="tablesetting">
          <table>
            <thead>
              <tr>
                <th>Estimate #</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="sub-child-tablesetting">
                  {{ checkChecked[0] ? generateNumber() : 1000010 }}
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    @click="handleCheckBox($event, 0)"
                  />Automatic
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" />Enter Manually</td>
              </tr>
              <!-- Add more rows as needed -->
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-6 col-rowset">
        <div class="tablesetting">
          <table>
            <thead>
              <tr>
                <th>RO #</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="sub-child-tablesetting">
                  {{ checkChecked[1] ? generateNumber() : 1000001 }}
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    @click="handleCheckBox($event, 1)"
                  />Automatic
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" />Enter Manually</td>
              </tr>
              <!-- Add more rows as needed -->
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-6 col-rowset">
        <div class="tablesetting">
          <table>
            <thead>
              <tr>
                <th>PO #</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="sub-child-tablesetting">
                  {{ checkChecked[2] ? generateNumber() : 1010101 }}
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    @click="handleCheckBox($event, 2)"
                  />Automatic
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" />Enter Manually</td>
              </tr>
              <!-- Add more rows as needed -->
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-6 col-rowset">
        <div class="tablesetting">
          <table>
            <thead>
              <tr>
                <th>INVOICE #</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="sub-child-tablesetting">
                  {{ checkChecked[3] ? generateNumber() : 1011101 }}
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    @click="handleCheckBox($event, 3)"
                  />Automatic
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" />Enter Manually</td>
              </tr>
              <!-- Add more rows as needed -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

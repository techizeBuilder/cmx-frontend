<script setup>
import { ref } from "vue";

const category = ref("");
const handleSelectCategory = () => {
  var modal = new bootstrap.Modal(document.getElementById(category.value));
  modal.show();
};
</script>
<template>
  <div class="shopratetabnew my-5">
    <div class="row">
      <div class="col-sm-12 col-lg-3">
        <form action="#" class="mb-1 px-xl-4">
          <div class="d-flex flex-column flex-lg-column flex-sm-row gap-4">
            <select class="form-select form-select-superdash w-100">
              <option selected disabled value="">Select Category</option> 
              <option value="DemoSetup"> Demo Setup</option>
              <option value="OnBoarding">On Boarding</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Compliant ">Compliant </option> 
            </select>

            <select
              v-model="category"
              @change="handleSelectCategory"
              class="form-select form-select-superdash w-100"
            >
              <option selected disabled value="">Select Quick Comment</option>
              <option value="Customer">Customer</option>
              <option value="Insurance">Insurance</option>
              <option value="Other">Other</option>
              <option value="Parts">Parts</option>
              <option value="Payments">Payments</option>
              <option value="Repairs">Repairs</option>
              <option value="Supplement">Supplement</option>
            </select>
          </div>
        </form>
        <div class="d-flex align-items-end gap-4 justify-content-center mt-4">
          <div class="d-flex align-items-end gap-4 justify-content-end">
            <button type="button" class="btn btn-dark px-4">
              <i class="fa-regular fa-floppy-disk"></i> Save
            </button>
            <button
              type="button"
              class="btn btn-dark text-nowrap px-4"
              v-on:click="seen = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-9">
        <div class="table-responsive mystripetable">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Enter New Comment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-start">
                  <textarea
                    class="form-control text-white shoptextComment"
                    rows="1"
                    id="comment"
                    name="text"
                    placeholder="Enter New Comment"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="Customer">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content" :style="{ backgroundColor: '#1E1E1E' }">
        <!-- Modal Header -->
        <div class="modal-header supshopprofilechatHeBox border-0">
          <h6 class="m-0">Customer</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
              :style="{backgroundColor: '#fff',opacity: '1'}"
         
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body px-2 mt-4">
          <div class="row justify-content-center g-3">
            <div class="col-sm-12 mb-4">
              <div class="card mx-auto" :style="{ maxWidth: '500px', backgroundColor: '#000', color: '#fff' }">
                <div class="card-body p-5">
                  <div
                    class="d-flex mb-1 justify-content-between align-items-center"
                  >
                    <h6 class="m-0">Customer</h6>
                  </div>
                  <p class="border p-2 rounded border-dark">Welcome Message</p>

                  <div
                    class="card MsgDiscard mt-3"
                    :style="{ border: '1px solid #1E1E1E', backgroundColor: '#000', color: '#fff' }"
                  >
                    <div class="card-body pb-5 border-dark">
                      <small>
                        We first want to take a moment to thank you for trusting
                        us with your vehicle. If you have any questions please
                        contact us via our Chatlink or by phone.
                      </small>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-3">
                    <button
                      type="button"
                      class="btn btn-light text-white"
                      data-bs-dismiss="modal"
                      :style="{backgroundColor: '#000'}"
                    >
                      Cancel
                    </button>
                    <button type="button" class="btn btn-light text-white" :style="{backgroundColor: '#000'}" > Select</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="Insurance">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content" :style="{ backgroundColor: '#1E1E1E' }">
        <!-- Modal Header -->
        <div class="modal-header supshopprofilechatHeBox border-0">
          <h6 class="m-0">Insurance</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
              :style="{backgroundColor: '#fff',opacity: '1'}"
          
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body px-2 mt-4">
          <div class="row justify-content-center g-3">
            <div class="col-sm-12 mb-4">
              <div class="card mx-auto" :style="{ maxWidth: '500px', backgroundColor: '#000', color: '#fff' }">
                <div class="card-body p-5">
                  <div
                    class="d-flex mb-1 justify-content-between align-items-center"
                  >
                    <h6 class="m-0">Insurance</h6>
                  </div>
                  <p class="border p-2 rounded border-dark">Welcome Message</p>

                  <div
                    class="card MsgDiscard mt-3"
                    :style="{ border: '1px solid #1E1E1E', backgroundColor: '#000', color: '#fff' }"
                  >
                    <div class="card-body pb-5 border-dark">
                      <small>
                        We first want to take a moment to thank you for trusting
                        us with your vehicle. If you have any questions please
                        contact us via our Chatlink or by phone.
                      </small>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-3">
                    <button
                      type="button"
                      class="btn btn-light text-white"
                      data-bs-dismiss="modal"
                      :style="{backgroundColor: '#000'}"
                    >
                      Cancel
                    </button>
                    <button type="button" class="btn btn-light text-white" :style="{backgroundColor: '#000'}" > Select</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="Other">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content" :style="{ backgroundColor: '#1E1E1E' }">
        <!-- Modal Header -->
        <div class="modal-header supshopprofilechatHeBox border-0">
          <h6 class="m-0">Other</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
              :style="{backgroundColor: '#fff',opacity: '1'}"
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body px-2 mt-4">
          <div class="row justify-content-center g-3">
            <div class="col-sm-12 mb-4">
              <div class="card mx-auto" :style="{ maxWidth: '500px', backgroundColor: '#000', color: '#fff' }">
                <div class="card-body p-5">
                  <div
                    class="d-flex mb-1 justify-content-between align-items-center"
                  >
                    <h6 class="m-0">Other</h6>
                  </div>
                  <p class="border p-2 rounded border-dark">Welcome Message</p>

                  <div
                    class="card MsgDiscard mt-3"
                    :style="{ border: '1px solid #1E1E1E', backgroundColor: '#000', color: '#fff' }"
                  >
                    <div class="card-body pb-5 border-dark">
                      <small>
                        We first want to take a moment to thank you for trusting
                        us with your vehicle. If you have any questions please
                        contact us via our Chatlink or by phone.
                      </small>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-3">
                    <button
                      type="button"
                      class="btn btn-light text-white"
                      data-bs-dismiss="modal"
                      :style="{backgroundColor: '#000'}"
                    >
                      Cancel
                    </button>
                    <button type="button" class="btn btn-light text-white" :style="{backgroundColor: '#000'}" > Select</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="Parts">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content" :style="{ backgroundColor: '#1E1E1E' }">
        <!-- Modal Header -->
        <div class="modal-header supshopprofilechatHeBox border-0">
          <h6 class="m-0">Parts</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
              :style="{backgroundColor: '#fff',opacity: '1'}"
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body px-2 mt-4">
          <div class="row justify-content-center g-3">
            <div class="col-sm-12 mb-4">
              <div class="card mx-auto" :style="{ maxWidth: '500px', backgroundColor: '#000', color: '#fff' }">
                <div class="card-body p-5">
                  <div
                    class="d-flex mb-1 justify-content-between align-items-center"
                  >
                    <h6 class="m-0">Parts</h6>
                  </div>
                  <p class="border p-2 rounded border-dark">Welcome Message</p>

                  <div
                    class="card MsgDiscard mt-3"
                    :style="{ border: '1px solid #1E1E1E', backgroundColor: '#000', color: '#fff' }"
                  >
                    <div class="card-body pb-5 border-dark">
                      <small>
                        We first want to take a moment to thank you for trusting
                        us with your vehicle. If you have any questions please
                        contact us via our Chatlink or by phone.
                      </small>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-3">
                    <button
                      type="button"
                      class="btn btn-light text-white"
                      data-bs-dismiss="modal"
                      :style="{backgroundColor: '#000'}"
                    >
                      Cancel
                    </button>
                    <button type="button" class="btn btn-light text-white" :style="{backgroundColor: '#000'}" > Select</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="Payments">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content" :style="{ backgroundColor: '#1E1E1E' }">
        <!-- Modal Header -->
        <div class="modal-header supshopprofilechatHeBox border-0">
          <h6 class="m-0">Payments</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
              :style="{backgroundColor: '#fff',opacity: '1'}"
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body px-2 mt-4">
          <div class="row justify-content-center g-3">
            <div class="col-sm-12 mb-4">
              <div class="card mx-auto" :style="{ maxWidth: '500px', backgroundColor: '#000', color: '#fff' }">
                <div class="card-body p-5">
                  <div
                    class="d-flex mb-1 justify-content-between align-items-center"
                  >
                    <h6 class="m-0">Payments</h6>
                  </div>
                  <p class="border p-2 rounded border-dark">Welcome Message</p>

                  <div
                    class="card MsgDiscard mt-3"
                    :style="{ border: '1px solid #1E1E1E', backgroundColor: '#000', color: '#fff' }"
                  >
                    <div class="card-body pb-5 border-dark">
                      <small>
                        We first want to take a moment to thank you for trusting
                        us with your vehicle. If you have any questions please
                        contact us via our Chatlink or by phone.
                      </small>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-3">
                    <button
                      type="button"
                      class="btn btn-light text-white"
                      data-bs-dismiss="modal"
                      :style="{backgroundColor: '#000'}"
                    >
                      Cancel
                    </button>
                    <button type="button" class="btn btn-light text-white" :style="{backgroundColor: '#000'}" > Select</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="Repairs">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content" :style="{ backgroundColor: '#1E1E1E' }">
        <!-- Modal Header -->
        <div class="modal-header supshopprofilechatHeBox border-0">
          <h6 class="m-0">Repairs</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
              :style="{backgroundColor: '#fff',opacity: '1'}"
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body px-2 mt-4">
          <div class="row justify-content-center g-3">
            <div class="col-sm-12 mb-4">
              <div class="card mx-auto" :style="{ maxWidth: '500px', backgroundColor: '#000', color: '#fff' }">
                <div class="card-body p-5">
                  <div
                    class="d-flex mb-1 justify-content-between align-items-center"
                  >
                    <h6 class="m-0">Repairs</h6>
                  </div>
                  <p class="border p-2 rounded border-dark">Welcome Message</p>

                  <div
                    class="card MsgDiscard mt-3"
                    :style="{ border: '1px solid #1E1E1E', backgroundColor: '#000', color: '#fff' }"
                  >
                    <div class="card-body pb-5 border-dark">
                      <small>
                        We first want to take a moment to thank you for trusting
                        us with your vehicle. If you have any questions please
                        contact us via our Chatlink or by phone.
                      </small>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-3">
                    <button
                      type="button"
                      class="btn btn-light text-white"
                      data-bs-dismiss="modal"
                      :style="{backgroundColor: '#000'}"
                    >
                      Cancel
                    </button>
                    <button type="button" class="btn btn-light text-white" :style="{backgroundColor: '#000'}" > Select</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="Supplement">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content" :style="{ backgroundColor: '#1E1E1E' }">
        <!-- Modal Header -->
        <div class="modal-header supshopprofilechatHeBox border-0">
          <h6 class="m-0">Supplement</h6>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
              :style="{backgroundColor: '#fff',opacity: '1'}"
          ></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body px-2 mt-4">
          <div class="row justify-content-center g-3">
            <div class="col-sm-12 mb-4">
              <div class="card mx-auto" :style="{ maxWidth: '500px', backgroundColor: '#000', color: '#fff' }">
                <div class="card-body p-5">
                  <div
                    class="d-flex mb-1 justify-content-between align-items-center"
                  >
                    <h6 class="m-0">Supplement</h6>
                  </div>
                  <p class="border p-2 rounded border-dark">Welcome Message</p>

                  <div
                    class="card MsgDiscard mt-3"
                    :style="{ border: '1px solid #1E1E1E', backgroundColor: '#000', color: '#fff' }"
                  >
                    <div class="card-body pb-5 border-dark">
                      <small>
                        We first want to take a moment to thank you for trusting
                        us with your vehicle. If you have any questions please
                        contact us via our Chatlink or by phone.
                      </small>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between mt-3">
                    <button
                      type="button"
                      class="btn btn-light text-white"
                      data-bs-dismiss="modal"
                      :style="{backgroundColor: '#000'}"
                    >
                      Cancel
                    </button>
                    <button type="button" class="btn btn-light text-white" :style="{backgroundColor: '#000'}" > Select</button>
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
.MsgDiscard {
  min-height: 230px;
}

.supshopprofilechatHeBox {
  background-color: #000;
  color: #ffffff;
}
</style>

<script setup></script>
<template>
  <div class="row pt-sm-4 cutsomerRow justify-content-center">
    <div class="row">
      <div class="col-lg-12 col-rowset">
        <div class="d-lg-flex align-items-end gap-4 mb-3 justify-content-end">
          <div class="d-flex align-items-end gap-4 justify-content-end">
            <button type="button" class="btn btn-light text-nowrap">
              &nbsp; Link
            </button>
            <button type="button" class="btn btn-light text-nowrap">
              &nbsp; Edit
            </button>
            <button type="button" class="btn btn-light text-nowrap">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4">
      <div class="row">
        <div class="col-sm-12 col-md-8">
          <div class="mt-4">
            <p class="datexlable" style="min-inline-size: max-content;">
              Do you want us to repair your vehicle?
            </p>
            <div class="customerXBox">
              <div class="row">
                <div class="col">
                  <select class="form-select" style="min-width: 500px;">
                    <option selected disabled>Select</option>
                    <option>Item1</option>
                    <option>Item2</option>
                    <option>Item 3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <p class="datexlable" style="min-inline-size: max-content;">
              How soon do you want to repair your vehicle?
            </p>
            <div class="customerXBox">
              <div class="row">
                <div class="col">
                  <select class="form-select" style="min-width: 500px;">
                    <option selected disabled>Select</option>
                    <option>Item1</option>
                    <option>Item2</option>
                    <option>Item 3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <p class="datexlable" style="min-inline-size: max-content;">
              Have you been here before?
            </p>
            <div class="customerXBox">
              <div class="row">
                <div class="col">
                  <select class="form-select" style="min-width: 500px;">
                    <option selected disabled>Select</option>
                    <option>Item1</option>
                    <option>Item2</option>
                    <option>Item 3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <p class="datexlable" style="min-inline-size: max-content;">
              Who referred you here?
            </p>
            <div class="customerXBox">
              <div class="row">
                <div class="col">
                  <select class="form-select" style="min-width: 500px;">
                    <option selected disabled>Select</option>
                    <option>Item1</option>
                    <option>Item2</option>
                    <option>Item 3</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="customerRatingR text-center mt-4">
              <h3 class="mb-1 p-2" style="min-inline-size: max-content;">
                How easy was this form?
              </h3>
              <h6>5 Stars = Easy</h6>
              <div
                class="d-flex justify-content-center align-items-center gap-2"
              >
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

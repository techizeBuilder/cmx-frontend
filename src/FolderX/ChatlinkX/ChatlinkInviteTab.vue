<script setup></script>
<template>
  <div class="px-3 mt-4 m-auto">
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div class="card mt-2">
          <div class="card-body">
            <div class="esAppo">
              <div class="mt-4">
                <p class="datexlable">First name</p>
                <div class="customerXBox">
                  <input class="form-control" type="text" />
                </div>
              </div>
              <div class="mt-4">
                <p class="datexlable">Last name</p>
                <div class="customerXBox">
                  <input class="form-control" type="text" />
                </div>
              </div>
              <div class="mt-4">
                <p class="datexlable">Cell # / Phone 1</p>
                <div class="customerXBox">
                  <input class="form-control" type="text" />
                </div>
              </div>
              <div class="mt-4">
                <p class="datexlable">Email</p>
                <div class="customerXBox">
                  <input class="form-control" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="esAppo">
              <div class="mt-4">
                <p class="datexlable">
                  Ask Customer: Do you authorize our shop to send SMS? You are
                  able to Opt Out at any time.
                </p>
                <div class="card">
                  <div
                    class="card-body d-flex align-items-center justify-content-between"
                  >
                    <div class="form-check form-switch">
                      <label class="form-check-label" for="OptIN">Opt IN</label>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="OptIN"
                        name="darkmode"
                        value="yes"
                        checked
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <p class="datexlable">Customer SMS Sent?</p>
                <div class="card">
                  <div class="card-body">
                    <div class="form-check form-switch">
                      <label class="form-check-label" for="Sent">Sent</label>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Sent"
                        name="darkmode"
                        value="yes"
                        checked
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-light mt-4 mx-auto"
                  :style="{ background: '#00FF51' }"
                >
                  Invite Chatlink
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

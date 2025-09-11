<script setup></script>
<template>
  <div class="px-3 mt-5">
    <div
      class="text-center d-flex flex-column align-items-end justify-content-center mb-4"
    >
      <div
        class="text-center d-flex flex-column align-items-center justify-content-center"
      >
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="mySwitch"
            name="darkmode"
            checked="checked"
            value="yes"
            style="font-size: 25px;"
          />
        </div>
        <p class="m-0 pe-4">VendorX Access</p>
      </div>
    </div>
    <div class="d-flex justify-content-between w-100 gap-5">
      <div class="w-100">
        <ul class="link-section">
          <li class="li-drop">
            <div
              class="accordion accordion-flush"
              id="accordionFlushSelectVendorType"
            >
              <div class="accordion-item">
                <div class="pages d-flex align-items-center">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseSelectVendorType"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>Select Vendor Type</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapseSelectVendorType"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushSelectVendorType"
                >
                  <div class="px-5 border-1">
                    <div class="form-check form-switch mt-4 mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Aftermarket"
                        name="Aftermarket"
                        value="yes"
                      />
                      <label class="form-check-label" for="Aftermarket"
                        >Aftermarket</label
                      >
                    </div>
                    <div class="form-check form-switch mt-4 mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Glass Sublet"
                        name="Glass Sublet"
                        value="yes"
                      />
                      <label class="form-check-label" for="Glass Sublet"
                        >Glass Sublet</label
                      >
                    </div>
                    <div class="form-check form-switch mt-4 mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="QRP"
                        name="QRP"
                        value="yes"
                      />
                      <label class="form-check-label" for="QRP"
                        >QRP (Quality Recycled Part)</label
                      >
                    </div>

                    <div class="form-check form-switch mt-4 mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="OEM"
                        name="OEM"
                        value="yes"
                      />
                      <label class="form-check-label" for="OEM"
                        >OEM - Dealership</label
                      >
                    </div>
                    <div class="form-check form-switch mt-4 mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="WheelSublet"
                        name="WheelSublet"
                        value="yes"
                      />
                      <label class="form-check-label" for="WheelSublet"
                        >Wheel Sublet</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="w-100">
        <ul class="link-section">
          <li class="li-drop">
            <div
              class="accordion accordion-flush"
              id="accordionFlushSelectDealershipBrands"
            >
              <div class="accordion-item">
                <div class="pages d-flex align-items-center">
                  <div
                    class="accordion-button collapsed folderXAccor"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseSelectDealershipBrands"
                    aria-expanded="false"
                  >
                    <div class="accomdationset-head">
                      <h3>Select Dealership Brands</h3>
                    </div>
                  </div>
                </div>
                <div
                  id="flush-collapseSelectDealershipBrands"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushSelectDealershipBrands"
                >
                  <div class="px-5 border-1">
                    <div class="form-check form-switch mt-4 mb-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Acura"
                        name="Acura"
                        value="yes"
                      />
                      <label class="form-check-label" for="Acura">Acura</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Audi"
                        name="Audi"
                        value="yes"
                      />
                      <label class="form-check-label" for="Audi">Audi</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="BMW"
                        name="BMW"
                        value="yes"
                      />
                      <label class="form-check-label" for="BMW">BMW</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Chrysler"
                        name="Chrysler"
                        value="yes"
                      />
                      <label class="form-check-label" for="Chrysler"
                        >Chrysler</label
                      >
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Ford"
                        name="Ford"
                        value="yes"
                      />
                      <label class="form-check-label" for="Ford">Ford</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="GM"
                        name="GM"
                        value="yes"
                      />
                      <label class="form-check-label" for="GM">GM</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Honda"
                        name="Honda"
                        value="yes"
                      />
                      <label class="form-check-label" for="Honda">Honda</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Hyundai"
                        name="Hyundai"
                        value="yes"
                      />
                      <label class="form-check-label" for="Hyundai"
                        >Hyundai</label
                      >
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Infiniti"
                        name="Infiniti"
                        value="yes"
                      />
                      <label class="form-check-label" for="Infiniti"
                        >Infiniti</label
                      >
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Isuzu"
                        name="Isuzu"
                        value="yes"
                      />
                      <label class="form-check-label" for="Isuzu">Isuzu</label>
                    </div>

                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Jaguar"
                        name="Jaguar"
                        value="yes"
                      />
                      <label class="form-check-label" for="Jaguar"
                        >Jaguar</label
                      >
                    </div>

                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Kia"
                        name="Kia"
                        value="yes"
                      />
                      <label class="form-check-label" for="Kia">Kia</label>
                    </div>

                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="LandRover"
                        name="LandRover"
                        value="yes"
                      />
                      <label class="form-check-label" for="LandRover"
                        >LandRover</label
                      >
                    </div>

                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Lexus"
                        name="Lexus"
                        value="yes"
                      />
                      <label class="form-check-label" for="Lexus">Lexus</label>
                    </div>

                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Mazda"
                        name="Mazda"
                        value="yes"
                      />
                      <label class="form-check-label" for="Mazda">Mazda</label>
                    </div>

                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Mercedes-Benz"
                        name="Mercedes-Benz"
                        value="yes"
                      />
                      <label class="form-check-label" for="Mercedes-Benz"
                        >Mercedes-Benz</label
                      >
                    </div>

                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Mitsubishi"
                        name="Mitsubishi"
                        value="yes"
                      />
                      <label class="form-check-label" for="Mitsubishi"
                        >Mitsubishi</label
                      >
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Nissan"
                        name="Nissan"
                        value="yes"
                      />
                      <label class="form-check-label" for="Nissan"
                        >Nissan</label
                      >
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Porsche"
                        name="Porsche"
                        value="yes"
                      />
                      <label class="form-check-label" for="Porsche"
                        >Porsche</label
                      >
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Subaru"
                        name="Subaru"
                        value="yes"
                      />
                      <label class="form-check-label" for="Subaru"
                        >Subaru</label
                      >
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Suzuki"
                        name="Suzuki"
                        value="yes"
                      />
                      <label class="form-check-label" for="Suzuki"
                        >Suzuki</label
                      >
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Toyota"
                        name="Toyota"
                        value="yes"
                      />
                      <label class="form-check-label" for="Toyota"
                        >Toyota</label
                      >
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Volkswagen"
                        name="Volkswagen"
                        value="yes"
                      />
                      <label class="form-check-label" for="Volkswagen"
                        >Volkswagen</label
                      >
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="Volvo"
                        name="Volvo"
                        value="yes"
                      />
                      <label class="form-check-label" for="Volvo">Volvo</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="w-100">
        <div class="venderH"></div>
        <div class="venderLogin mt-3">
          <h5>Vendor Login</h5>
          <form class="mt-3">
            <div class="mb-4 mt-3">
              <label for="Username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="Username"
                placeholder="Username"
                name="Username"
              />
            </div>
            <div class="mb-5">
              <label for="pwd" class="form-label">Password:</label>
              <input
                type="password"
                class="form-control"
                id="pwd"
                placeholder="Password"
                name="pswd"
              />
            </div>
            <div
              class="form-check mb-4 d-flex justify-content-end align-items-center"
            >
              <button type="submit" class="btn btn-primary px-4 py-2">
                Email Invite
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.venderLogin {
  border-radius: 0px 0px 5px 5px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 30px;
}

.venderH {
  border-radius: 5px 5px 0px 0px;
  background: #000;
  height: 30px;
}
</style>

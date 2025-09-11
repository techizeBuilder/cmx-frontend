<script setup>

</script>

<template>
    <div class="accordion-body">
        <div class="shoppage-section-api">
            <p class="mb-0 mt-5">Setup Quantum pay gateway and save! </p>
            <p>Request setup if you do not have an account. </p>
            <div class="api-form-section">
                <div class="row">
                    <div class="col-lg-7 col-md-7 col-sm-8 col-12">

                        <form action="">
                            <div class="form-control-api">
                                <div class="form-group">
                                    <label class="QUANTUMPAY" for="address"> </label>
                                    <!-- <input type="text" id="address" name="address" placeholder="QUANTUM PAY" required="" disabled> -->
                                    <p>QUANTUM PAY</p>
                                </div>
                                <div class="form-group">
                                    <label for="address" class="text-end"><b>API</b></label>
                                    <input type="text" id="address" name="address" required="">
                                </div>
                                <div class="form-group">
                                    <label for="address"><b>TRANSATION KEY</b></label>
                                    <input type="text" id="address" name="address" required="">
                                </div>
                                <div class="d-flex justify-content-end mt-4">
                                    <button type="button" class="btn btn-light px-5">Save</button>

                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-4 col-12 d-flex-set">
                        <div class="form-control-api">
                            <div class="btn-request">
                                <button data-bs-toggle="modal" class="btn btn-light"
                                    data-bs-target="#RequestInformation">Request
                                    Information</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="modal fade login-popup-dashtwo " id="RequestInformation">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-body">
                    <div class="section referpagesection">
                        <div class="header-Refershop">
                            <div class="header-nom">
                                <div class="silde">
                                    <div class="sliderone d-flex align-items-center justify-content-between w-100">
                                        <p class="shopnow">Reqeust Information</p>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="container ">
                            <div class="space-btm-space">
                                <h4 class="headingrefer mb-3 text-center"> QUANTUM PAY: INFORMATION REQUEST</h4>
                                <div class="row" style="align-items: center;">
                                    <div class="col-lg-6">
                                        <div class="col-same">
                                            <div class="box">
                                                <form>
                                                    <div class="input-container text-center mb-3">
                                                        <input type="text" class="form-control  text-center" id="shopID"
                                                            placeholder="  Shop ID" disabled="">
                                                    </div>
                                                    <div class="input-container mb-3">
                                                        <select id="shopName" class="form-control  text-center" required="">
                                                            <option value=""> Shop Name</option>
                                                            <option value="shop1">Shop 1</option>
                                                            <option value="shop2">Shop 2</option>
                                                            <option value="shop3">Shop 3</option>
                                                            <!-- Add more options as needed -->
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="col-same">
                                            <div class="box">
                                                <form>

                                                    <div class="input-container mb-4">
                                                        <input class="form-control" type="text" id="Contactname"
                                                            name="Contactname" placeholder="Contact Name" required="">
                                                    </div>
                                                    <div class="input-container mb-4">
                                                        <input class="form-control" type="tel" id="phoneNumber"
                                                            name="phoneNumber" placeholder="Phone Number" required="">
                                                    </div>
                                                    <div class="input-container mb-4">
                                                        <input class="form-control" type="email" id="email" name="email"
                                                            placeholder="Email Address" required="">
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="btn-btn d-flex justify-content-center gap-5">
                                            <button class="Cancel" type="button">Cancel</button>
                                            <button class="submit" type="submit">Submit</button>
                                        </div>
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
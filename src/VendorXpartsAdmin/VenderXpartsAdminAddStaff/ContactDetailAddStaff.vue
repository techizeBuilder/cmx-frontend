<script setup>

</script>
<template>
    <div class="estimatedetailsection  ">

        <div class="EmpFrame">
            <div class="d-flex justify-content-between mt-4 mb-5">
                <h5 class="mb-4 fw-bold">Contact Details</h5>
                <div class="form-check form-switch">
                    <label>Active</label>
                    <input class="form-check-input" type="checkbox" name="darkmode" value="yes" checked="">
                </div>
            </div>
            <div class="row g-5">
                <div class="col-sm-12 col-md-12 pt-5">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="text" class="form-label">First Name</label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="col-sm-6">
                            <label for="text" class="form-label">Last Name</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-sm-12">
                            <label for="Salary" class="form-label ">Employee Title</label>
                            <select class="form-select" id="Salary" name="Salary">
                                <option value="" selected="">
                                    Select Title
                                </option>
                                <!-- Add options for countries here -->
                                <option value="1">CEO
                                    (Chief Executive
                                    Officer) </option>
                                <option value="2">
                                    Owner </option>
                                <option value="2">
                                    NVP (National Vice
                                    President)
                                </option>
                                <option value="2">RVP
                                    (Regional Vice
                                    President)
                                </option>
                                <option value="2">COO
                                    (Chief Operating
                                    Officer) </option>
                                <option value="2">
                                    Director </option>
                                <option value="2">
                                    Controller
                                </option>
                                <option value="2">
                                    Administrative
                                </option>
                                <option value="2">
                                    Accountant
                                </option>
                                <option value="2">
                                    Office </option>
                                <option value="2">
                                    Shop Foreman
                                </option>
                                <option value="2">
                                    Shop Manager
                                </option>
                                <option value="2">
                                    Estimator
                                </option>
                                <option value="2">
                                    Parts </option>
                                <option value="2">
                                    Body Technician
                                </option>
                                <option value="2">
                                    Frame Technician
                                </option>
                                <option value="2">
                                    Painter </option>
                                <option value="2">
                                    Detailer
                                    Technician
                                </option>
                                <option value="2">
                                    Paint Prepper
                                </option>
                                <option value="2">
                                    Maintenance
                                    Technician
                                </option>
                                <option value="2">
                                    Parts Delivery
                                    Driver </option>
                                <option value="2">
                                    Shop Helper
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row mt-5">
                        <div class="col-sm-12">
                            <label for="text" class="form-label">Work Email</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 mt-2">
                            <label for="text" class="form-label">Cell# 1</label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="col-sm-6 mt-2">
                            <label for="text" class="form-label">Note1</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-sm-6 mt-2">
                            <label for="text" class="form-label">Telephone 2</label>
                            <input type="text" class="form-control">
                        </div>
                        <div class="col-sm-6 mt-2">
                            <label for="text" class="form-label">Note2</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>

                </div>
            </div>


        </div>
    </div>
</template>
<style scoped>
label {
    font-weight: 500;
    font-size: 13px;
}

.contactDEmp {
    min-width: 1100px
}

.WorkEs {
    border-left: 4px solid #EDEDED;
    border-right: 4px solid #EDEDED;
}

.btn-employee {
    border-radius: 3.381px;
    border: 0.66px solid #D2D4D7;
    background: rgba(0, 102, 255, 0.40);
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    color: #000000;
}

.EmpFrame {
    background: rgba(210, 212, 215, 0.20);
    padding: 20px 30px;
    min-height: 470px;
}
</style>
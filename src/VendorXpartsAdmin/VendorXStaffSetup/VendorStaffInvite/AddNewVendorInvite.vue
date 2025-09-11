<script setup>


</script>
 
<template>
    <div class="px-3 mt-4">
        
        <div class="mt-4">
          
            <div class="row px-lg-5 pt-4 pt-sm-0 ">
                <p class="mt-4" :style="{color: '#FF8100'}">Complete all of the following information:</p>
                    <h6 class="mt-4">New Vendor#: XXXXXXX</h6>
                <div class="col-sm-12 col-md-6 col-lg-5 pe-5"> 
                   
                    <div class="mt-4">
                        <p class="datexlable">Vendor Name</p>
                        <div class="customerXBox">
                            <input class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="datexlable">First name</p>
                        <div class="customerXBox">
                            <input class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="datexlable">Last name</p>
                        <div class="customerXBox">
                            <input class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="datexlable">Phone / Main</p>
                        <div class="customerXBox">
                            <input class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="datexlable">Phone / Direct</p>
                        <div class="customerXBox">
                            <input class="form-control" type="text" />
                        </div>
                    </div>

                    <div class="mt-3">
                        <p class="datexlable">Primary Email Address</p>
                        <div class="customerXBox">
                            <input class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="datexlable">Vendor website</p>
                        <div class="customerXBox">
                            <input class="form-control" type="text" />
                        </div>
                    </div>                     
                </div>

                <div class="col-sm-12 col-md-6 col-lg-5 venderLine px-5">
                    <div class="mt-5">
                        <p class="datexlable">Vendor Address </p>
                        <div class="customerXBox">
                            <input class="form-control" type="text" />
                        </div>
                    </div>
                   <div class="mt-3">
                        <p class="datexlable">Vendor City</p>
                        <div class="customerXBox">
                            <input class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="datexlable">Vendor State</p>
                        <div class="customerXBox">
                            <select class="form-select">
                                <option>Vendor State</option>
                                <option>Vendor State</option>
                                <option>Vendor State</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="datexlable">Vendor Zip Code</p>
                        <div class="customerXBox">
                            <input class="form-control" type="text" />
                        </div>
                      </div>                  
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.venderLine{
    border-left: 1px solid #000;
}
</style>
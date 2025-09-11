<script setup>

</script>
<template>
    <div class="estimatedetailsection premEmpo">
        <div class="EmpFrame mb-5">
            <p class="datexlable"><b> Permissions</b></p>

            <div class="mt-4">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" name="darkmode" value="yes" checked="">
                    <label class="form-check-label" for="mySwitch">
                        Vendor Staff</label>
                </div>
                <div class="form-check form-switch mt-4 mb-5">
                    <input class="form-check-input" type="checkbox" name="darkmode" value="yes" checked="">
                    <label class="form-check-label" for="mySwitch">
                        Vendor Admin</label>
                </div> 
            </div>  
        </div>
    </div>
</template>
<style scoped>
.premEmpo {
    max-width: 250px;
    margin: 0 auto;
}

label {
    font-weight: 500;
}

.EmpFrame {
    background: rgba(210, 212, 215, 0.20);
    padding: 20px 20px;
    
}
</style>
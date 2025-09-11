<script setup>

</script>
<template>
    <div class="estimatedetailsection loginEm">
        <div class="EmpFrame">
            <p class="mb-5"><b> Login</b></p>

            <div class="mt-5">
                <label for="text" class="form-label">User name</label>
                <input type="text" class="form-control">
            </div>
            <div class="mt-4">
                <label for="text" class="form-label">Password</label>
                <input type="text" class="form-control">
            </div>
            <div class="d-flex justify-content-between mt-4 mb-5">

                <button class="btn btn-employee">Send Email</button>
            </div>
            <div class="d-flex justify-content-end mt-5">

                <button class="btn btn-light">Reset Password</button>
            </div>

        </div>
    </div>
</template>
<style scoped>
.loginEm {
    min-width: 260px;
}

label {
    font-weight: 500;
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
<script setup>

</script>
<template>
    <div class="estimatedetailsection">
        <div class="row">
            <div class="col-sm-12 col-lg-3 ">
                <form action="#" class=" mb-1 px-xl-4">
                    <div class="d-flex flex-column flex-lg-column flex-sm-row gap-4">
                        <select class="form-select w-100">
                            <option selected disabled>Select Category</option>
                            <option>Customer</option>
                            <option>Insurance</option>
                            <option>Other</option>
                            <option>Parts</option>
                            <option>Payments</option>
                            <option>Repairs</option>
                            <option>Supplement</option>
                        </select>

                        <select class="form-select w-100">
                            <option selected disabled>Select Quick Comment</option>
                            <option>Customer</option>
                            <option>Insurance</option>
                            <option>Other</option>
                            <option>Parts</option>
                            <option>Payments</option>
                            <option>Repairs</option>
                            <option>Supplement</option>
                        </select>
                    </div>

                </form>
                <div class="d-flex align-items-end gap-4  justify-content-center mt-4">
                    <div class="d-flex align-items-end gap-4  justify-content-end">
                        <button type="button" class="btn btn-light"> <i class="fa-regular fa-floppy-disk"></i> Save
                        </button>
                        <button type="button" class="btn btn-light" v-on:click="seen = false">Cancel </button>
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
                                    <textarea class="form-control text-start" rows="5" id="comment" name="text"
                                        placeholder="Enter New Comment">
                                    </textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    </div>
</template>
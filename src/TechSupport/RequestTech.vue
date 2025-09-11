<script setup>
</script>
<template>
    <div class="mt-2 mt-sm-4 px-2 px-sm-5">
        <div>
            <label for="">Subject</label>
            <input type="text" class="form-control" />
        </div>
        <div class="d-flex align-items-center justify-content-start gap-4 my-2 my-sm-4 ">
            <select class="form-select w-25">
                <option>Supplements 1</option>
                <option>Supplements 2</option>
                <option>Supplements 3</option>
                <option>Supplements 4</option>
            </select>
            <button type="button" class="btn btn-light px-4">Upload Document</button>
        </div>
        <div>
            <label for="">Comments</label>
            <textarea class="form-control" rows="8">

            </textarea>
        </div>
        <div class="d-flex justify-content-between mt-4">
            <p>Attachment Name</p>
            <button type="button" class="btn btn-light px-4">Submit Request</button>
        </div>
    </div>
</template>
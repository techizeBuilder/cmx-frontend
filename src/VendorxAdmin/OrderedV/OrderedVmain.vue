<script setup>

const props = defineProps(['title']) 
</script>

<template>
    <div class="accordion-body">

        <div class="Venderxadmin">
            <div class='table-responsive'>
                <table class="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Shop Name</th>
                            <th>FolderX</th>
                            <th>Total Parts</th>
                            <th :style="{ background: '#ccdff0' }">Ordered</th>
                            <th>Year</th>
                            <th>Make</th>
                            <th>Modal</th>
                            <th>VIN</th>
                            <th>VENDOR STAFF</th>
                            <th>DATE ORDERED</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>&nbsp;
                            </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>

                        </tr>


                    </tbody>
                </table>
            </div>
        </div>

        <div class="navigation-sectionsame">
            <div class="box">
                <select class="form-select">
                    <option selected>25</option>
                    <option value="1">50</option>
                    <option value="2">75</option>
                    <option value="3">100</option>
                </select>
            </div>
            <div class="boxsg">
                <div class="sect-box-arrow">
                    <i class="fa-solid fa-angle-left"></i>
                    <div class="box-count">01</div>
                    <i class="fa-solid fa-angle-right"></i>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.Venderxadmin table {
    font-size: 11px;
}
.Venderxadmin table tbody tr td{
    padding: 8px;
}
</style>
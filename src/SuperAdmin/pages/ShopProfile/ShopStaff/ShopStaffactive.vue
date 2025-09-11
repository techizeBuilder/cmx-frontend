<script setup>
</script>
<template>
    <div class="supTableone mb-5">
        <div class="mainSearch my-5">
            <div class="input-container">
                <div class="input-group flex-nowrap">
                    <input class="form-control border" type="search" id="example-search-input" placeholder="Search" />
                    <span class="input-group-append">
                        <button class="btn btn-outline-secondary bg-black border-start-0 border-bottom-0 border"
                            type="button">
                            <i class="fa fa-search"></i>
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table ">
                <thead>
                    <tr>
                        <th class="text-center">Staff ID</th>
                        <th class="text-center">Shop Phone</th>
                        <th class="text-center">Staff Status</th>
                        <th class="text-center">Shop Name</th>
                        <th class="text-center">Staff Email</th>
                        <th class="text-center">Title</th>
                        <th class="text-center">State</th> 
                    </tr>
          
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center align-middle text-decoration-underline">#####</td>
                        <td class="text-center align-middle">555-555-5555</td>
                        <td class="text-center align-middle">
                            <button class="btn btn-shopact">Active</button>
                        </td>
                        <td class="text-center align-middle text-decoration-underline">Americans Collision LLC</td>
                        <td class="text-center align-middle ">-</td>
                        <td class="text-center align-middle">-</td>
                        <td class="text-center align-middle">-</td>                      
                    </tr>
                    <tr>
                        <td class="text-center align-middle text-decoration-underline">#####</td>
                        <td class="text-center align-middle">555-555-5555</td>
                        <td class="text-center align-middle">
                            <button class="btn btn-shopact">Active</button>
                        </td>
                        <td class="text-center align-middle text-decoration-underline">Americans Collision LLC</td>
                        <td class="text-center align-middle ">-</td>
                        <td class="text-center align-middle">-</td>
                        <td class="text-center align-middle">-</td>                      
                    </tr>
                    <tr>
                        <td class="text-center align-middle text-decoration-underline">#####</td>
                        <td class="text-center align-middle">555-555-5555</td>
                        <td class="text-center align-middle">
                            <button class="btn btn-shopact">Active</button>
                        </td>
                        <td class="text-center align-middle text-decoration-underline">Americans Collision LLC</td>
                        <td class="text-center align-middle ">-</td>
                        <td class="text-center align-middle">-</td>
                        <td class="text-center align-middle">-</td>                      
                    </tr>
                    <tr>
                        <td class="text-center align-middle text-decoration-underline">#####</td>
                        <td class="text-center align-middle">555-555-5555</td>
                        <td class="text-center align-middle">
                            <button class="btn btn-shopact">Active</button>
                        </td>
                        <td class="text-center align-middle text-decoration-underline">Americans Collision LLC</td>
                        <td class="text-center align-middle ">-</td>
                        <td class="text-center align-middle">-</td>
                        <td class="text-center align-middle">-</td>                      
                    </tr>
                    <tr>
                        <td class="text-center align-middle text-decoration-underline">#####</td>
                        <td class="text-center align-middle">555-555-5555</td>
                        <td class="text-center align-middle">
                            <button class="btn btn-shopact">Active</button>
                        </td>
                        <td class="text-center align-middle text-decoration-underline">Americans Collision LLC</td>
                        <td class="text-center align-middle ">-</td>
                        <td class="text-center align-middle">-</td>
                        <td class="text-center align-middle">-</td>                      
                    </tr>
                    <tr>
                        <td class="text-center align-middle text-decoration-underline">#####</td>
                        <td class="text-center align-middle">555-555-5555</td>
                        <td class="text-center align-middle">
                            <button class="btn btn-shopact">Active</button>
                        </td>
                        <td class="text-center align-middle text-decoration-underline">Americans Collision LLC</td>
                        <td class="text-center align-middle ">-</td>
                        <td class="text-center align-middle">-</td>
                        <td class="text-center align-middle">-</td>                      
                    </tr>
                    
                </tbody>
            </table>
        </div>
        <div class="navigation-shuperadmin">
            <div class="box">
                <select class="form-select form-select-superdash">
                    <option selected>25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div class="navigationBox">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#"> <i class="fa-solid fa-angle-left"></i></a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item active"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">...</a></li>
                    <li class="page-item"><a class="page-link" href="#">8</a></li>
                    <li class="page-item"><a class="page-link" href="#">9</a></li>
                    <li class="page-item"><a class="page-link" href="#">10</a></li>
                    <li class="page-item"><a class="page-link" href="#"><i class="fa-solid fa-angle-right"></i></a></li>
                </ul>
                <small class="text-white text-right d-flex justify-content-end my-2">Showing 1 to 10 of 97
                    results</small>
            </div>
        </div>
    </div>
</template>
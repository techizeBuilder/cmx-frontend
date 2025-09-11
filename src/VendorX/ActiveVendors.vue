<script setup>
import ViewBrandIcons from './Icons/ViewBrandIcons.png'
import ViewProIcons from './Icons/ViewProIcons.png'
import LinkIcons from './Icons/LinkIcons.png'
const Dropitems = ['Acura', 'Audi', 'BMW', 'Chrysler', 'Ford', 'GM', 'Honda', 'Hyundai', 'Infiniti', 'Isuzu', 'Jaguar', 'Kia',
    'LandRover', 'Lexus', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Porsche', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo',]
// {
//     id: '1',
//     name: 'Acura'
// },
// {
//     id: '1',
//     name: 'Acura'
// },
// {
//     id: '1',
//     name: 'Acura'
// },
// {
//     id: '1',
//     name: 'Acura'
// },


</script>
<template>
    <div class="d-flex gap-4 mt-4">
        <div><label for="">Search </label><input type="text" class="form-control"></div>
        <div><label for="">Filter by Type </label><input type="text" class="form-control"></div>
        <div><label for="">Filter by Brand </label><input type="text" class="form-control"></div>
    </div>
    <div class="staffsectiontableresponsive mt-4">
        <div class="table-responsive">
            <table>
                <thead>
                    <tr class="text-center">
                        <th class="text-center">Vendor #</th>
                        <th class="text-center" :style="{ minWidth: '250px' }">Vendor Name</th>
                        <th class="text-center">First Name</th>
                        <th class="text-center">Phone Main</th>
                        <th class="text-center">Phone Direct</th>
                        <th class="text-center">Email</th>
                        <th class="text-center">Website</th>
                        <th class="text-center">Vendor Type</th>
                        <th class="text-center">View Brands</th>
                        <th class="text-center">View Profile</th>
                        <th class="text-center">Linked?</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Add table rows (data) here -->
                    <!-- Example: -->
                    <tr class="text-center">
                        <td class="text-center">V123456</td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center">
                            <a href="javascript:void(0)" class="dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <img :src="ViewBrandIcons" alt="ViewBrandIcons" />
                            </a>
                            <ul class="dropdown-menu" :style="{ maxHeight: '250px', overflow: 'auto' }">
                                <li v-for="item in Dropitems"><a class="dropdown-item" href="#">{{ item }}</a></li>
                            </ul>
                        </td>
                        <td class="text-center">
                            <router-link to='/vendorlink'>
                                <img :src="ViewProIcons" alt="ViewProIcons" />
                            </router-link>
                        </td>
                        <td class="text-center">
                            <router-link to='/vendorlink'>
                                <img :src="LinkIcons" alt="LinkIcons" />
                            </router-link>
                        </td>
                        

                    </tr>
                    <!-- Add more rows as needed -->
                    <tr class="text-center">
                        <td class="text-center">V123456</td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center"> </td>
                        <td class="text-center">
                            <a href="javascript:void(0)" class="dropdown-toggle" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <img :src="ViewBrandIcons" alt="ViewBrandIcons" />
                            </a>
                            <ul class="dropdown-menu" :style="{ maxHeight: '250px', overflow: 'auto' }">
                                <li v-for="item in Dropitems"><a class="dropdown-item" href="#">{{ item }}</a></li>
                            </ul>
                        </td>
                        <td class="text-center">
                            <router-link to='/vendorsetup'>
                                <img :src="ViewProIcons" alt="ViewProIcons" />
                            </router-link>
                        </td>
                        <td class="text-center">
                            <router-link to='/vendorlink'>
                                <img :src="LinkIcons" alt="LinkIcons" />
                            </router-link>
                        </td>

                    </tr>
                    <!-- Add more rows as needed -->
                </tbody>
            </table>
        </div>
    </div>
</template>
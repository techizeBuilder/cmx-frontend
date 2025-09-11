
<script setup>
</script>

<template>
  <div class="staffpermissionsection">
    <div class="row">
      <div class="col-lg-12">
        <div class="staffsectiontableresponsive">
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }"> <i class="fa-solid fa-ellipsis"></i>
                  </th>
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">Preview</th>
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">FolderX</th>                   
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">Action Date</th>                   
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">Year</th>
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">Make</th>
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">Model</th>
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">VIN</th>
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">Part #</th>
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">Part Name</th>
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">Inventory Date</th>  
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">Vendor</th>  
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">MSRP</th>  
                  <th class="text-center" :style="{ backgroundColor: '#D2D4D7' }">Cost</th>  
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td class="text-center">
                    <div class="btn-group dropend">
                      <a href="javascript:void(0)" class="dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fa-solid fa-ellipsis"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Update</a></li>
                        <li><a class="dropdown-item" href="#">Pending</a></li>
                      </ul>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                 
                 
                </tr>
                <tr>
                  <td class="text-center">
                    <div class="btn-group dropend">
                      <a href="javascript:void(0)" class="dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fa-solid fa-ellipsis"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Update</a></li>
                        <li><a class="dropdown-item" href="#">Pending</a></li>
                      </ul>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                 
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="navigation-sectionsame">
    <div class="box">
      <select class="form-select">
        <option selected>1-25</option>
        <option value="1">25-50</option>
        <option value="2">50-75</option>
        <option value="3">75-100</option>
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
</template>
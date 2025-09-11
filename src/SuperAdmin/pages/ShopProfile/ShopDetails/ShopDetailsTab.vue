<script setup>

</script>
<template>
    <div class="supadmshoptabs"> 
        <div class="row">
            <div class="col-lg-6 col-md-12 col-12">
                <form action="#" method="post">
               
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-12 col-rowset">
                                <div class="form-group  ">
                                    <label for="Vendorname">Shop Name:</label>
                                    <input type="text" id="Vendorname" name="Vendorname" required>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 col-12 col-rowset">
                                <div class="form-group">
                                    <label for="address">Shop Address:</label>
                                    <input type="text" id="address" name="address" required>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-4 col-12 col-rowset">
                                <div class="form-group">
                                    <label for="city">City:</label>
                                    <input type="text" id="city" name="city" required>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-4 col-12 col-rowset">
                                <div class="form-group">
                                    <label for="state">State:</label>
                                    <input type="text" id="state" name="state" required>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-4 col-12 col-rowset">
                                <div class="form-group">
                                    <label for="zipcode">Zip
                                        Code:</label>
                                    <input type="text" id="zipcode" name="zipcode" required>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                                <div class="form-group">
                                    <label for="country">Country:</label>
                                    <select id="country" name="country" required>
                                        <option value="" selected>Select
                                            your country
                                        </option>
                                        <!-- Add options for countries here -->
                                        <option value="USA">
                                            United States
                                        </option>
                                        <option value="UK">
                                            United Kingdom
                                        </option>
                                        <!-- Add more countries as needed -->
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                                <div class="form-group">
                                    <label for="dateformat">Date
                                        Format:</label>
                                    <input type="date" id="dateformat" name="dateformat" required>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                                <div class="form-group">
                                    <label for="timezone">Time
                                        Zone:</label>
                                    <select id="timezone" name="timezone" required>
                                        <option value="" selected> Select Time Zone
                                        </option>
                                        <!-- Add options for countries here -->
                                        <option value="America/New_York">
                                            (UTC-05:00)
                                            Eastern
                                        </option>
                                        <option value="America/Chicago">
                                            (UTC-06:00)
                                            Central
                                        </option>
                                        <option value="America/Denver">
                                            (UTC-07:00)
                                            Mountain
                                        </option>
                                        <option value="America/Phoenix">
                                            (UTC-07:00)
                                            Mountain - AZ
                                        </option>
                                        <option value="America/Los_Angeles">
                                            (UTC-08:00)
                                            Pacific
                                        </option>
                                        <option value="America/Anchorage">
                                            (UTC-09:00)
                                            Alaskan
                                        </option>
                                        <option value="Pacific/Honolulu">
                                            (UTC-10:00)
                                            Hawaiian
                                        </option>
                                        <!-- Add more countries as needed -->
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                                <div class="form-group">
                                    <label for="timeformat">Time
                                        Format:</label>
                                    <select id="timeformat" name="timeformat" required>
                                        <option value="" selected> Select Time Format
                                        </option>
                                        <!-- Add options for countries here -->
                                        <option value="USA">
                                            United States
                                        </option>
                                        <option value="UK">
                                            United Kingdom
                                        </option>
                                        <!-- Add more countries as needed -->
                                    </select>
                                </div>
                            </div>
                        </div>
                 
                </form>
            </div>
            <div class="col-lg-6 col-md-12 col-12">
                <form action="#" method="post">
         
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                                <div class="form-group">
                                    <label for="dowebsite"> Do You Have a
                                        Website</label>
                                    <select id="dowebsite" name="dowebsite" required>
                                        <option value="" disabled selected> Select Option
                                        </option>
                                        <!-- Add options for countries here -->
                                        <option value="Yes">
                                            Yes
                                        </option>
                                        <option value="No">
                                            No
                                        </option>
                                        <!-- Add more countries as needed -->
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 col-12 col-rowset">
                                <div class="form-group  ">
                                    <label for="website">Website</label>
                                    <input type="text" id="website" name="website" required>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 col-12 col-rowset">
                                <div class="form-group">
                                    <label for="Contactfullname">Contact
                                        Full
                                        Name</label>
                                    <input type="text" id="Contactfullname" name="Contactfullname" required>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                                <div class="form-group">
                                    <label for="Phone">Shop Logo</label>
                                    <div class="upload-files-container">
                                        <div class="drag-file-area">
                                            <label class="label-upload-image"  >
                                                <div class="div-upload">
                                                    <input type="file" class="default-file-input" />
                                                    <span class="material-icons-outlined upload-icon">
                                                        file_upload
                                                    </span>
                                                    <br>
                                                    <span class="browse-files-text">Click
                                                        To
                                                        Update</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-12 col-rowset">
                                <div class="form-group  ">
                                    <label for="Phone">Phone
                                        1</label>
                                    <input type="tel" id="Phone" name="Phone" placeholder="000-000-000" required>
                                </div>
                                <div class="form-group  ">
                                    <label for="Phone">Phone
                                        2</label>
                                    <input type="tel" id="Phone" name="Phone" placeholder="000-000-000" required>
                                </div>
                                <div class="form-group  ">
                                    <label for="Fax">Fax</label>
                                    <input type="text" id="Fax" name="Fax" placeholder="000-000-000" required>
                                </div>
                            </div>
                        </div>
                   
                </form>
            </div>
        </div>
    </div>
</template>
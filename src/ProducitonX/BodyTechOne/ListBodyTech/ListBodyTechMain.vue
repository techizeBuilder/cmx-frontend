<script setup>
import Dropdown from "../../Icons/Dropdown.png";
import Action from "../../Icons/Action.png";

import Uplaod from "../../Icons/Uplaod.png";
import Photor from "../../Icons/Photor.png";
import FileAx from "../../Icons/FileAx.png";
import printAX from "../../Icons/printAX.png";
import ChatAx from "../../Icons/ChatAx.png";
import FIcon from "../../Icons/FIcon.png";
import flexIcon from "../../Icons/flexIcon.png";
// import DropdownAX from '../../../Icons/DropdownAX.png'

import cmx from "../../Icons/cmx.jpeg";
import cmx01 from "../../Icons/cmx01.jpeg";
import cmx02 from "../../Icons/cmx02.jpeg";

import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import { ref } from "vue";
const isOpenPhoto = ref(false);
const isOpenTimeline = ref(false);

//import 'datatables.net-colReorder';
DataTable.use(DataTablesCore);
const options = {
  colReorder: true,
};
</script>

<template>
  <div class="staffpermissionsection">
    <div class="row">
      <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#TimelineModul">
                Open modal
            </button> -->
      <div class="col-lg-12">
        <div class="staffsectiontableresponsive ListBodyTech">
          <div class="table-responsive">
            <DataTable
              :options="options"
              class="display"
              width="100%"
              :style="{ overflow: 'auto' }"
            >
              <thead>
                <tr>
                  <th class="text-center"></th>
                  <th class="text-center">Move</th>
                  <th class="text-center">Action</th>
                  <th class="text-center">FolderX#</th>
                  <th class="text-center">Status</th>
                  <th class="text-center">
                    <img :src="flexIcon" alt="flexIcon" />
                  </th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                  <th class="text-center"></th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr class="text-center">
                  <td class="text-center">1</td>
                  <td class="text-center">
                    <img :src="Dropdown" alt="Dropdown" />
                  </td>

                  <td class="text-center">
                    <div class="btn-group">
                      <a
                        href="javascript:void(0)"
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img :src="Action" alt="Action" />
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="Uplaod" alt="Uplaod" />
                            Open FoldX</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#PhotoViewModul"
                          >
                            <img :src="Photor" alt="Photor" />
                            View Photos</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FileAx" alt="FileAx" />
                            View Estimate</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="printAX" alt="printAX" />Print File</a
                          >
                        </li>

                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#TimelineModul"
                          >
                            <img :src="ChatAx" alt="ChatAx" />
                            Timeline</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FIcon" alt="FIcon" />
                            Flag Tech</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="flexIcon" alt="flexIcon" />
                            Express Repair</a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center">
                    <img :src="flexIcon" alt="flexIcon" />
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                </tr>
                <tr class="text-center">
                  <td class="text-center">2</td>
                  <td class="text-center">
                    <img :src="Dropdown" alt="Dropdown" />
                  </td>

                  <td class="text-center">
                    <div class="btn-group">
                      <a
                        href="javascript:void(0)"
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img :src="Action" alt="Action" />
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="Uplaod" alt="Uplaod" />
                            Open FoldX</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#PhotoViewModul"
                          >
                            <img :src="Photor" alt="Photor" />
                            View Photos</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FileAx" alt="FileAx" />
                            View Estimate</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="printAX" alt="printAX" />Print File</a
                          >
                        </li>

                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#TimelineModul"
                          >
                            <img :src="ChatAx" alt="ChatAx" />
                            Timeline</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FIcon" alt="FIcon" />
                            Flag Tech</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="flexIcon" alt="flexIcon" />
                            Express Repair</a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center">
                    <img :src="flexIcon" alt="flexIcon" />
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                </tr>
                <tr class="text-center">
                  <td class="text-center">3</td>
                  <td class="text-center">
                    <img :src="Dropdown" alt="Dropdown" />
                  </td>

                  <td class="text-center">
                    <div class="btn-group">
                      <a
                        href="javascript:void(0)"
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img :src="Action" alt="Action" />
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="Uplaod" alt="Uplaod" />
                            Open FoldX</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#PhotoViewModul"
                          >
                            <img :src="Photor" alt="Photor" />
                            View Photos</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FileAx" alt="FileAx" />
                            View Estimate</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="printAX" alt="printAX" />Print File</a
                          >
                        </li>

                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#TimelineModul"
                          >
                            <img :src="ChatAx" alt="ChatAx" />
                            Timeline</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FIcon" alt="FIcon" />
                            Flag Tech</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="flexIcon" alt="flexIcon" />
                            Express Repair</a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center">
                    <img :src="flexIcon" alt="flexIcon" />
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                </tr>
                <tr class="text-center">
                  <td class="text-center">4</td>
                  <td class="text-center">
                    <img :src="Dropdown" alt="Dropdown" />
                  </td>

                  <td class="text-center">
                    <div class="btn-group">
                      <a
                        href="javascript:void(0)"
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img :src="Action" alt="Action" />
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="Uplaod" alt="Uplaod" />
                            Open FoldX</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#PhotoViewModul"
                          >
                            <img :src="Photor" alt="Photor" />
                            View Photos</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FileAx" alt="FileAx" />
                            View Estimate</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="printAX" alt="printAX" />Print File</a
                          >
                        </li>

                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#TimelineModul"
                          >
                            <img :src="ChatAx" alt="ChatAx" />
                            Timeline</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FIcon" alt="FIcon" />
                            Flag Tech</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="flexIcon" alt="flexIcon" />
                            Express Repair</a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center">
                    <img :src="flexIcon" alt="flexIcon" />
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                </tr>
                <tr class="text-center">
                  <td class="text-center">5</td>
                  <td class="text-center">
                    <img :src="Dropdown" alt="Dropdown" />
                  </td>

                  <td class="text-center">
                    <div class="btn-group">
                      <a
                        href="javascript:void(0)"
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img :src="Action" alt="Action" />
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="Uplaod" alt="Uplaod" />
                            Open FoldX</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#PhotoViewModul"
                          >
                            <img :src="Photor" alt="Photor" />
                            View Photos</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FileAx" alt="FileAx" />
                            View Estimate</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="printAX" alt="printAX" />Print File</a
                          >
                        </li>

                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#TimelineModul"
                          >
                            <img :src="ChatAx" alt="ChatAx" />
                            Timeline</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FIcon" alt="FIcon" />
                            Flag Tech</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="flexIcon" alt="flexIcon" />
                            Express Repair</a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center">
                    <img :src="flexIcon" alt="flexIcon" />
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                </tr>
                <tr class="text-center">
                  <td class="text-center">6</td>
                  <td class="text-center">
                    <img :src="Dropdown" alt="Dropdown" />
                  </td>

                  <td class="text-center">
                    <div class="btn-group">
                      <a
                        href="javascript:void(0)"
                        class="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img :src="Action" alt="Action" />
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="Uplaod" alt="Uplaod" />
                            Open FoldX</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#PhotoViewModul"
                          >
                            <img :src="Photor" alt="Photor" />
                            View Photos</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FileAx" alt="FileAx" />
                            View Estimate</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="printAX" alt="printAX" />Print File</a
                          >
                        </li>

                        <li>
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#TimelineModul"
                          >
                            <img :src="ChatAx" alt="ChatAx" />
                            Timeline</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="FIcon" alt="FIcon" />
                            Flag Tech</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            <img :src="flexIcon" alt="flexIcon" />
                            Express Repair</a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center">
                    <img :src="flexIcon" alt="flexIcon" />
                  </td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                </tr>
              </tbody>
            </DataTable>
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
  <div class="modal" id="TimelineModul">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-0">
        <!-- Modal body -->
        <div class="modal-body p-0">
          <div class="timeLineBox">
            <div class="card-body p-0">
              <div class="card">
                <div class="timeLineBoxtop">
                  <p class="m-0">RO Timeline</p>
                  <div class="cursor-pointer" data-bs-dismiss="modal">
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                </div>

                <div class="pTableFlow p-3">
                  <table class="table table-bordered table-sm mt-1mb-1">
                    <tbody>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Arrived
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Mechanical
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Estimate Appvd
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Paint
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Parts Ordered
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Sublet
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Parts Arrived
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Reassembly
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Repair Plan
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            ADAS
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Supp. Hold
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Detail
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Supp. Approved
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Ready for Pickup
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Body
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Delivered
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Frame
                          </div>
                        </td>
                        <td class="text-center TimeAZ">
                          <div class="TimeAZ">
                            <span class="DotA"></span>
                            Paid in Full
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-light my-4 px-4">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" id="PhotoViewModul">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-0">
        <!-- Modal body -->
        <div class="modal-body p-0">
          <div class="timeLineBox">
            <div class="card-body p-0">
              <div class="card mt-0">
                <div class="timeLineBoxtop">
                  <p class="m-0">Photo Preview</p>
                  <div class="cursor-pointer" data-bs-dismiss="modal">
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                </div>

                <div class="p-3">
                  <div
                    id="PhotoTimew"
                    class="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div class="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#PhotoTimew"
                        data-bs-slide-to="0"
                        class="active"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#PhotoTimew"
                        data-bs-slide-to="1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#PhotoTimew"
                        data-bs-slide-to="2"
                      ></button>
                    </div>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img
                          :src="cmx"
                          alt="Los Angeles"
                          class="img-fluid"
                          :style="{ borderRadius: '5px' }"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          :src="cmx01"
                          alt="Los Angeles"
                          class="img-fluid"
                          :style="{ borderRadius: '5px' }"
                        />
                      </div>
                      <div class="carousel-item">
                        <img
                          :src="cmx02"
                          alt="Los Angeles"
                          class="img-fluid"
                          :style="{ borderRadius: '5px' }"
                        />
                      </div>
                    </div>
                    <button
                      class="carousel-control-prev"
                      type="button"
                      data-bs-target="#PhotoTimew"
                      data-bs-slide="prev"
                    >
                      <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button
                      class="carousel-control-next"
                      type="button"
                      data-bs-target="#PhotoTimew"
                      data-bs-slide="next"
                    >
                      <span class="carousel-control-next-icon"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ListBodyTech a.dropdown-item img {
  margin-right: 6px;
  width: 24px;
  display: inline-block;
}

/* timeLineBoxtop */
.timeLineBoxtop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #d9d9d9;
}

.TimeAZ {
  display: flex;
  justify-content: start;
  gap: 11px;
  align-items: center;
  padding: 3px 3px;
  text-wrap: nowrap;
}

.DotA {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  box-shadow: 0px 4.258px 4.258px rgba(0, 0, 0, 0.25);
  display: inline-block;
}

p.NumTos.m-0 {
  width: 26px;
  height: 20px;
  background-color: #eeeeee;
  text-align: center;
  border-radius: 4px;
  vertical-align: middle;
  font-size: 13px;
  font-weight: 600;
}
ul.dropdown-menu.show {
  filter: drop-shadow(rgba(0, 0, 0, 0.32) 0px 2px 8px);
}
ul.dropdown-menu.show:before {
  content: "";
  display: block;
  position: absolute;
  top: 0px;
  left: 14px;
  width: 10px;
  height: 10px;
  background-color: rgb(255, 255, 255);
  transform: translateY(-50%) rotate(45deg);
  z-index: 0;
}
a.dropdown-toggle {
  border: 1px solid transparent;
  border-radius: 5px;
}
a.dropdown-toggle.show {
  border: 1px solid #9e9e9e;
  border-radius: 5px;
}
.dropdown-toggle::after {
  display: none;
}
</style>

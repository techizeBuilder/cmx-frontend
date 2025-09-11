<script setup>
import SearchPopup from '@/CMXDashboard/SearchPopup.vue';
import printAXIcon from "../../Icons/printAX.png";
import UploadIcon from "../../Icons/Uplaod.png";
import CalendarIcon from "../../Icons/calenderIcons.png";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const payload = ref({});

</script>

<template>
	<div class="px-4">
		<div class="mainhead pb-2 mt-3">
			<div class="d-flex align-items-center gap-3 justify-content-between">
				<router-link to="/">Estimate Appointment</router-link>
			</div>
		</div>

		<div
			class="d-flex justify-content-end gap-4 mt-3"
			style="width: 90%;"
		>
			<button class="btn btn-light px-5">Edit</button>
			<button
				class="btn btn-light px-5"
				@click="router.back()"
			>
				Back
			</button>
		</div>

		<div class="sectionaccomadation mt-4">
			<ul class="link-section">

				<li class="li-drop">
					<div
						class="accordion accordion-flush"
						id="accordionesappo"
					>
						<div class="accordion-item">
							<div class="pages d-flex align-items-center">
								<div
									class="accordion-button collapsed folderXAccor"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#flush-appointment"
									aria-expanded="true"
								>
									<div class="accomdationset-head">
										<h3>Estimate Appointment</h3>
									</div>
								</div>
							</div>
							<div
								id="flush-appointment"
								class="accordion-collapse collapse show"
								data-bs-parent="#accordionesappo"
							>
								<div class="shoppage-section">
									<div class="scrool-delevry">
										<ul class="nav nav-nav nav-tabs">
											<li class="nav-item">
												<a
													class="nav-link show active"
													data-bs-toggle="tab"
													href="#estimate-appointment"
												>Estimate Appointment</a>
											</li>
											<li class="nav-item">
												<a
													class="nav-link"
													data-bs-toggle="tab"
													href="#comments"
												>Comments</a>
											</li>
											<li class="nav-item">
												<a
													class="nav-link"
													data-bs-toggle="tab"
													href="#welcome-form"
												>Welcome Form</a>
											</li>
											<li class="nav-item">
												<a
													class="nav-link"
													data-bs-toggle="tab"
													href="#chatlinx"
												>Chatlinx</a>
											</li>
											<li class="nav-item">
												<a
													class="nav-link"
													data-bs-toggle="tab"
													href="#follow-up"
												>Follow-Up</a>
											</li>
										</ul>
									</div>
									<div class="select-option-first">
										<div class="tab-content">
											<div
												class="tab-pane show active"
												id="estimate-appointment"
											>
												<div class="row pt-sm-0 pt-4 mt-5 cutsomerRow">
													<div
														class="col-sm-12 col-md-4 col-lg-3 cutsomerCol px-0">
														<div class="row cutsomerRow">
															<div class="col-12">
																<div
																	class="d-flex justify-content-end border-b pr-1 py-3 gap-4"
																>
																	<h6>Welcome Form</h6>
																	<a type="button">
																		<img
																			:src="printAXIcon"
																			alt="Print-AX Icon"
																			:style="{ width: '22px' }"
																		/>
																	</a>
																</div>
															</div>
															<div class="col-12">
																<div
																	class="d-flex flex-column align-items-end border-b py-4 pr-1"
																>
																	<div class="d-flex align-items-center gap-4">
																		<p class="datexlable mb-0">Appointment Arrived
																		</p>
																		<div class="customerXBox">
																			<input
																				class="form-check-input"
																				type="checkbox"
																				style="width: 25px; height: 25px;"
																			/>
																		</div>
																	</div>
																	<div class="d-flex align-items-center gap-4">
																		<p class="datexlable mb-0">Chatlinx Enrolled
																		</p>
																		<div class="customerXBox">
																			<input
																				class="form-check-input"
																				type="checkbox"
																				style="width: 25px; height: 25px;"
																			/>
																		</div>
																	</div>
																	<div class="d-flex align-items-center gap-4">
																		<p class="datexlable mb-0">Appointment
																			Cancelled</p>
																		<div class="customerXBox">
																			<input
																				class="form-check-input"
																				type="checkbox"
																				style="width: 25px; height: 25px;"
																			/>
																		</div>
																	</div>
																	<div class="d-flex align-items-center gap-4">
																		<p class="datexlable mb-0">Appointment Hold</p>
																		<div class="customerXBox">
																			<input
																				class="form-check-input"
																				type="checkbox"
																				style="width: 25px; height: 25px;"
																			/>
																		</div>
																	</div>
																</div>
															</div>
															<div class="col-12">
																<div class="border-b py-4 pr-1">
																	<div
																		class="d-flex align-items-center justify-content-around"
																	>
																		<SearchPopup
																			width="30px"
																			:options="[
																				'Customer ID',
																				'Estimate ID',
																				'RO #',
																				'First Name',
																				'Last Name',
																				'Company',
																				'Customer Phone',
																			]"
																			:optionsSecond="[
																				'Last 6 of VIN',
																				'Year, Make or Model',
																				'Claim#',
																				'Insurance',
																				'Email',
																				'Vehicle',
																			]"
																		/>
																		<button class="btn btn-light">
																			Assign ID's
																		</button>
																		<a type="button">
																			<i class="fa-solid fa-link"></i>
																		</a>
																	</div>
																	<div class="mt-3">
																		<p
																			class="datexlable"
																			style="margin-left: 4rem"
																		>
																			Customer #
																		</p>
																		<div
																			class="d-flex align-items-center justify-content-center gap-2"
																		>
																			<i
																				class="fa-solid fa-link"
																				style="border-left: thin;"
																			></i>
																			<div
																				class="d-flex align-items-center"
																				style="position: relative;"
																			>
																				<input
																					class="form-control"
																					type="text"
																				/>
																				<img
																					:src="UploadIcon"
																					alt="Upload"
																					class="my-icon"
																				/>
																			</div>
																		</div>
																	</div>
																	<div class="mt-3">
																		<p
																			class="datexlable"
																			style="margin-left: 4rem"
																		>
																			Estimate Profile #
																		</p>
																		<div
																			class="d-flex align-items-center justify-content-center gap-2"
																		>
																			<i
																				class="fa-solid fa-link"
																				style="border-left: thin;"
																			></i>
																			<div
																				class="d-flex align-items-center"
																				style="position: relative;"
																			>
																				<input
																					class="form-control"
																					type="text"
																				/>
																				<img
																					:src="UploadIcon"
																					alt="Upload"
																					class="my-icon"
																				/>
																			</div>
																		</div>
																	</div>
																	<div class="mt-3">
																		<p
																			class="datexlable"
																			style="margin-left: 4rem"
																		>
																			RO #
																		</p>
																		<div
																			class="d-flex align-items-center justify-content-center gap-2"
																		>
																			<i
																				class="fa-solid fa-link"
																				style="border-left: thin;"
																			></i>
																			<div
																				class="d-flex align-items-center"
																				style="position: relative;"
																			>
																				<input
																					class="form-control"
																					type="text"
																				/>
																				<img
																					:src="UploadIcon"
																					alt="Upload"
																					class="my-icon"
																				/>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="col-12 d-flex justify-content-center">
																<button
																	class="btn w-100 mt-4"
																	style="margin-inline: 1.7rem; padding-block: 0.6rem; background: #FF8080;"
																>
																	Cancel Appointment
																</button>
															</div>
														</div>
													</div>
													<div class="col-sm-12 col-md-8 col-lg-9 border-l mt-2">
														<div
															class="row border-b px-4"
															style="padding-bottom: 52px"
														>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Appointment Type</p>
																<div class="customerXBox">
																	<select
																		class="form-select mb-2"
																		aria-label="small select example"
																		v-model="payload.appointmentType"
																	>
																		<option value="1">Option 1</option>
																		<option value="2">Option 2</option>
																	</select>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Duration of Appointment</p>
																<div class="customerXBox">
																	<select
																		class="form-select mb-2"
																		aria-label="small select example"
																		v-model="payload.durationOfAppointment"
																	>
																		<option value="1">Option 1</option>
																		<option value="2">Option 2</option>
																	</select>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Appointment Date | Time</p>
																<div
																	class="customerXBox"
																	style="position: relative"
																>
																	<input
																		class="form-control"
																		type="text"
																	/>
																	<img
																		:src="CalendarIcon"
																		alt="CalendarIcon"
																		class="my-icon"
																		style="width: 35px"
																	>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Appointment Status</p>
																<div class="customerXBox">
																	<input
																		class="form-control"
																		type="text"
																	/>
																</div>
															</div>
														</div>
														<div class="row border-b p-4">
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">First name</p>
																<div class="customerXBox">
																	<input
																		class="form-control"
																		type="text"
																	/>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Cell # / Phone 1</p>
																<div class="customerXBox">
																	<input
																		class="form-control"
																		type="text"
																	/>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Last name</p>
																<div class="customerXBox">
																	<input
																		class="form-control"
																		type="text"
																	/>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Phone 2</p>
																<div class="customerXBox">
																	<input
																		class="form-control"
																		type="text"
																	/>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Email</p>
																<div class="customerXBox">
																	<input
																		class="form-control"
																		type="text"
																	/>
																</div>
															</div>
														</div>
														<div class="row border-b p-4">
															<div
																class="col-sm-12 col-md-6 d-flex align-items-center gap-5 px-5 my-3"
															>
																<p class="datexlable mb-0">
																	Not Drivable
																</p>
																<div class="customerXBox">
																	<input
																		class="form-check-input"
																		type="checkbox"
																		style="width: 25px; height: 25px;"
																	/>
																</div>
															</div>
															<div
																class="col-sm-12 col-md-6 d-flex align-items-center gap-5 px-5 my-3"
															>
																<p class="datexlable mb-0">
																	Tow Required
																</p>
																<div class="customerXBox">
																	<input
																		class="form-check-input"
																		type="checkbox"
																		style="width: 25px; height: 25px;"
																	/>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">VIN</p>
																<div class="customerXBox">
																	<input
																		class="form-control"
																		type="text"
																	/>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Year</p>
																<div class="customerXBox">
																	<input
																		class="form-control"
																		type="text"
																	/>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Make</p>
																<div class="customerXBox">
																	<input
																		class="form-control"
																		type="text"
																	/>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Model</p>
																<div class="customerXBox">
																	<input
																		class="form-control"
																		type="text"
																	/>
																</div>
															</div>
															<div class="col-sm-12 col-md-6 px-5 mt-3">
																<p class="datexlable">Insurance?</p>
																<div class="customerXBox">
																	<input
																		class="form-control"
																		type="text"
																	/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div
												class="tab-pane"
												id="comments"
											>
												Comments
											</div>
											<div
												class="tab-pane"
												id="welcome-form"
											>
												Welcome Form
											</div>
											<div
												class="tab-pane"
												id="chatlinx"
											>
												Chatlinx
											</div>
											<div
												class="tab-pane"
												id="follow-up"
											>
												Follow Up
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style>
.border-b {
	border-bottom: 2px solid #636363;
}

.border-l {
	border-left: 2px solid #636363;
}

.border-r {
	border-right: 2px solid #636363;
}

.pr-1 {
	padding-right: 1rem;
}

.input-container {
	display: flex;
	align-items: center;
	gap: 0.6rem;
}

.my-icon {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 14px;
	color: #aaa;
	font-size: 22px;
	padding-left: 11px;
	padding-top: 1px;
	padding-bottom: 0px;
}
</style>
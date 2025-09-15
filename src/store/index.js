import axios from 'axios';
import { useRouter } from 'vue-router';
import { createStore } from "vuex";
import { isEmpty } from 'lodash';
import { handleError } from '@/handleError';

const router = useRouter();

const apiUrl = import.meta.env.VITE_API_URL;

// const shopId = localStorage.getItem("shopId");

const store = createStore({
  state() {
    return {
      userId: null,
      shopId: null,
      customerId: null,
      vehicals: [],
      vehicalId: null,
      customerList: [],
      customerDetails: [],
      estimateList: [],
      estimateDetails: null,
      repairOrderList: [],
      repairDetails: null,
      familyMenbers: [],
      slideNum: null,
      insuranceDetails: null,
      paymentDetails: null,
      paymentRefresh: false,
      paymentFields: [],
      datesDetails: [],
      commentRefresh: false,
      paymentDoc: { paymentDocBoll: false, newDocId: null },
      documentList: [],
      staffNames: [],
      shopDetails: [],
      documentCategory: null,
      productionDetails: [],
      estimatorsList: [],
      newMessages: [],
      priorMessages: [],
      chatDetails: {},
      staffList: null,
      customerVehicleDetails: {},
    };
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    setShopId(state, shopId) {
      state.shopId = shopId;
    },
    setCustomerId(state, customerId) {
      state.customerId = customerId;
    },
    setVehicals(state, vehicals) {
      state.vehicals = vehicals;
    },
    setVehicalId(state, vehicalId) {
      state.vehicalId = vehicalId;
    },
    setCustomerDetails(state, customerDetails) {
      state.customerDetails = customerDetails;
    },
    setFamilyMenbers(state, familyMenbers) {
      state.familyMenbers = familyMenbers;
    },
    setEstimateDetails(state, estimateDetails) {
      state.estimateDetails = estimateDetails;
    },
    setSlideNum(state, slideNum) {
      state.slideNum = slideNum;
    },
    setRepairDetails(state, repairDetails) {
      state.repairDetails = repairDetails;
    },
    setInsuranceDetails(state, insuranceDetails) {
      state.insuranceDetails = insuranceDetails;
    },
    setPaymentDetails(state, paymentDetails) {
      state.paymentDetails = paymentDetails;
    },
    setPaymentRefresh(state, paymentRefresh) {
      state.paymentRefresh = paymentRefresh;
    },
    setPaymentFields(state, paymentFields) {
      state.paymentFields = paymentFields;
    },
    setDatesDetails(state, datesDetails) {
      state.datesDetails = datesDetails;
    },
    setCustomerList(state, customerList) {
      state.customerList = customerList;
    },
    setEstimateList(state, estimateList) {
      state.estimateList = estimateList;
    },
    setRepairOrderList(state, repairOrderList) {
      state.repairOrderList = repairOrderList;
    },
    setCommentRefresh(state, commentRefresh) {
      state.commentRefresh = commentRefresh;
    },
    setPaymentDoc(state, paymentDoc) {
      state.paymentDoc = paymentDoc;
    },
    setDocumentList(state, documentList) {
      state.documentList = documentList;
    },
    setStaffNames(state, staffNames) {
      state.staffNames = staffNames;
    },
    setShopDetails(state, shopDetails) {
      state.shopDetails = shopDetails;
    },
    setDocumentCategory(state, documentCategory) {
      state.documentCategory = documentCategory;
    },
    setProductionDetails(state, productionDetails) {
      state.productionDetails = productionDetails;
    },
    setEstimatorsList(state, estimatorsList) {
      state.estimatorsList = estimatorsList;
    },
    setNewMessages(state, newMessages) {
      state.newMessages = newMessages;
    },
    setPriorMessages(state, priorMessages) {
      state.priorMessages = priorMessages;
    },
    setChatDetails(state, chatDetails) {
      state.chatDetails = chatDetails;
    },
    setStaffList(state, staffList) {
      state.staffList = staffList;
    },
    setCustomerVehicleDetails(state, customerVehicleDetails) {
      state.customerVehicleDetails = customerVehicleDetails;
    },
  },
  actions: {
    setUserId({ commit }, userId) {
      commit("setUserId", userId);
    },
    setShopId({ commit }, shopId) {
      commit("setShopId", shopId);
    },
    setCustomerId({ commit }, customerId) {
      commit("setCustomerId", customerId);
    },
    setVehicals({ commit }, vehicals) {
      commit("setVehicals", vehicals);
    },
    setVehicalId({ commit }, vehicalId) {
      commit("setVehicalId", vehicalId);
    },
    setCustomerDetails({ commit }, customerDetails) {
      commit("setCustomerDetails", customerDetails);
    },
    setFamilyMenbers({ commit }, familyMenbers) {
      commit("setFamilyMenbers", familyMenbers);
    },
    setEstimateDetails({ commit }, estimateDetails) {
      commit("setEstimateDetails", estimateDetails);
    },
    setSlideNum({ commit }, slideNum) {
      commit("setSlideNum", slideNum);
    },
    setRepairDetails({ commit }, repairDetails) {
      commit("setRepairDetails", repairDetails);
    },
    setInsuranceDetails({ commit }, insuranceDetails) {
      commit("setInsuranceDetails", insuranceDetails);
    },
    setPaymentDetails({ commit }, paymentDetails) {
      commit("setPaymentDetails", paymentDetails);
    },
    setPaymentRefresh({ commit }, paymentRefresh) {
      commit("setPaymentRefresh", paymentRefresh);
    },
    setPaymentFields({ commit }, paymentFields) {
      commit("setPaymentFields", paymentFields);
    },
    setDatesDetails({ commit }, datesDetails) {
      commit("setDatesDetails", datesDetails);
    },
    setCustomerList({ commit }, customerList) {
      commit("setCustomerList", customerList);
    },
    setEstimateList({ commit }, estimateList) {
      commit("setEstimateList", estimateList);
    },
    setRepairOrderList({ commit }, repairOrderList) {
      commit("setRepairOrderList", repairOrderList);
    },
    setCommentRefresh({ commit }, commentRefresh) {
      commit("setCommentRefresh", commentRefresh);
    },
    setPaymentDoc({ commit }, paymentDoc) {
      commit("setPaymentDoc", paymentDoc);
    },
    setDocumentList({ commit }, documentList) {
      commit("setDocumentList", documentList);
    },
    setStaffNames({ commit }, staffNames) {
      commit("setStaffNames", staffNames);
    },
    setShopDetails({ commit }, shopDetails) {
      commit("setShopDetails", shopDetails);
    },
    setDocumentCategory({ commit }, documentCategory) {
      commit("setDocumentCategory", documentCategory);
    },
    setProductionDetails({ commit }, productionDetails) {
      commit("setProductionDetails", productionDetails);
    },

    // Changes after 25-12-2024
    // <<< ----------------------------------- REPAIR ORDER ----------------------------------- >>>
    async fetchRepairOrderList({ commit, state }, limit = 25) {
      if (state.repairOrderList?.length) {
        return state.repairOrderList;
      }
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/repairOrder/get/all/${shopId}/${limit}`
        );
        commit("setRepairOrderList", response.data.data);
        return response.data.data;
      } catch (error) {
        console.log(error);
        commit("setRepairOrderList", []);
        return [];
      }
    },

    async fetchArchivedRepairOrders({ state }, limit = 25) {
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/repairOrder/get/all/Archived/${limit}/${shopId}`
        );
        return response.data.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },

    async searchArchivedRepairOrders({ state }, searchText) {
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/repairOrder/get/search/Archived/${shopId}/${searchText}`
        );
        return response.data.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },

    async searchRepairOrderList({ state }, search = '') {
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/repairOrder/search/${shopId}/${search}`
        );
        return response.data.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },

    async postDefaultEstimateValues({ state }, payload = {}) {
      try {
        const shopId = state.shopId;
        const response = await axios.post(
          `/shop/default/repair/Order/${shopId}`,
          payload
        );
        return response.data;
      } catch (error) {
        console.error(error, 'error');
        return error;
      }
    },

    async filterRepairOrders({ state }, payload = {}) {
      try {
        const shopId = state.shopId;
        const response = await axios.post(
          `/repairOrder/all/Filter/${shopId}/${payload.limit ?? 25}`,
          payload
        );
        return response.data;
      } catch (error) {
        console.error(error, 'error');
        return error;
      }
    },

    // <<< ----------------------------------- SHOP DETAILS ----------------------------------- >>>
    async fetchShopDetails({ commit, state }, forceFetch = false) {
      if (!forceFetch && !isEmpty(state.shopDetails)) {
        return state.shopDetails;
      }
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/shop/getShopRegister/${shopId}`
        );
        commit("setShopDetails", response.data.data);
        return response.data.data;
      } catch (error) {
        console.log(error);
        commit("setShopDetails", {});
        return {};
      }
    },

    async updateShopDetails({ }, payload) {
      try {
        const response = await axios.post(
          `/shop/shopRegister`,
          payload,
        );
        return response.data;
      } catch (error) {
        return error.response.data;
      }
    },

    async updateShopLogo({ }, payload) {
      try {
        const response = await axios.post(
          `/shop/updateLogo`,
          payload,
        );
        return response.data;
      } catch (error) {
        return error.response?.data ?? error;
      }
    },

    async login({ }, payload) {
      try {
        const response = await axios.post(
          '/user/login',
          payload,
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },

    // <<< ----------------------------------- CUSTOMER SECTION ----------------------------------- >>>
    async fetchCustomers({ commit, state }, page = 1) {
      if (state.customerList.length) {
        return [state.customerList.length, state.customerList];
      }
      try {
        const shopId = state.shopId;
        if (!shopId) return router.push({ path: '/login' });

        const response = await axios.get(
          `/shop/getAllCustomer/${shopId}/${page}`
        );
        commit('setCustomerList', response.data.data[0].customers);

        return [response.data.totalCustomer, response.data.data[0].customers];
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.clear();
          router.push('/login');
        } else {
          console.log('An error occurred while fetching data', error);
        }
        return [0, []]
      }
    },

    async searchCustomer({ state }, { page, pageSize, search }) {
      if (!shopId) {
        return router.push({ path: '/login' });
      }
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/shop/searchCustomer/${page}/${pageSize
          }/${shopId}/${search ? search : null}`
        );

        return response?.data?.data[0]?.customers;
      } catch (error) {
        if (error?.response && error?.response.status === 401) {
          localStorage.clear();
          router.push('/login');
        } else if (error?.response) {
          console.log('An error occurred while fetching data', error);
        } else {
          console.log(
            'An error occurred while fetching data. Response was not available.',
            error
          );
        }
        return []
      }
    },

    // <<< ----------------------------------- ESTIMATE PROFILE SECTION ----------------------------------- >>>
    async fetchAllEstimate({ commit, state }, limit = 25) {
      if (state.estimateList.length) {
        return state.estimateList.length;
      }
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/estimateProfile/get/all/${shopId}/${limit}`
        );
        commit('setEstimateList', response.data.data);
        return [response.data.data, response.data.totallimit];
      } catch (error) {
        return error;
      }
    },

    async searchEstimateProfile({ state }, searchValue) {
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/estimateProfile/search/${shopId}/${searchValue}`
        );
        return response.data.data;
      } catch (error) {
        return error;
      }
    },

    async fetchEstimator({ commit, state }) {
      if (state.estimatorsList.length) {
        return [state.estimatorsList, state.estimatorsList.length];
      }
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/user/get/all/user/${shopId}`
        );
        commit('setEstimatorsList', response.data.data);
        return [response.data.data, response.data.totallimit || 0];
      } catch (error) {
        console.error(error, 'error');
        return [error];
      }
    },

    async filterEstimateProfile({ state }, payload = {}) {
      try {
        const shopId = state.shopId;
        const response = await axios.post(
          `/estimateProfile/all/Filter/${shopId}/${payload.limit || 25}`, payload
        );
        // commit('setEstimateList', response.data.data);
        return [response.data.data, response.data.totallimit];
      } catch (error) {
        console.error(error, 'error');
        return [error];
      }
    },

    async postDefaultEstimateValues({ state }, payload = {}) {
      try {
        const shopId = state.shopId;
        const response = await axios.post(
          `/shop/default/Estimate/${shopId}`,
          payload
        );
        return response.data;
      } catch (error) {
        console.error(error, 'error');
        return error;
      }
    },

    async fetchArchivedEstimateProfile({ state }, limit) {
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/estimateProfile/Archived/get/all/${limit}/${shopId}`
        );
        return response.data.data;
      } catch (error) {
        console.error(error, 'error');
        return error;
      }
    },

    async searchArchivedEstimateProfile({ state }, search) {
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/estimateProfile/search/Archive/${shopId}/${search}`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },

    async fetchShopsEstimateProfileData({ state }, appointmentData = {}) {
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/estimateAppoinment/get/shop/${shopId}`,
          appointmentData
        );
        return response;
      } catch (error) {
        return error;
      }
    },

    // <<< ----------------------------------- CUSTOMER SECTION ----------------------------------- >>>
    async fetchCustomerDetails({ }, customerId) {
      try {
        const response = await axios.get(
          `/customer/search/Customers/${customerId}`
        );
        return response.data;
      } catch (error) {
        console.error(error, 'error');
        return error;
      }
    },

    async updateCustomerDetails({ }, payload) {
      try {
        const response = await axios.post('/customer/update/detail', payload);
        return response.data;
      } catch (error) {
        console.error(error, 'error');
        return error;
      }
    },

    async fetchCustomerVehicles({ commit, state }, { customerId, force = false }) {
      if (!force) {
        return state.customerVehicleDetails;
      }
      try {
        const response = await axios.get(
          `/customerVehical/cutomer/vehicals/${customerId}`
        );
        commit('setCustomerVehicleDetails', response.data);
        return response.data;
      } catch (error) {
        console.error(error, 'error');
        return error;
      }
    },

    async updateCustomerVehicles({ }, payload) {
      try {
        const response = await axios.post(
          '/customerVehical/update/details',
          payload
        );
        return response.data;
      } catch (error) {
        console.error(error, 'error');
        return error;
      }
    },

    async registerNewEstimateProfile({ }, payload) {
      try {
        const response = await axios.post(
          '/estimateProfile/register',
          payload
        );
        return response.data;
      } catch (error) {
        handleError(error);
        return error;
      }
    },

    async addNewCustomerVehicle({ }, payload) {
      try {
        const response = await axios.post(
          '/customerVehical/register',
          payload
        );
        return response.data;
      } catch (error) {
        handleError(error);
        return error;
      }
    },

    async deleteCustomerVehicles({ }, { customerId, vehicleIds }) {
      try {
        const response = await axios.delete(
          `/customerVehical/bulk/${customerId}`,
          {
            data: {
              vehicleIds,
            },
          }
        );
        return response.data;
      } catch (error) {
        handleError(error);
        return error;
      }
    },

    // <<< ----------------------------------- CUSTOMER SECTION ----------------------------------- >>>
    async fetchEstimateChatLink({ commit, state }, estimateToken) {
      if (!isEmpty(state.chatDetails)) {
        return state.chatDetails
      }
      try {
        const response = await axios.get(
          `/estimateChatLink/getChatLink/${estimateToken}`
        );
        commit(
          'setCustomerId',
          response.data?.customerData?.value?.customerId?._id
        );
        commit('setChatDetails', response.data)
        return response.data;
      } catch (error) {
        return error;
      }
    },

    async updateSeenChatMessage({ commit }, estimateToken) {
      try {
        const response = await axios.get(
          `/estimateChatLink/Update/Seen/${estimateToken}/Customer`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },

    async fetchNewMessages({ commit, state }) {
      if (state.newMessages.length) {
        return state.newMessages
      }
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/estimateChatLink/unseen/chat/${shopId}`
        );
        commit('setNewMessages', response.data);
        return response.data;
      } catch (error) {
        return error;
      }
    },

    async fetchAllCustomersChat({ commit, state }) {
      if (state.priorMessages.length) {
        return state.priorMessages
      }
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/estimateChatLink/get/All/Customer/${shopId}`
        );
        commit('setPriorMessages', response.data);
        return response.data
      } catch (error) {
        return error;
      }
    },

    async fetchChatLinkDetails({ state }, backendKey) {
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/customerChatLink/get/chat/${shopId}/${backendKey}`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },



    // <<< ----------------------------------- SHOP ADMIN SECTION ----------------------------------- >>>
    async fetchStaffList({ commit, state }, { page, isActive, search = '' }) {
      try {
        const shopId = state.shopId;
        const url = isActive ?
          `/shop/getAllusers/inShop/${shopId}/${page}`
          :
          `/user/get/all/deactive/${page}/${shopId}`;
        const response = await axios.get(url, {
          params: {
            text: search
          }
        });
        commit('setStaffList', response.data);
        return response.data;
      } catch (error) {
        return error;
      }
    },

    async fetchUserDetails({ }, userId) {
      try {
        const response = await axios.get(
          `/user/userdetail/${userId}`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },

    async updateUserDetails({ }, payload) {
      try {
        const response = await axios.post(
          `/user/update/data`,
          payload
        );
        return response.data;
      } catch (error) {
        console.error(error, 'error');
        return error;
      }
    },

    // async createStaffUser({ }, payload) {
    //   try {
    //     const apiPayload = {
    //       ...payload,
    //     };
    //     const response = await axios.post(
    //       `/user/register`,
    //       apiPayload
    //     );
    //     return response.data;
    //   } catch (error) {
    //     console.error(error, 'error');
    //     return { error, success: false };
    //   }
    // },

    async createStaffUser({ rootGetters }, payload) {
      try {
        const token = rootGetters.getAuthToken;

        const response = await axios.post(
          `/user/add-staff`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        return { success: true, data: response.data, msg: "Staff created" };
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.message || "API Error",
        };
      }
    },


    async fetchAllCommentsForShopAdmin({ state }) {
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/shopDefaultComments/get/all/commensts/${shopId}`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },

    async fetchChatLinkMessagesForShopAdmin({ state }) {
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/customerChatLink/list/${shopId}`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },

    async fetchShopLaborRates({ state }) {
      try {
        const shopId = state.shopId;
        const response = await axios.get(
          `/shopRates/getShopRated/${shopId}`
        );
        return response.data;
      } catch (error) {
        return error;
      }
    },

    async updateShopLaborRates({ state }, payload) {
      try {
        const shopId = state.shopId;
        const response = await axios.post(`/shopRates/register/${shopId}`, payload);
        return response.data;
      } catch (error) {
        console.error(error, 'error');
        return {};
      }
    },
  },
  getters: {
    shopId(state) {
      return state.shopId || localStorage.getItem("shopId");
    },
    getUserId(state) {
      return state.userId;
    },
    getCuatomerId(state) {
      return state.customerId;
    },
    getVehicals(state) {
      return state.vehicals;
    },
    getVehicalId(state) {
      return state.vehicalId;
    },
    getCustomerDetails(state) {
      return state.customerDetails;
    },
    getFamilyMenbers(state) {
      return state.familyMenbers;
    },
    getEstimateDetails(state) {
      return state.estimateDetails;
    },
    getSlideNum(state) {
      return state.slideNum;
    },
    getRepairDetails(state) {
      return state.repairDetails;
    },
    getInsuranceDetails(state) {
      return state.insuranceDetails;
    },
    getPaymentDetails(state) {
      return state.paymentDetails;
    },
    getPaymentRefresh(state) {
      return state.paymentRefresh;
    },
    getPaymentFields(state) {
      return state.paymentFields;
    },
    getDatesDetails(state) {
      return state.datesDetails;
    },
    getCustomerList(state) {
      return state.customerList;
    },
    getEstimateList(state) {
      return state.estimateList;
    },
    getRepairOrderList(state) {
      return state.repairOrderList;
    },
    getCommentRefresh(state) {
      return state.commentRefresh;
    },
    getPaymentDoc(state) {
      return state.paymentDoc;
    },
    getDocumentList(state) {
      return state.documentList;
    },
    getStaffNames(state) {
      return state.staffNames;
    },
    getShopDetails(state) {
      return state.shopDetails;
    },
    getDocumentCategory(state) {
      return state.documentCategory;
    },
    getProductionDetails(state) {
      return state.productionDetails;
    },
    estimatorsList(state) {
      return state.estimatorsList;
    },
    customerVehicleDetails(state) {
      return state.customerVehicleDetails;
    },
  },
});

export default store;

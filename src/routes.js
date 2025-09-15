import { createRouter, createWebHistory } from "vue-router";
import Demo from "./Demo.vue";
import Login from "./pages/LoginPage.vue";
import Loginassistance from "./components/Loginassistance.vue";
import LoginassistanceSuccess from "./components/LoginassistanceSuccess.vue";
import SuperAdminLogin from "./SuperAdmin/components/SuperAdminLogin.vue";
import SuperAdminDashboard from "./SuperAdmin/components/SuperAdminDashboard.vue";
import AddShopPage from "./SuperAdmin/components/AddShopPage.vue";
import EditShopPage from "./SuperAdmin/components/EditShopPage.vue";
import ShopViewPage from "./SuperAdmin/components/ShopViewPage.vue";
import AddAdminPage from "./SuperAdmin/components/AddAdminPage.vue";
import EditAdminPage from "./SuperAdmin/components/EditAdminPage.vue";
import AddEditPlanPage from "./SuperAdmin/components/AddEditPlanPage.vue";

import ShopAdmin from './pages/ShopAdmin.vue';
import CreateUpdateStaffPage from './components/ShopAdmin/CreateUpdateStaff.vue';
import AddNewStaffPage from './components/ShopAdmin/AddNewStaff.vue';
import StaffPermissions from './components/StaffPermissions.vue';

import CMXDashboard from "./CMXDashboard/CMXDashboard.vue";
import EstimateXPage from './pages/EstimateXPage.vue';
import EstimatexprofileMain from "./EstimateXProfile/EstimatexprofileMain.vue";
import TachX from "./TachX.vue";
import FolderXMain from "./FolderX/FolderXMain.vue";
import OfficeXPage from './pages/OfficeXPage.vue';
import EstimateAppointment from './OfficeX/EstimateAppointment/EstimateCalendar/EstimateAppointment.vue';
import NewEstimateAppoitmentMain from "./OfficeX/NewEstimateAppoitment/NewEstimateAppoitmentMain.vue";
import PartsXPage from './pages/PartsXPage.vue';
import ProductionXPage from './pages/ProductionXPage.vue';
import CustomeridProfileMain from "./CustomeridProfile/CustomeridProfileMain.vue";
import AddNewCustomer from "./CustomeridProfile/AddNewCustomer.vue";
import CustomerProfile from './pages/CustomerProfile.vue';
import Chatlink from "./Chatlink/ChatlinkMain.vue";
import ChatLinkX from './pages/ChatLinkX.vue';
import IndirectModulesPage from './pages/IndirectModulesPage.vue';
import UserProfileMain from "./UserProfile/UserProfileMain.vue";
import TechSupportMain from "./TechSupport/TechSupportMain.vue";
import VendorxMain from "./VendorX/VendorxMain.vue";
import VendorSetupMain from "./VendorX/VendorSetup/VendorSetupMain.vue";
import VendorInviteMain from "./VendorX/VendorInvite/VendorInviteMain.vue";
import VendorLinkMain from "./VendorX/VendorLink/VendorLinkMain.vue";
import VendorxLogin from "./VendorX/VendorxLogin.vue";
import VenderxAdminMain from "./VendorxAdmin/VenderxAdminMain.vue";
import VendorXpartsAdminMain from "./VendorXpartsAdmin/VendorXpartsAdminMain.vue";
import VendorInvitestaffMain from "./VendorXpartsAdmin/VendorXStaffSetup/VendorStaffInvite/VendorInvitestaffMain.vue";
import VenderXpartsAdminAddStaffMain from "./VendorXpartsAdmin/VenderXpartsAdminAddStaff/VenderXpartsAdminAddStaffMain.vue";

import Dashboard from "./SuperAdmin/pages/Dashboard.vue";
import ShopProfileMainVue from "./SuperAdmin/pages/ShopProfile/ShopProfileMain.vue";
import NewPassword from "./components/NewPassword.vue";
import PageNotFound from "./PageNotFound.vue";

// Subscription Module
import SubscriptionPlans from "./components/SubscriptionPlans.vue";
import SubscriptionTestPanel from "./components/SubscriptionTestPanel.vue";
import { subscriptionGuard } from "./guards/subscriptionGuard.js";
import axios from "axios";
import { showErrorToast } from "./toster";

import DashboardPage from './pages/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Super Admin Routes
    { path: "/cmx-super/login", component: SuperAdminLogin, meta: { header: 0 } },
    { path: "/cmx-super/dashboard", component: SuperAdminDashboard, meta: { header: 0, requiresSuperAdmin: true } },
    { path: "/cmx-super/add-shop", component: AddShopPage, meta: { header: 0, requiresSuperAdmin: true } },
    { path: "/cmx-super/edit-shop/:shopId", component: EditShopPage, meta: { header: 0, requiresSuperAdmin: true } },
    { path: "/cmx-super/view-shop/:shopId", component: ShopViewPage, meta: { header: 0, requiresSuperAdmin: true } },
    { path: "/cmx-super/add-admin", component: AddAdminPage, meta: { header: 0, requiresSuperAdmin: true } },
    { path: "/cmx-super/edit-admin/:id", component: EditAdminPage, meta: { header: 0, requiresSuperAdmin: true } },
    { path: "/cmx-super/add-plan", component: AddEditPlanPage, meta: { header: 0, requiresSuperAdmin: true } },
    { path: "/cmx-super/edit-plan/:id", component: AddEditPlanPage, meta: { header: 0, requiresSuperAdmin: true } },

    // Demo & Login Assistance
    { path: "/demo", component: Demo, meta: { header: 1 } },
    { path: "/loginassistance", component: Loginassistance, meta: { header: 0 } },
    { path: "/loginassistance-success", component: LoginassistanceSuccess, meta: { header: 0 } },

    // Authenticated Dashboard
    { path: "/", component: DashboardPage, meta: { header: 1, requiresAuth: true }, beforeEnter: subscriptionGuard },
    { path: "/staff-permissions", component: StaffPermissions, meta: { header: 0 } },

    // Shop Profile Routes
    { path: "/Shop_Profile", component: ShopAdmin, meta: { header: 1, requiresAuth: true } },
    { path: "/Shop_Profile/add-staff", component: AddNewStaffPage, meta: { header: 1, requiresAuth: true } },
    { path: "/Shop_Profile/staff", component: CreateUpdateStaffPage, meta: { header: 1, requiresAuth: true } },
    { path: "/Shop_Profile/staff/:userId", component: CreateUpdateStaffPage, meta: { header: 1, requiresAuth: true } },

    // Staff / Update Staff
    { path: "/addstaff", component: AddNewStaffPage, meta: { header: 1, requiresAuth: true } },
    { path: "/updatestaff/:userId", component: AddNewStaffPage, meta: { header: 1, requiresAuth: true } },

    // Password Reset
    { path: "/newPassword/:Token", component: NewPassword, meta: { header: 0, requiresAuth: true } },

    // Estimate Routes
    { path: "/estimatex", component: EstimateXPage, meta: { header: 1, requiresAuth: true }, beforeEnter: subscriptionGuard },
    {
      path: "/estimatexprofile/:id", component: EstimatexprofileMain, meta: { header: 1, requiresAuth: true }, beforeEnter: async (to, from, next) => {
        try {
          const id = to.params.id;
          const apiUrl = import.meta.env.VITE_API_URL;
          await axios.get(`${apiUrl}/estimateProfile/check/estimate/${id}`);
          next();
        } catch (error) {
          showErrorToast("Page Not Found !!!");
          next("/");
        }
      }
    },

    // Other Pages
    { path: "/tachx", component: TachX, meta: { header: 1, requiresAuth: true } },
    { path: "/floderxmain/:id", component: FolderXMain, meta: { header: 1, requiresAuth: true } },
    { path: "/customeridprofile/:customerId", component: CustomeridProfileMain, meta: { header: 1, requiresAuth: true } },
    { path: "/customer-profile/:id", component: CustomerProfile, meta: { header: 1, requiresAuth: true } },
    { path: "/newcustomer", component: AddNewCustomer, meta: { header: 1, requiresAuth: true } },

    // Chat Links
    { path: "/chatlink/:token", component: Chatlink, meta: { header: 0 } },
    { path: "/chat-link-x", component: ChatLinkX, meta: { header: 1, requiresAuth: true } },

    // Login
    { path: "/login", component: Login, meta: { header: 0 } },

    // Subscription
    { path: "/subscription-plans", component: SubscriptionPlans, meta: { header: 0, requiresAuth: true } },
    { path: "/subscription-test", component: SubscriptionTestPanel, meta: { header: 1, requiresAuth: true } },

    // Other Modules
    { path: "/parts-x", component: PartsXPage, meta: { header: 1, requiresAuth: true }, beforeEnter: subscriptionGuard },
    { path: "/production-x", component: ProductionXPage, meta: { header: 1, requiresAuth: true }, beforeEnter: subscriptionGuard },
    { path: "/indirect-modules", component: IndirectModulesPage, meta: { header: 1, requiresAuth: true }, beforeEnter: subscriptionGuard },
    { path: "/officex", component: OfficeXPage, meta: { header: 1, requiresAuth: true }, beforeEnter: subscriptionGuard },
    { path: "/officex/estimate-appointment", component: EstimateAppointment, meta: { header: 1, requiresAuth: true } },
    { path: "/newestimateappoitment", component: NewEstimateAppoitmentMain, meta: { header: 1, requiresAuth: true } },

    { path: "/userprofile", component: UserProfileMain, meta: { header: 1, requiresAuth: true } },
    { path: "/techsupport", component: TechSupportMain, meta: { header: 1, requiresAuth: true } },

    // VendorX
    { path: "/vendorx", component: VendorxMain, meta: { header: 1, requiresAuth: true } },
    { path: "/vendorsetup", component: VendorSetupMain, meta: { header: 1, requiresAuth: true } },
    { path: "/vendorinvite", component: VendorInviteMain, meta: { header: 1, requiresAuth: true } },
    { path: "/vendorlink", component: VendorLinkMain, meta: { header: 1, requiresAuth: true } },
    { path: "/vendorxlogin", component: VendorxLogin, meta: { header: 0, requiresAuth: true } },
    { path: "/venderxadmin", component: VenderxAdminMain, meta: { header: 1, requiresAuth: true } },
    { path: "/vendorxpartsadmin", component: VendorXpartsAdminMain, meta: { header: 1, requiresAuth: true } },
    { path: "/vendorinvitestaff", component: VendorInvitestaffMain, meta: { header: 1, requiresAuth: true } },
    { path: "/venderspartssdminsddstaff", component: VenderXpartsAdminAddStaffMain, meta: { header: 1, requiresAuth: true } },

    // Admin Pages
    { path: "/admin", component: Dashboard, meta: { header: 2, requiresAuth: true } },
    { path: "/admin/shopprofile", component: ShopProfileMainVue, meta: { header: 2, requiresAuth: true } },

    // 404
    { path: "/:catchAll(.*)", component: PageNotFound, meta: { header: 0 } },
    { path: "/pageNotFound", component: PageNotFound, meta: { header: 0 } },
  ],
});

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    const authToken = localStorage.getItem("AuthToken");

    if (!authToken) {
      showErrorToast("You need to Login First");
      next("/login");
      return;
    }

    try {
      await axios.post(`/api/auth/check`, { token: authToken });
      next();
    } catch (error) {
      showErrorToast("Your session has expired");
      let rememberMe = false;
      let shopId = "";
      let Username = "";
      let password = "";
      if (localStorage.getItem("is_remember")) {
        rememberMe = true;
        shopId = localStorage.getItem("remember_shopId");
        Username = localStorage.getItem("remember_username");
        password = localStorage.getItem("remember_password");
      }
      localStorage.clear();
      if (rememberMe) {
        localStorage.setItem("is_remember", rememberMe);
        localStorage.setItem("remember_shopId", shopId);
        localStorage.setItem("remember_username", Username);
        localStorage.setItem("remember_password", password);
      }
      next("/login");
    }
  } else if (to.matched.some(record => record.meta.requiresSuperAdmin)) {
    const superAdminToken = localStorage.getItem("superAdminToken");
    if (!superAdminToken) next("/cmx-super/login");
    else next();
  } else {
    const authToken = localStorage.getItem("AuthToken");
    if (authToken && to.path === "/login") next("/");
    else if (localStorage.getItem("superAdminToken") && to.path === "/cmx-super/login") next("/cmx-super/dashboard");
    else next();
  }
});

export default router;
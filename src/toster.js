import { useToast } from "vue-toastification";

const toast = useToast();

export function showSuccessToast(message) {
  try {
    toast.success(message, {
      position: "top-right",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: true,
      hideProgressBar: true,
      closeButton: false,
      icon: true,
      rtl: false,
    });
  } catch (error) {
    console.error("Error showing success toast:", error);
  }
}

export function showErrorToast(message) {
  try {
    toast.error(message, {
      position: "top-right",
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: true,
      hideProgressBar: true,
      closeButton: false,
      icon: true,
      rtl: false,
    });
  } catch (error) {
    console.error("Error showing error toast:", error);
  }
}

import { showErrorToast } from "./toster.js";

export function handleError(error) {
  if (error instanceof Array) {
    error.forEach((errorMsg) => {
      showErrorToast(errorMsg);
    });
    console.error("An error occurred while fetching data", error);
  }
  else if (error.response && error.response.data.msg instanceof Array) {
    error.response.data.msg.forEach((errorMsg) => {
      showErrorToast(errorMsg);
    });
    console.log("An error occurred while fetching data", error);
  } else if (error.response && error.response.status === 401) {
    showErrorToast(error.response.data.message);
    localStorage.clear();
    router.push("/login");
  } else if (error.response) {
    showErrorToast(error.response.data.msg);
    console.error("An error occurred while fetching data", error);
  } else if (typeof error === 'string') {
    showErrorToast(error);
  } else {
    showErrorToast("Some Error Occurred!!!!");
    console.error(
      "An error occurred while fetching data. Response was not available.",
      error
    );
  }
}

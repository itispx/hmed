import Toast from "react-native-toast-message";

const toastsActions = (() => {
  return {
    showSuccess(text1, text2) {
      showSuccessHandler(text1, text2);
    },
    showError(text1, text2) {
      showErrorHandler(text1, text2);
    },
  };
})();

function showSuccessHandler(text1, text2) {
  Toast.show({
    type: "success",
    text1,
    text2,
  });
}

function showErrorHandler(text1, text2) {
  Toast.show({
    type: "error",
    text1,
    text2,
  });
}

export default toastsActions;

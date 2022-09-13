import Toast from "react-native-toast-message";

const toastsActions = (() => {
  return {
    showSuccess,
    showError,
  };
})();

function showSuccess(text1, text2) {
  Toast.show({
    type: "success",
    text1,
    text2,
  });
}

function showError(text1, text2) {
  Toast.show({
    type: "error",
    text1,
    text2,
  });
}

export default toastsActions;

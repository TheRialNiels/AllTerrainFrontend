import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const SwalLoading = () => {
  Swal.fire({
    title: "Loading...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const SwalCustomLoading = (text) => {
  Swal.fire({
    title: text,
    allowOutsideClick: false,
    timer: 1500,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const SwalClose = () => {
  Swal.close();
};

export const SwalCustom = (title, text, icon) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: "OK",
    confirmButtonColor: "#004438",
  });
};

export const SwalCustomConfirm = async (title, text, icon, confirmBtn) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#004438",
    confirmButtonText: confirmBtn,
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
};

export const SwalConfirmWithoutCancel = async (title, text, icon, confirmBtn) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: '#3085d6',
    confirmButtonText: confirmBtn
  }).then((result) => {
    if (result.isConfirmed) {
      return true
    } else {
      return false
    }
  })
}

export const SwalSuccess = (text) => {
  Swal.fire({
    title: "Success",
    text: text,
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "#004438",
  });
};

export const SwalError = (text) => {
  Swal.fire({
    title: "Error",
    text: text,
    icon: "error",
    confirmButtonText: "OK",
    confirmButtonColor: "#004438",
  });
};

export const SwalWarning = (text) => {
  Swal.fire({
    title: "Warning",
    text: text,
    icon: "warning",
    confirmButtonText: "OK",
    confirmButtonColor: "#004438",
  });
};

export const SwalInfo = (text) => {
  Swal.fire({
    title: "Info",
    text: text,
    icon: "info",
    confirmButtonText: "OK",
    confirmButtonColor: "#004438",
  });
};

export const SwalDelete = async (text) => {
  return Swal.fire({
    title: "Are you sure?",
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#004438",
    confirmButtonText: "Yes, delete it!",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
};

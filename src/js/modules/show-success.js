import modal from "../components/modal";
import notify from "../components/notify";

export default function showSuccess(form) {
  modal.closeModal();
  notify({ status: "success" });
  form.reset();
  form.style.display = "block";
  // window.location.href = 'someURL';
}

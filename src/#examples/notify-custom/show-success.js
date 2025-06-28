import notify from "../components/notify";

export default function showSuccess(form) {
  notify({ status: "success", useCustomBlock: true });

  form.reset();
  form.style.display = "block";
}

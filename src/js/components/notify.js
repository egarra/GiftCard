import translateMessage from "../modules/translate-message";

export default function notify({ status, useCustomBlock }) {
  const backdrop = document.querySelector("[data-backdrop-notify]");
  const modal = document.querySelector("[data-notify]");
  const content = modal.querySelector("[data-notify-content]");
  const closeBtn = document.querySelector("[data-notify-close]");

  // Store timeout ID
  let autoCloseTimeout;

  backdrop.classList.toggle("notify-hidden");

  if (useCustomBlock) {
    modal.querySelector(".notify-success-custom").classList.remove("hidden");
    modal.querySelector(".notify-svg-success").classList.add("hidden");
  }

  function handleNotify(modalElement, closeElement) {
    const hideNotify = () => {
      modalElement.classList.add("notify-hidden");
      modalElement.setAttribute("data", "");
      clearTimeout(autoCloseTimeout); // Clear auto-close timeout when manually closed
    };

    const handleKey = (e) => {
      if (!backdrop.classList.contains("notify-hidden") && e.key === "Escape") {
        hideNotify();
      }
    };

    const handleClose = (e) => {
      if (e.target === modalElement) {
        hideNotify();
      }
    };

    document.addEventListener("keydown", handleKey);
    modalElement.addEventListener("mousedown", handleClose);
    closeElement.addEventListener("click", hideNotify);
  }

  const addNotifyMessage = (title, text) => {
    content.children[0].textContent = translateMessage(title);
    content.children[1].textContent = translateMessage(text);
  };

  switch (status) {
    case "success":
      backdrop.setAttribute("data", "success");
      addNotifyMessage("thanks", "reply");
      break;

    case "failure":
      backdrop.setAttribute("data", "failure");
      addNotifyMessage("error", "tryAgain");
      break;

    case "emailNotExist":
      backdrop.setAttribute("data", "failure");
      addNotifyMessage("error", "emailNotExists");
      break;
  }

  if (!useCustomBlock || status === "failure" || status === "emailNotExist") {
    content.style.display = "block";

    // Clear any existing timeout before setting a new one
    clearTimeout(autoCloseTimeout);

    autoCloseTimeout = setTimeout(() => {
      if (!backdrop.classList.contains("notify-hidden")) {
        backdrop.classList.add("notify-hidden");
        backdrop.setAttribute("data", "");
      }
    }, 5000);
  }

  handleNotify(backdrop, closeBtn);
}

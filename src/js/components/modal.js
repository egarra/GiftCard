createModal("[data-modal]", "[data-modal-open]", "[data-modal-close]");

function createModal(modal, openModalBtn, closeModalBtn) {
  const modalForm = document.querySelector(modal);
  const openModalButtons = document.querySelectorAll(openModalBtn);
  const closeModalButton = document.querySelector(closeModalBtn);
  const appContent = document.querySelector("#app");
  let activeButton = null;

  if (!modalForm || !closeModalButton || openModalButtons.length === 0) {
    console.error(
      "❌ Error: [createModal] One or more modal elements not found",
    );
    return;
  }

  openModalButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      activeButton = button;
      toggleModal();
    });
  });

  function toggleModal() {
    document.body.classList.toggle("scroll-hidden");
    modalForm.classList.toggle("modal-hidden");

    const modalIsHidden = modalForm.classList.contains("modal-hidden");
    modalForm.setAttribute("aria-hidden", String(modalIsHidden));

    if (!modalIsHidden) {
      appContent.setAttribute("inert", "");
      modalForm.focus();

      document.addEventListener("keydown", onEscapeKeyDown);
      modalForm.addEventListener("mousedown", onBackdropClick);
      closeModalButton.addEventListener("click", toggleModal);
    } else {
      appContent.removeAttribute("inert");

      document.removeEventListener("keydown", onEscapeKeyDown);
      modalForm.removeEventListener("mousedown", onBackdropClick);
      closeModalButton.removeEventListener("click", toggleModal);

      if (activeButton) {
        activeButton.focus();
      }
    }
  }

  function onEscapeKeyDown(event) {
    if (event.key === "Escape") {
      toggleModal();
    }
  }

  function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  }
}

function closeModal() {
  const modalForm = document.querySelector("[data-modal]");

  if (!modalForm) return;

  document.body.classList.remove("scroll-hidden");
  modalForm.classList.add("modal-hidden");
  modalForm.setAttribute("aria-hidden", String(true));
}

export default {
  closeModal,
};

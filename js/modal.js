export function initContactModal() {
  const contactModal = document.querySelector("#contact-modal");

  if (!contactModal) {
    return;
  }

  const openContactButtons = document.querySelectorAll("[data-open-contact]");
  const closeContactButtons = document.querySelectorAll("[data-close-contact]");

  openContactButtons.forEach((button) => {
    button.addEventListener("click", () => openContactModal(contactModal));
  });

  closeContactButtons.forEach((button) => {
    button.addEventListener("click", () => closeContactModal(contactModal));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && contactModal.classList.contains("is-open")) {
      closeContactModal(contactModal);
    }
  });
}

function openContactModal(contactModal) {
  contactModal.classList.remove("hidden");
  requestAnimationFrame(() => {
    contactModal.classList.add("is-open");
    document.body.classList.add("modal-open");
  });
}

function closeContactModal(contactModal) {
  contactModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  window.setTimeout(() => {
    contactModal.classList.add("hidden");
  }, 280);
}

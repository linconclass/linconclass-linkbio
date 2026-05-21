const year = document.querySelector("#year");
const copyButton = document.querySelector("#copy-link");
const toast = document.querySelector("#toast");
const contactModal = document.querySelector("#contact-modal");
const contactForm = document.querySelector("#contact-form");
const openContactButtons = document.querySelectorAll("[data-open-contact]");
const closeContactButtons = document.querySelectorAll("[data-close-contact]");
const whatsappNumber = "5521969909037";

year.textContent = new Date().getFullYear();

copyButton.addEventListener("click", async () => {
  const url = window.location.href;

  try {
    await navigator.clipboard.writeText(url);
    showToast("Link copiado");
  } catch {
    showToast("Nao foi possivel copiar");
  }
});

openContactButtons.forEach((button) => {
  button.addEventListener("click", openContactModal);
});

closeContactButtons.forEach((button) => {
  button.addEventListener("click", closeContactModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && contactModal.classList.contains("is-open")) {
    closeContactModal();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const getValue = (name) => String(formData.get(name) || "").trim();

  const message = `🎷 NOVO ATENDIMENTO - SITE LINCON CLASS

👤 Nome:
${getValue("nome")}

📞 Telefone:
${getValue("telefone")}

🎼 Tipo de Evento:
${getValue("evento")}

🏢 Local:
${getValue("estabelecimento")}

📍 Endereço:
${getValue("endereco")}

📅 Data:
${formatDate(getValue("data"))}

🌆 Cidade:
${getValue("cidade")}

👥 Convidados:
${getValue("quantidade")}

📝 Detalhes:
${getValue("detalhes")}

Olá! Vim pelo site e gostaria de solicitar um orçamento.`;

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

function openContactModal() {
  contactModal.classList.remove("hidden");
  requestAnimationFrame(() => {
    contactModal.classList.add("is-open");
    document.body.classList.add("modal-open");
  });
}

function closeContactModal() {
  contactModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");

  window.setTimeout(() => {
    contactModal.classList.add("hidden");
  }, 280);
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const [yearValue, month, day] = value.split("-");
  return `${day}/${month}/${yearValue}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2200);
}

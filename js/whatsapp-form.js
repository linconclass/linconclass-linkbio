const whatsappNumber = "5521969909037";

export function initWhatsappForm() {
  const contactForm = document.querySelector("#contact-form");

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = buildWhatsappMessage(new FormData(contactForm));

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  });
}

function buildWhatsappMessage(formData) {
  const getValue = (name) => String(formData.get(name) || "").trim();

  return `🎷 NOVO ATENDIMENTO - SITE LINCON CLASS

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
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const [yearValue, month, day] = value.split("-");
  return `${day}/${month}/${yearValue}`;
}

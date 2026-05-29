const whatsappNumber = "5521969909037"; // Seu número configurado perfeitamente

export function initWhatsappForm() {
  const contactForm = document.querySelector("#contact-form");

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = buildWhatsappMessage(new FormData(contactForm));

    // Ajustado para usar globalThis alinhado com as boas práticas do seu ecossistema
    globalThis.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  });
}

function buildWhatsappMessage(formData) {
  const getValue = (name) => String(formData.get(name) || "").trim();

  // Texto otimizado em blocos compactos para leitura imediata na sua tela do WhatsApp
  return `🎷 *NOVO ORÇAMENTO - LINCON CLASS*

👤 *Nome:* ${getValue("nome")}
📞 *Telefone:* ${getValue("telefone")}
🎼 *Evento:* ${getValue("evento")}
🏢 *Local:* ${getValue("estabelecimento")}
📍 *Endereço:* ${getValue("endereco")}
📅 *Data:* ${formatDate(getValue("data"))}
🌆 *Cidade:* ${getValue("cidade")}
👥 *Convidados:* ${getValue("quantidade")}

📝 *Detalhes:* 
${getValue("detalhes")}

---
_Olá! Vim pelo site e gostaria de verificar sua disponibilidade._`;
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const [yearValue, month, day] = value.split("-");
  return `${day}/${month}/${yearValue}`;
}

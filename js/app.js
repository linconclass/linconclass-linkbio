import { initContactModal } from "./modal.js";
import { initWhatsappForm } from "./whatsapp-form.js";

const components = {
  header: "./components/header.html",
  hero: "./components/hero.html",
  services: "./components/services.html",
  "contact-modal": "./components/contact-modal.html",
  footer: "./components/footer.html"
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
  await renderServices();
  initYear();
  initCopyLink();
  initRevealAnimations();
  initContactModal();
  initWhatsappForm();
  initServiceCardClicks(); // Ativa a interação nos cards de serviços
});

async function loadComponents() {
  const slots = document.querySelectorAll("[data-component]");

  await Promise.all(
    Array.from(slots).map(async (slot) => {
      const componentName = slot.dataset.component;
      const componentPath = components[componentName];

      if (!componentPath) {
        return;
      }

      const response = await fetch(componentPath);

      if (!response.ok) {
        throw new Error(`Unable to load component: ${componentPath}`);
      }

      slot.innerHTML = await response.text();
    })
  );
}

async function renderServices() {
  const servicesGrid = document.querySelector("#services-grid");

  if (!servicesGrid) {
    return;
  }

  const response = await fetch("./data/services.json");

  if (!response.ok) {
    throw new Error("Unable to load services data");
  }

  const services = await response.json();
  servicesGrid.innerHTML = services.map(createServiceCard).join("");
  initServiceImageFallbacks();
}

function createServiceCard(service) {
  // Adicionado o atributo 'data-service-name' para sincronizar com o modal de contato ao clicar
  return `
    <article class="service-card cursor-pointer" data-service-name="${service.title}">
      <img src="${service.image}" data-fallback-image="${service.fallbackImage || ""}" alt="" class="service-image" loading="lazy" width="640" height="440" />
      <div class="service-content">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </div>
    </article>
  `;
}

function initServiceImageFallbacks() {
  document.querySelectorAll(".service-image[data-fallback-image]").forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        const fallbackImage = image.dataset.fallbackImage;

        if (fallbackImage && image.src !== fallbackImage) {
          image.src = fallbackImage;
        }
      },
      { once: true }
    );
  });
}

function initServiceCardClicks() {
  // Faz com que ao clicar em qualquer card de serviço, abra o modal de contato com o serviço já selecionado
  document.querySelectorAll(".service-card[data-service-name]").forEach((card) => {
    card.addEventListener("click", () => {
      const serviceName = card.dataset.serviceName;
      const selectComponent = document.querySelector("select[name='evento']");
      const modal = document.querySelector("#contact-modal");

      if (selectComponent) {
        selectComponent.value = serviceName;
      }

      if (modal && typeof modal.dispatchEvent === "function") {
        // Dispara o evento personalizado para o modal de contato abrir (gerenciado pelo js/modal.js)
        const openButton = document.querySelector("[data-open-contact]");
        if (openButton) {
          openButton.click();
        }
      }
    });
  });
}

function initYear() {
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function initCopyLink() {
  const copyButton = document.querySelector("#copy-link");

  if (!copyButton) {
    return;
  }

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(globalThis.location.href);
      showToast("Link copiado");
    } catch {
      showToast("Não foi possível copiar");
    }
  });
}

function showToast(message) {
  const toast = document.querySelector("#toast");

  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.remove("hidden");

  globalThis.clearTimeout(showToast.timer);
  showToast.timer = globalThis.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2200);
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll("header, main > div, .link-card, .service-card, footer");

  if (!revealItems.length) {
    return;
  }

  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.transitionDelay = `${Math.min(index * 55, 360)}ms`;
  });

  if (!("IntersectionObserver" in globalThis)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

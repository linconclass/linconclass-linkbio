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
  initContactModal();
  initWhatsappForm();
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
}

function createServiceCard(service) {
  return `
    <article class="service-card">
      <img src="${service.image}" alt="" class="service-image" loading="lazy" width="640" height="440" />
      <div class="service-content">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </div>
    </article>
  `;
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
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copiado");
    } catch {
      showToast("Nao foi possivel copiar");
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

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2200);
}

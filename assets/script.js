const year = document.querySelector("#year");
const copyButton = document.querySelector("#copy-link");
const toast = document.querySelector("#toast");

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

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2200);
}

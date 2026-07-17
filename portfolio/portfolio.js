document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('share-button').addEventListener('click', async () => {
  const shareData = {
    title: 'Lincon Class | Tecnologia, automação e desenvolvimento',
    text: 'Conheça o portfólio de tecnologia do Lincon Class.',
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    const button = document.getElementById('share-button');
    const original = button.innerHTML;
    button.textContent = 'Link copiado';
    setTimeout(() => { button.innerHTML = original; }, 1800);
  } catch (error) {
    if (error.name !== 'AbortError') console.error('Não foi possível compartilhar.', error);
  }
});

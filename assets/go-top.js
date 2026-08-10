document.addEventListener('DOMContentLoaded', function () {
  const goTopButton = document.getElementById('go-top');

  if (!goTopButton) return;

  const toggleButton = function () {
    const shouldShow = window.scrollY > 300;
    goTopButton.classList.toggle('show', shouldShow);
  };

  toggleButton();
  window.addEventListener('scroll', toggleButton, { passive: true });

  goTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

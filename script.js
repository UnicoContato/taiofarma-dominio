const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const year = document.querySelector('[data-year]');
const modal = document.querySelector('[data-modal]');
const openPrivacy = document.querySelector('[data-privacy-open]');
const closePrivacyButtons = document.querySelectorAll('[data-privacy-close]');
const gallery = document.querySelector('[data-gallery]');

function setHeaderState() {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
}

function closeMenu() {
  nav.classList.remove('is-open');
  header.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

year.textContent = new Date().getFullYear();

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  header.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

openPrivacy.addEventListener('click', () => {
  modal.hidden = false;
});

closePrivacyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modal.hidden = true;
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.hidden = true;
    document.querySelector('.lightbox')?.setAttribute('hidden', '');
  }
});

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.hidden = true;
lightbox.innerHTML = '<button type="button" aria-label="Fechar imagem">×</button><img alt="">';
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector('img');
const lightboxButton = lightbox.querySelector('button');

gallery.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-src]');
  if (!button) return;
  lightboxImage.src = button.dataset.src;
  lightboxImage.alt = button.querySelector('img').alt;
  lightbox.hidden = false;
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target === lightboxButton) {
    lightbox.hidden = true;
  }
});

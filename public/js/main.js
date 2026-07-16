(function () {
  const params = new URLSearchParams(window.location.search);
  if (params.has('success') || params.has('error')) {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      setTimeout(() => {
        window.scrollTo({
          top: contactSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }, 120);
    }

    history.replaceState(null, '', window.location.pathname);
  }
})();

const hamburger = document.querySelector('.js-hamburger');
const nav = document.querySelector('.js-nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.js-header')) {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    }
  });
}

const header = document.querySelector('.js-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: 'smooth'
    });
  });
});

const scrollObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.observe').forEach((el) => scrollObserver.observe(el));

document.querySelectorAll('.js-accordion-header').forEach((headerBtn) => {
  headerBtn.addEventListener('click', () => {
    const item = headerBtn.parentElement;
    const bodyEl = item.querySelector('.accordion-body');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.accordion-item.open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-body').style.maxHeight = null;
      }
    });

    if (!isOpen) {
      item.classList.add('open');
      bodyEl.style.maxHeight = bodyEl.scrollHeight + 'px';
    } else {
      item.classList.remove('open');
      bodyEl.style.maxHeight = null;
    }
  });
});

const testimonialsTrack = document.querySelector('.testimonials-track');
if (testimonialsTrack) {
  testimonialsTrack.addEventListener('mouseenter', () => {
    testimonialsTrack.style.animationPlayState = 'paused';
  });
  testimonialsTrack.addEventListener('mouseleave', () => {
    testimonialsTrack.style.animationPlayState = 'running';
  });
  testimonialsTrack.addEventListener('touchstart', () => {
    testimonialsTrack.style.animationPlayState = 'paused';
  });
  testimonialsTrack.addEventListener('touchend', () => {
    testimonialsTrack.style.animationPlayState = 'running';
  });
}

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  const formStartedAt = document.getElementById('formStartedAt');
  const nameInput = contactForm.querySelector('#name');
  const phoneInput = contactForm.querySelector('#phone');
  const studentClass = contactForm.querySelector('#studentClass');
  const mode = contactForm.querySelector('#mode');
  const messageInput = contactForm.querySelector('#message');

  if (formStartedAt) {
    formStartedAt.value = Date.now().toString();
  }

  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
  });

  messageInput.addEventListener('input', () => {
    if (messageInput.value.length > 300) {
      messageInput.value = messageInput.value.slice(0, 300);
    }
  });

  contactForm.addEventListener('submit', (e) => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    const nameRegex = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const linkRegex = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|ru|xyz|info|biz|top|click|link|shop|site|live|me|cc|io|in)\b)/i;

    if (!name || !phone || !studentClass.value || !mode.value || !message) {
      e.preventDefault();
      alert('Please fill in all fields before submitting.');
      return;
    }

    if (!nameRegex.test(name)) {
      e.preventDefault();
      alert('Please enter a valid name.');
      return;
    }

    if (!phoneRegex.test(phone)) {
      e.preventDefault();
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    if (message.length < 10 || message.length > 300) {
      e.preventDefault();
      alert('Message must be between 10 and 300 characters.');
      return;
    }

    if (linkRegex.test(message)) {
      e.preventDefault();
      alert('Links are not allowed in the message.');
    }
  });
}
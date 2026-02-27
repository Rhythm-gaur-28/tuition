// Scroll to contact section if success/error message is present (after PRG redirect)
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

    // ✅ Clean URL immediately — reload won't show message or scroll again
    history.replaceState(null, '', window.location.pathname);
  }
})();


// Mobile nav toggle
const hamburger = document.querySelector('.js-hamburger');
const nav = document.querySelector('.js-nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close when a link is clicked
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Close when clicking anywhere outside the header
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.js-header')) {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
    }
  });
}


// Sticky header shrink on scroll
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


// Smooth scrolling for internal links
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


// Intersection Observer for scroll reveal
const observerOptions = {
  threshold: 0.15
};

const revealCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
};

const scrollObserver = new IntersectionObserver(revealCallback, observerOptions);
document.querySelectorAll('.observe').forEach((el) => scrollObserver.observe(el));


// Accordion behavior with smooth transitions
const accordionHeaders = document.querySelectorAll('.js-accordion-header');

accordionHeaders.forEach((headerBtn) => {
  headerBtn.addEventListener('click', () => {
    const item = headerBtn.parentElement;
    const bodyEl = item.querySelector('.accordion-body');
    const isOpen = item.classList.contains('open');

    // Close all others
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

// ===== PROGRESSIVE TESTIMONIAL SCROLLER =====
const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", "true");

    const inner = scroller.querySelector(".scroller__inner");
    const items = Array.from(inner.children);

    // Duplicate items
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      inner.appendChild(clone);
    });

    // Pause on touch (mobile)
    scroller.addEventListener("touchstart", () => {
      inner.style.animationPlayState = "paused";
    });

    scroller.addEventListener("touchend", () => {
      inner.style.animationPlayState = "running";
    });
  });
}

// Contact form client-side validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = contactForm.querySelector('#name');
    const phone = contactForm.querySelector('#phone');
    const studentClass = contactForm.querySelector('#studentClass');
    const message = contactForm.querySelector('#message');

    if (
      !name.value.trim() ||
      !phone.value.trim() ||
      !studentClass.value ||
      !message.value.trim()
    ) {
      e.preventDefault();
      alert('Please fill in all fields including your message before submitting.');
    }
  });
}

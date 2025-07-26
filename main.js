// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// About section tab navigation with enhanced effects
const aboutNav = document.querySelectorAll('.about-nav a');
const aboutContents = document.querySelectorAll('.about-content');
aboutNav.forEach(tab => {
  tab.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remove active class from all tabs
    aboutNav.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    this.classList.add('active');
    
    // Hide all content with fade effect
    aboutContents.forEach(c => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(20px)';
      setTimeout(() => c.style.display = 'none', 300);
    });
    
    // Show target content with fade effect
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      setTimeout(() => {
        target.style.display = 'block';
        setTimeout(() => {
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }, 50);
      }, 300);
    }
  });
});

// Show first about tab by default
if (aboutContents.length) {
  aboutContents.forEach((c, i) => {
    if (i === 0) {
      c.style.display = 'block';
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
      aboutNav[0].classList.add('active');
    } else {
      c.style.display = 'none';
      c.style.opacity = '0';
      c.style.transform = 'translateY(20px)';
    }
    c.style.transition = 'all 0.3s ease';
  });
}

// Hero slider logic
const slides = document.querySelectorAll('.hero-slider .slide');
const dots = document.querySelectorAll('.slider-controls .dot');
let currentSlide = 0;
let sliderInterval;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
    // Handle video playback
    if (slide.tagName === 'VIDEO') {
      if (i === idx) {
        slide.currentTime = 0;
        slide.play();
      } else {
        slide.pause();
        slide.currentTime = 0;
      }
    }
  });
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
  currentSlide = idx;
}
function nextSlide() {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
}
function startSlider() {
  sliderInterval = setInterval(nextSlide, 5000);
}
function stopSlider() {
  clearInterval(sliderInterval);
}
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    stopSlider();
    startSlider();
  });
});
if (slides.length) {
  showSlide(0);
  startSlider();
}

// Navbar background on scroll
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const heroSection = document.querySelector('.hero-section');
  const heroHeight = heroSection ? heroSection.offsetHeight : 100;
  
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Form submission with enhanced feedback
const forms = document.querySelectorAll('.contact-form');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<span>جاري الإرسال...</span>';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    // Simulate form submission
    setTimeout(() => {
      button.innerHTML = '<span>تم الإرسال بنجاح ✓</span>';
      button.style.background = 'linear-gradient(45deg, #4caf50, #45a049)';
      
      // Reset form
      this.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        button.style.opacity = '1';
        button.style.background = '';
      }, 3000);
    }, 2000);
  });
});

// Scroll animations for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.6s ease';
  observer.observe(section);
});

// Add hover effects to project cards and certificates
document.querySelectorAll('.project-card, .certificate').forEach((card, index) => {
  card.style.setProperty('--i', index);
  
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Enhanced navigation highlighting
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Enhanced slider with touch support
let startX = 0;
let endX = 0;

const sliderContainer = document.querySelector('.hero-slider');
if (sliderContainer) {
  sliderContainer.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  });

  sliderContainer.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
      stopSlider();
      if (diff > 0) {
        // Swipe left - next slide
        nextSlide();
      } else {
        // Swipe right - previous slide
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
      }
      startSlider();
    }
  }
}

// Hero elements are now part of the hero section and scroll naturally

// Dynamic loading animation for cards
function animateOnScroll() {
  const cards = document.querySelectorAll('.project-card, .certificate, .service-category');
  
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible && !card.classList.contains('animated')) {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
        card.classList.add('animated');
      }, index * 100);
    }
  });
}

// Initialize card animations
document.querySelectorAll('.project-card, .certificate, .service-category').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px) scale(0.95)';
  card.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Enhanced form validation with visual feedback
forms.forEach(form => {
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });
});

function validateField(field) {
  const value = field.value.trim();
  const isEmail = field.type === 'email';
  const isRequired = field.hasAttribute('required');
  
  // Remove previous validation classes
  field.classList.remove('error', 'success');
  
  if (isRequired && !value) {
    field.classList.add('error');
    return false;
  }
  
  if (isEmail && value && !isValidEmail(value)) {
    field.classList.add('error');
    return false;
  }
  
  if (value) {
    field.classList.add('success');
  }
  
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add CSS for form validation
const validationStyles = `
  .contact-form input.error,
  .contact-form textarea.error {
    border-color: #f44336;
    box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
  }
  
  .contact-form input.success,
  .contact-form textarea.success {
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = validationStyles;
document.head.appendChild(styleSheet);

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

// Initialize counters when hero section is visible
const heroStatsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statItems = entry.target.querySelectorAll('.stat-item');
      statItems.forEach(item => {
        const numberElement = item.querySelector('.stat-number');
        const targetCount = parseInt(item.dataset.count);
        animateCounter(numberElement, targetCount);
      });
      heroStatsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  heroStatsObserver.observe(heroStats);
}

// Enhanced dot navigation with data attributes
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    const slideIndex = parseInt(dot.dataset.slide);
    showSlide(slideIndex);
    stopSlider();
    startSlider();
  });
});

// Smooth reveal animations for sections
function revealOnScroll() {
  const reveals = document.querySelectorAll('section');
  
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

// Add reveal styles
const revealStyles = `
  section {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease;
  }
  
  section.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-section {
    opacity: 1 !important;
    transform: none !important;
  }
`;

const revealStyleSheet = document.createElement('style');
revealStyleSheet.textContent = revealStyles;
document.head.appendChild(revealStyleSheet);

// Initialize reveal on load
document.addEventListener('DOMContentLoaded', revealOnScroll);

 
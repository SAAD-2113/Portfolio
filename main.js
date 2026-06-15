// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileBtn.addEventListener('click', () => {
  mobileBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileBtn.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Smooth Scrolling for anchor links (if browser doesn't support CSS smooth scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for Scroll Animations (Fade-in)
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const fadeElements = document.querySelectorAll('.fade-in, .skill-item');

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate stat counters if this is the achievements section
      if (entry.target.id === 'achievements' || entry.target.classList.contains('achievements')) {
        animateCounters();
      }
      
      // Stop observing once animated
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => {
  fadeObserver.observe(el);
});

// Stat Counters Animation
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // The lower the slower

  counters.forEach(counter => {
    const animate = () => {
      const value = +counter.getAttribute('data-target');
      const data = +counter.innerText;
      
      const time = value / speed;
      
      if (data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 100);
      } else {
        counter.innerText = value;
      }
    }
    animate();
  });
  
  countersAnimated = true;
}

// Active Nav Link updating on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').includes(current)) {
      item.classList.add('active');
    }
  });
});

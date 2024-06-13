let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
  navbar.classList.toggle('active');
  loginForm.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
  navbar.classList.remove('active');
}

window.onscroll = () =>{
  navbar.classList.remove('active');
  loginForm.classList.remove('active');
}

var swiper = new Swiper(".review-slider",{
  spaceBetween: 20,
  centeredSlides: true,
  grabCursor: true,
  autoplay:{
    delay: 7500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll('.animate');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.setProperty('--animate-delay', entry.target.dataset.delay || '0s');
              entry.target.classList.add('fade-in');
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.1
  });

  animateElements.forEach(element => {
      observer.observe(element);
  });
});


function animateCount(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
          window.requestAnimationFrame(step);
      }
  };
  window.requestAnimationFrame(step);
}

// Observer callback to start the animation when the element enters the viewport
function handleIntersect(entries, observer) {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          animateCount(counter, 0, target, 3000);
          observer.unobserve(counter); // Stop observing once the animation has started
      }
  });
}

// Intersection Observer options
const observerOptions = {
  root: null, // Use the viewport as the root
  threshold: 0.1 // Trigger when 10% of the element is visible
};

// Create the observer
const observer = new IntersectionObserver(handleIntersect, observerOptions);

// Observe each counter element
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
      observer.observe(counter);
  });
});
// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀︎' : '☾';
}

// Toggle Theme
themeToggle.addEventListener('click', () => {
  if (body.getAttribute('data-theme') === 'dark') {
    body.setAttribute('data-theme', 'light');
    themeToggle.textContent = '☾';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀︎';
    localStorage.setItem('theme', 'dark');
  }
});

// Form Submission
document.getElementById('ticket-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for purchasing tickets!');
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Thank you for contacting us!');
});

// Responsive Navigation Bar
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('open');
  });
});
// trailer 
const video = document.getElementById('trailer-video');
const playButton = document.getElementById('play-button');

playButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playButton.style.display = 'none';
    }
});

video.addEventListener('pause', () => {
    playButton.style.display = 'block';
});
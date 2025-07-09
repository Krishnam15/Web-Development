// ===== Slideshow Functionality =====
const slides = document.querySelectorAll('.slide');
const tagline = document.querySelector('.tagline');
const taglines = [
    "Fast-track your savings goals.",
    "Your Money, Your Rules, Our Dashboard!",
    "Spend Smart, Save Large, Smile Wide :-)"
];

let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    tagline.textContent = taglines[index];
}
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// ===== Toggle Forms and Messages =====
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginMessage = document.getElementById('login-message');
    const signupMessage = document.getElementById('signup-message');

    const isLoginVisible = !loginForm.classList.contains('hidden');

    // Toggle form visibility
    loginForm.classList.toggle('hidden', isLoginVisible);
    signupForm.classList.toggle('hidden', !isLoginVisible);

    // Toggle message visibility
    loginMessage.classList.toggle('hidden', isLoginVisible);
    signupMessage.classList.toggle('hidden', !isLoginVisible);
}

// ===== Form Submission Handling =====
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Redirect or login logic here
    window.location.href = "dashboard.html";
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('new-password').value;
    const confirm = document.getElementById('confirm-password').value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    // Handle signup logic here
    alert("Signup successful!");
    window.location.href = "dashboard.html";
});
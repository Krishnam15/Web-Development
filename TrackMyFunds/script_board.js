const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const wrapper = document.getElementById("wrapper");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
    wrapper.classList.toggle("sidebar-hidden");
});

// Show current date
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
document.getElementById("day-name").textContent = formattedDate;

const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active')); // Remove from all
        btn.classList.add('active'); // Add to clicked one
    });
});
document.querySelector('.icon-btn[title="Search"]').onclick = () => {
    alert("Search clicked");
};

document.addEventListener("DOMContentLoaded", function() {
    lucide.createIcons(); // Initialize all <i data-lucide="..."> icons
});
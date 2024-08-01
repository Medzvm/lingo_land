document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
});
document.getElementById('logo').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    window.location.reload(); // Reload the page
});
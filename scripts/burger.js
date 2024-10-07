const hamburger = document.querySelector('.hamburger');
const burgerContent = document.querySelector('.burger-content');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    burgerContent.classList.toggle('active');
});
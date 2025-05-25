
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');

showRegisterBtn.addEventListener('click', () => {
    loginSection.classList.remove('active');
    registerSection.classList.add('active');
});

showLoginBtn.addEventListener('click', () => {
    registerSection.classList.remove('active');
    loginSection.classList.add('active');
});
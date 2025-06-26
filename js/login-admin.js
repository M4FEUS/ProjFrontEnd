// Credenciais de acesso
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

// Função para verificar login
function checkLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Login bem-sucedido
        sessionStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin.html';
    } else {
        // Login falhou
        alert('Credenciais inválidas. Por favor, tente novamente.');
        document.getElementById('password').value = '';
    }
}

// Função para verificar se o usuário está logado
function checkAdminAccess() {
    if (!sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login-admin.html';
    }
}

// Função para logout
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'login-admin.html';
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Se estamos na página de login
    if (loginForm) {
        loginForm.addEventListener('submit', checkLogin);
    }
    
    // Se estamos na página admin
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
        checkAdminAccess(); // Verificar acesso
    }
    
    // Inicializar menu mobile em todas as páginas
    initMobileMenu();
});

// Função para inicializar o menu mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Variáveis globais
const LOCAL_STORAGE_KEY = 'tutoriae_volunteers';
let volunteers = [];

// Verificar acesso ao admin
function checkAdminAccess() {
    if (!sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login-admin.html';
    } else {
        // Exibe o conteúdo do body se o admin estiver logado
        document.body.style.display = '';
    }
}

// Função para logout
function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'login-admin.html';
}

// Funções de gerenciamento do Local Storage
function loadVolunteers() {
    const storedVolunteers = localStorage.getItem(LOCAL_STORAGE_KEY);
    volunteers = storedVolunteers ? JSON.parse(storedVolunteers) : [];
    renderVolunteerList(volunteers);
}

function saveVolunteers() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(volunteers));
}

// Funções de manipulação do formulário
function addVolunteer(event) {
    event.preventDefault();
    
    const volunteerName = document.getElementById('volunteerName');
    const volunteerEmail = document.getElementById('volunteerEmail');
    
    const name = volunteerName.value.trim();
    const email = volunteerEmail.value.trim();
    const area = document.getElementById('volunteerArea').value;
    const resume = document.getElementById('volunteerResume').value.trim();
    const availability = document.getElementById('volunteerAvailability').value.trim();
    
    if (!name || !email) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
   const newVolunteer = {
    id: Date.now().toString(),
    name,
    email,
    area,
    resume,
    availability,
    date: new Date().toLocaleDateString('pt-BR')
};
    
    volunteers.push(newVolunteer);
    saveVolunteers();
    clearForm();
    renderVolunteerList(volunteers);
}

function clearForm() {
    document.getElementById('volunteerName').value = '';
    document.getElementById('volunteerEmail').value = '';
    document.getElementById('volunteerArea').value = '';
    document.getElementById('volunteerResume').value = '';
    document.getElementById('volunteerAvailability').value = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Funções de manipulação da lista
function renderVolunteerList(volunteersToRender) {
    const volunteerList = document.getElementById('volunteerList');
    const noVolunteers = document.getElementById('noVolunteers');
    
    volunteerList.innerHTML = '';
    
    if (volunteersToRender.length === 0) {
        noVolunteers.style.display = 'block';
        return;
    }
    
    noVolunteers.style.display = 'none';
    
    volunteersToRender.forEach(volunteer => {
        const listItem = document.createElement('li');
        listItem.className = 'volunteer-item';
      listItem.innerHTML = `
    <div class="volunteer-info">
        <div class="volunteer-date">${volunteer.date}</div>
        <div class="volunteer-name"><strong>Nome:</strong> ${volunteer.name}</div>
        <div class="volunteer-email"><strong>Email:</strong> ${volunteer.email}</div>
        <div class="volunteer-area"><strong>Área de Interesse:</strong> ${volunteer.area}</div>
        <div class="volunteer-availability"><strong>Disponibilidade:</strong> ${volunteer.availability}</div>
        ${volunteer.resume ? `<div class="volunteer-resume"><strong>Currículo:</strong> <a href="${volunteer.resume}" target="_blank">Ver Link</a></div>` : ""}
    </div>
    <button class="delete-btn" data-id="${volunteer.id}">
        <i class="fas fa-trash"></i>
    </button>
`;
        volunteerList.appendChild(listItem);
    });
    
    // Adicionar event listeners aos botões de exclusão
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            deleteVolunteer(this.getAttribute('data-id'));
        });
    });
}

function deleteVolunteer(id) {
    if (confirm('Tem certeza que deseja excluir este voluntário?')) {
        volunteers = volunteers.filter(volunteer => volunteer.id !== id);
        saveVolunteers();
        renderVolunteerList(volunteers);
    }
}

function deleteAllVolunteers() {
    if (volunteers.length === 0) {
        alert('Não há voluntários para excluir.');
        return;
    }
    
    if (confirm('Tem certeza que deseja excluir TODOS os voluntários? Esta ação não pode ser desfeita.')) {
        volunteers = [];
        saveVolunteers();
        renderVolunteerList(volunteers);
    }
}

// Funções de pesquisa
function searchVolunteers() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('Por favor, digite um termo para pesquisar.');
        return;
    }
    
    const filteredVolunteers = volunteers.filter(volunteer => 
        volunteer.name.toLowerCase().includes(searchTerm) || 
        volunteer.email.toLowerCase().includes(searchTerm)
    );
    
    renderVolunteerList(filteredVolunteers);
    
    if (filteredVolunteers.length === 0) {
        const noVolunteers = document.getElementById('noVolunteers');
        noVolunteers.innerHTML = '<p>Nenhum resultado encontrado para a pesquisa.</p>';
        noVolunteers.style.display = 'block';
    }
}

function showAllVolunteers() {
    document.getElementById('searchInput').value = '';
    renderVolunteerList(volunteers);
}

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

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Verificar acesso
    checkAdminAccess();
    
    // Inicializar menu mobile
    initMobileMenu();
    
    // Carregar voluntários do Local Storage
    loadVolunteers();
    
    // Adicionar event listeners
    const volunteerForm = document.getElementById('volunteerForm');
    const clearBtn = document.getElementById('clearBtn');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const searchBtn = document.getElementById('searchBtn');
    const showAllBtn = document.getElementById('showAllBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', addVolunteer);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearForm);
    }
    
    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', deleteAllVolunteers);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', searchVolunteers);
    }
    
    if (showAllBtn) {
        showAllBtn.addEventListener('click', showAllVolunteers);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

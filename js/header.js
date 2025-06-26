// Função para mostrar/atualizar o usuário
function mostrarUsuario() {
    const usuarioId = localStorage.getItem('usuarioLogadoId');
    const usuarios = JSON.parse(localStorage.getItem('usuariosLista')) || [];
    const usuario = usuarios.find(u => u.id == usuarioId);
    
    // Seleciona o dropdown CORRETO (do usuário)
    const dropdown = document.querySelector('.icons-header-user .dropdown ul');
    
    if (usuario && dropdown) {
        const primeiroNome = usuario.nomeCadastro.split(' ')[0];
        dropdown.innerHTML = `
            <li>Bem-vindo, ${primeiroNome}!</li>
            <li>${usuario.emailCadastro}</li>
        `;
    } else if (dropdown) {
        dropdown.innerHTML = `
            <li>Visitante</li>
            <li>Faça login</li>
        `;
    }
}

// Função de logout
function fazerLogout() {
    localStorage.removeItem('usuarioLogadoId');
    mostrarUsuario(); // Atualiza a exibição
    window.location.href = 'index.html';
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    mostrarUsuario();
    
    // Adiciona o listener para o botão de logout
    const logoutBtn = document.querySelector('.icons-header-user .dropdown a[onclick="fazerLogout()"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', fazerLogout);
    }
});

// Monitora mudanças entre abas
window.addEventListener('storage', (e) => {
    if (e.key === 'usuarioLogadoId') {
        mostrarUsuario();
    }
});

window.addEventListener('usuarioLogado', mostrarUsuario);
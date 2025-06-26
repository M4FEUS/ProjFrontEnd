// função para salvar as credenciais do usuário
function setarCredenciais(event, usuariosSalvos, senhasSalvas) {
    event.preventDefault();

    let credenciais = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }

    // verifica se já existe um usuário com o e-mail
    
}

function getUsuarios() {
    let usuariosSalvos = localStorage.getItem('emailCadastro');
    let senhasSalvas = localStorage.getItem('senhaCadastro');

    return usuariosSalvos, senhasSalvas;
}
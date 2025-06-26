// função para salvar as credenciais do usuário
function setarCredenciais(event) {
    event.preventDefault();

    let credenciais = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }

    // recupera a lista de usuários do localStorage
    let usuariosLista = JSON.parse(localStorage.getItem('usuariosLista')) || [];
    
    // verifica se já existe um usuário com o e-mail
    let usuarioEncontrado = usuariosLista.find(usuario => usuario.emailCadastro === credenciais.email);

    if (!usuarioEncontrado) {
        alert('E-mail não cadastrado');
        document.getElementById('email').value = '';
        document.getElementById('senha').value = '';
        return ;
    }

    // verifica se a senha está correta
    if (usuarioEncontrado.senhaCadastro !== credenciais.senha) {
        alert('Senha incorreta!');
        document.getElementById('senha').value = '';
        return ;
    }

    // armazena o id do usuário logado no localStorage
    localStorage.setItem('usuarioLogadoId', usuarioEncontrado.id);
    window.dispatchEvent(new Event('usuarioLogado'));
    window.location.href = 'home.html';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', setarCredenciais);
});
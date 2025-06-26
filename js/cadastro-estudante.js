// função para setar as credenciais
var usuariosLista = JSON.parse(localStorage.getItem('usuariosLista')) || [];

// Calcula o próximo ID baseado nos usuários existentes
function getNextId() {
    if (usuariosLista.length === 0) return 1;
    const maxId = Math.max(...usuariosLista.map(usuario => usuario.id));
    return maxId + 1;
}

function addCredenciaisCadastro(event) {
    event.preventDefault();

    let credenciaisCadastro = {
        id: getNextId(),
        nomeCadastro: document.getElementById('nome').value,
        emailCadastro: document.getElementById('email').value,
        telefoneCadastro: document.getElementById('telefone').value,
        dataNascimentoCadastro: document.getElementById('data_nascimento').value,
        senhaCadastro: document.getElementById('senha').value,
        senhaConfirmadaCadastro: document.getElementById('confirmar_senha').value
    }

    // verifica se o e-mail já está cadastrado
    let emailExistente = usuariosLista.some(usuario => usuario.emailCadastro === credenciaisCadastro.emailCadastro);

    if (emailExistente) {
        alert('Este e-mail já está cadastrado!');
        return ;
    }
    

    // verificação de se as senhas são iguais
    let senhasIguais = (credenciaisCadastro.senhaCadastro === credenciaisCadastro.senhaConfirmadaCadastro);
    if (!senhasIguais) {
        alert('As senhas devem ser iguais!');

        document.getElementById('senha').value = '';
        document.getElementById('confirmar_senha').value = '';

        return ;
    }

    // verifica se o usuário aceita os termos
    let termos = document.getElementById('termos').checked;
    if (!termos) {
        alert('Você deve concordar com os nossos Termos de Uso e Política de Privacidade.');
        return;
    }

    // adiciona o usuário
    usuariosLista.push(credenciaisCadastro);

    let usuarioNovo = localStorage.setItem('usuariosLista', JSON.stringify(usuariosLista));
    console.log(usuarioNovo);

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadastroForm').addEventListener('submit', addCredenciaisCadastro);
});
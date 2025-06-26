// função para setar as credenciais

var usuariosLista = [];
var count = 1;

function addCredenciaisCadastro(event) {
    event.preventDefault();

    let credenciaisCadastro = {
        id: count++,
        nomeCadastro: document.getElementById('nome').value,
        emailCadastro: document.getElementById('email').value,
        telefoneCadastro: document.getElementById('telefone').value,
        dataNascimentoCadastro: document.getElementById('data_nascimento').value,
        senhaCadastro: document.getElementById('senha').value,
        senhaConfirmadaCadastro: document.getElementById('confirmar_senha').value
    }

    // verificação de se as senhas são iguais
    let senhasIguais = (credenciaisCadastro.senhaCadastro === credenciaisCadastro.senhaConfirmadaCadastro);
    if (!senhasIguais) {
        alert('As senhas devem ser iguais!');
        return ;
    }

    // verifica se o usuário aceita os termos
    let termos = document.getElementById('termos').value;
    if(termos !== true) {
        alert('Você deve concordar com os nossos Termos de Uso e Política de Privacidade.');
        return ;
    }

    // adiciona o usuário
    usuariosLista.push(credenciaisCadastro);

    let usuarioNovo = localStorage.setItem('usuariosLista', JSON.stringify(usuariosLista));
    console.log(usuarioNovo);
}
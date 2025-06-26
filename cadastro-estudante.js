// função para setar o cadastro
function setarCadastro(event) {
    event.preventDefault()

    let cadastroEstudantes = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementsById('telefone').value,
        dataNascimento: document.getElementById('data_nascimento').value,
        senha: document.getElementById('senha').value,
        senhaConfirmar: document.getElementById('confirmar_senha').value,
        interesse: document.getElementsByClassName('interesse').value
    };

    let setCadastroEstudantes = localStorage.setItem('cadastroEstudantes', JSON.stringify(cadastroEstudantes));

    let termos = document.getElementById('termos').value;

    if(!termos) {
        alert('Precisa aceitar os Termos de Uso e a Política de Privacidade');
    }

    if (senha !== senhaConfirmar) {
        alert('As senhas não são iguais');
        return ;
    } 

}
// função para setar as credenciais
function setarCredenciais(event) {
    event.preventDefault();

    let credenciais = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };

    if (credenciais.email == '' && credenciais.senha == '') {
        alert('Digite suas credenciais de acesso!');
        return ;
    } else if (credenciais.email == '') {
        alert('Digite um e-mail para prosseguir!');
        return ;
    }  else if (credenciais.senha == '') {
        alert('Digite uma senha para prosseguir!');
        return ;
    } else {
        alert('Acesso liberado!');
    }

    let setCredenciais = localStorage.setItem('credenciais', JSON.stringify(credenciais));
    console.log('setCredenciais');
    
    window.location.href = 'home.html';
}
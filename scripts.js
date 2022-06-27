let usuario = {
    name: ""
};
let estado = 0;

login();

function login () {
    
    usuario.name = prompt("Digite seu nome:");

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);    

    promise.then(usuarioLogou);
    promise.catch(trataErroLogin);    
}

function usuarioLogou () {
    console.log("entrou");
}

function trataErroLogin (erro){
    estado = Number(erro.response.status);
    if (estado !== 200){
        alert("Já existe alguém com esse nome");
        login();
    }    
}
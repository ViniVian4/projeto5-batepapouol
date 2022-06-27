let usuario = {
    name: ""
};
let estado = 0;
let chat = ``;

login();

function login () {
    
    usuario.name = prompt("Digite seu nome:");

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);    

    promise.then(usuarioLogou);
    promise.catch(trataErroLogin);    
}

function usuarioLogou () {
    console.log("entrou");

    setInterval(mantemLogado, 5000);
    setInterval(buscaMsg, 3000);
}

function trataErroLogin (erro){
    estado = Number(erro.response.status);
    if (estado !== 200){
        alert("Já existe alguém com esse nome");
        login();
    }    
}

function mantemLogado () {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", usuario);
    console.log("ta logado");
}

function buscaMsg (){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(atualizaChat);
}

function atualizaChat(promessa) {
    const svChat = promessa.data;
    for (let i = 0; i < svChat.length; i++) {
        if (svChat[i].type === "status")
            chat = chat + `<div class="status"><p><span class="time">${svChat[i].time}</span> <span class="name">${svChat[i].from}</span> <span>${svChat[i].text}</span> </p> </div>`;

        else if (svChat[i].type === "message")
            chat = chat + `<div class="message"><p><span class="time">${svChat[i].time}</span> <span class="name">${svChat[i].from}</span> para <span class="nome">${svChat[i].to}</span>: <span>${svChat[i].text}</span> </p> </div>`;
        
        else if (svChat[i].type === "private_message" && svChat[i].to === usuario.name)
            chat = chat + `<div class="private_message"><p><span class="time">${svChat[i].time}</span> <span class="name">${svChat[i].from}</span> para <span class="name">${svChat[i].to}</span>: <span>${svChat[i].text}</span> </p> </div>`;
    }
    document.querySelector(".caixa-de-mensagens").innerHTML = chat;
    autoScroll();
}

function autoScroll () {
    const aux = document.querySelector(".caixa-de-mensagens");
    const aux2 = aux.querySelectorAll("div");
    const last = aux2[aux2.length - 1];

    last.scrollIntoView();
    console.log("atualizou chat");
}

function enviaMsg () {
    let texto = String(document.querySelector(".texto-msg").value);
    let msg = {
        from: usuario.name,
        to: "todos",
        text: texto,
        type: "message"
    };
    
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", msg);
}
let listaDeNumerosSorteados = [];
let numeroLimite = 20;
let numeroSecreto = gerarAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Male', {rate:1.3});
}

function exibirMensagemInicial() {
    exibirTexto('h1', 'Jogo da Advinhação Mil Grau');
    exibirTexto('p', `Escolha um número de 1 a ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Meus parabéns, doido! Você acertou com ${tentativas} ${palavraTentativa}.`;
        exibirTexto('h1', 'Você ganhou!');
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute>numeroSecreto) {
            exibirTexto ('p', 'O número secreto é menor.');
        } else {
            exibirTexto ('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarAleatorio() {
    let numeroEscolhido = parseInt(Math.random ()*numeroLimite+1);
    let quantidadeDeElemntosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElemntosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarAleatorio()
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function rJogo() {
    numeroSecreto = gerarAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

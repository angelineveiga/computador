import {
    criarJogo,
    verificarTentativa,
    gerarHistorico,
    normalizarTexto
} from "./jogo.js";

const formulario = document.querySelector("#formulario");
const campoTentativa = document.querySelector("#tentativa");
const mensagem = document.querySelector("#mensagem");
const historico = document.querySelector("#historico");
const botaoReiniciar = document.querySelector("#reiniciar");

let jogo = criarJogo();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const entrada = campoTentativa.value;

    // Exemplo de uso do replace() para normalizar textos.
    const entradaNormalizada = normalizarTexto(entrada);

    const resultado = verificarTentativa(jogo, entradaNormalizada);

    mensagem.textContent = resultado.mensagem;

    historico.textContent =
        `Tentativas: ${gerarHistorico(jogo.tentativas)}`;

    if (resultado.terminou) {
        campoTentativa.disabled = true;
        formulario.querySelector("button").disabled = true;
    }

    campoTentativa.value = "";
    
    if (!resultado.terminou) {
        campoTentativa.focus();
    }
});

botaoReiniciar.addEventListener("click", () => {
    jogo = criarJogo();

    campoTentativa.disabled = false;
    formulario.querySelector("button").disabled = false;
    campoTentativa.value = "";

    mensagem.textContent = "Novo jogo iniciado! Você tem 7 tentativas.";
    historico.textContent = "Tentativas: nenhuma";

    campoTentativa.focus();
}); 
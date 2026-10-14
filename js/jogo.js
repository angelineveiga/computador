javascript

import { sortearNumero } from "./sorteio.js";

const MAX_TENTATIVAS = 7;

export function criarJogo() {
    return {
        numeroSecreto: sortearNumero(1, 100),
        tentativas: [],
        encerrado: false
    };
}

export function normalizarTexto(texto) {
    return texto
        .trim()
        .toLowerCase()
        .replace(/[áàãâ]/g, "a")
        .replace(/[éê]/g, "e")
        .replace(/[í]/g, "i")
        .replace(/[óôõ]/g, "o")
        .replace(/[ú]/g, "u")
        .replace(/[ç]/g, "c");
}

export function verificarTentativa(jogo, valor) {
    if (jogo.encerrado) {
        return {
            mensagem: "O jogo terminou. Inicie um novo jogo!",
            terminou: true
        };
    }

    if (valor === "" || !Number.isInteger(Number(valor))) {
        return {
            mensagem: "Digite um número inteiro válido.",
            terminou: false
        };
    }

    const numero = Number(valor);

    if (numero < 1 || numero > 100) {
        return {
            mensagem: "Digite um número entre 1 e 100.",
            terminou: false
        };
    }

    if (jogo.tentativas.includes(numero)) {
        return {
            mensagem: "Você já tentou esse número. Escolha outro!",
            terminou: false
        };
    }

    jogo.tentativas.push(numero);

    if (numero === jogo.numeroSecreto) {
        jogo.encerrado = true;

        return {
            mensagem: `Parabéns! Você acertou em ${jogo.tentativas.length} tentativa(s)!`,
            terminou: true
        };
    } else if (numero < jogo.numeroSecreto) {
        // Condicional: o palpite é menor que o número secreto.
        if (jogo.tentativas.length >= MAX_TENTATIVAS) {
            jogo.encerrado = true;

            return {
                mensagem: `Fim de jogo! O número secreto era ${jogo.numeroSecreto}.`,
                terminou: true
            };
        }

        return {
            mensagem: "O número secreto é MAIOR. Tente novamente!",
            terminou: false
        };
    } else {
        // Condicional: o palpite é maior que o número secreto.
        if (jogo.tentativas.length >= MAX_TENTATIVAS) {
            jogo.encerrado = true;

            return {
                mensagem: `Fim de jogo! O número secreto era ${jogo.numeroSecreto}.`,
                terminou: true
            };
        }

        return {
            mensagem: "O número secreto é MENOR. Tente novamente!",
            terminou: false
        };
    }
}

export function gerarHistorico(tentativas) {
    let resultado = "";

    for (const tentativa of tentativas) {
        resultado += `${tentativa}, `;
    }

    // Remove a última vírgula e o espaço usando replace().
    resultado = resultado.replace(/, $/, "");

    return resultado || "nenhuma";
}
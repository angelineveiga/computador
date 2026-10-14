javascript

export function sortearNumero(minimo = 1, maximo = 100) {
    return Math.floor(
        Math.random() * (maximo - minimo + 1)
    ) + minimo;
}
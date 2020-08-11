function sumar(a,b) {
    // suma 2 numeros
    return a + b;
}

console.log(sumar.toString())

function Automovil(modelo, color) {
    this.modelo = modelo;
    this.color = color;
}

Automovil.prototype.toString = function autoString() {
    const datos = `Auto: ${this.modelo} y color ${this.color}`;
    return datos;
}

const auto = new Automovil('Camaro', 'Negro');
console.log( auto.toString() );
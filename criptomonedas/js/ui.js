class Interfaz {
    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }

    construirSelect() {
        cotizador.obtenerMonedasApi()
            .then(monedas => {
                const select = document.querySelector('#criptomoneda');
                for (const [key, value] of Object.entries(monedas.Data)) {
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
            })
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarResultado(resultado, moneda, crypto) {

        const resultadoAnterior = document.querySelector('#resultado > div');
        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[crypto][moneda];
        let precio = datosMoneda.PRICE.toFixed(2);
        let porciento = datosMoneda.CHANGEPCTDAY.toFixed(2);
        let actualizacion = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');

        let templateHTML = `
            <div class = "card bg-warning">
                <div class = "card-body text-light">
                    <h2 class = "card-title text-light">Resultado: </h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a ${datosMoneda.TOSYMBOL} es de ${precio} </p>
                    <p>La variación del ultimo día es de % ${porciento} </p>
                    <p>La última actualización es de ${actualizacion} </p>
                    
                </div>
            </div>
        `;



        this.mostrarOcultarSpinner('block');
        setTimeout(() => {
            document.querySelector('#resultado').innerHTML = templateHTML;
            this.mostrarOcultarSpinner('none');
        }, 3000);

    }

    mostrarOcultarSpinner(vista) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }
}
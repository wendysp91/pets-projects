const formulario = document.querySelector('#formulario');

const cotizador = new Api('63177f706bc6dcef906fffc67d792c64ef83e4bc7ce9322679f7087969f268e0');
const ui = new Interfaz();

formulario.addEventListener('submit', e => {
     e.preventDefault();
     const monedas = document.querySelector('#moneda');
     const monedaSeleccionada = monedas.options[monedas.selectedIndex].value;

     const criptoMonedas = document.querySelector('#criptomoneda');
     const criptoMonedaSeleccionada = criptoMonedas.options[criptoMonedas.selectedIndex].value;
     if (monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
          ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
     } else {
          cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
               .then(data => {
                    console.log(data.RAW)
                    ui.mostrarResultado(data.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
               })
     }

});
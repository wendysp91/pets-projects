//constructor de seguro
function Seguro(marca, anno, tipo) {
     this.marca = marca;
     this.anno = anno;
     this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function () {
     // 1 americano = 1.15
     // 2 asiatico = 1.05
     // 3 europeo = 1.35
     const base = 2000;
     let cantidad;

     switch (this.marca) {
          case '1':
               cantidad = base * 1.15;
               break;
          case '2':
               cantidad = base * 1.05;
               break;
          case '3':
               cantidad = base * 1.35;
               break;
     }

     const diferencia = new Date().getFullYear() - this.anno;
     cantidad -= ((diferencia * 3) * cantidad) / 100

     if (this.tipo === 'basico') {
          cantidad *= 1.30;
     } else {
          cantidad *= 1.50;
     }
     return cantidad;
}


//todo lo que se muestra
function Interfaz() {}

Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
     const div = document.createElement('div');
     if (tipo === 'error') {
          div.classList.add('mensaje', 'error');
     } else {
          div.classList.add('mensaje', 'correcto');
     }
     div.innerHTML = `${mensaje}`;
     formulario.insertBefore(div, document.querySelector('.form-group'));
     setTimeout(() => {
          document.querySelector('.mensaje').remove();
     }, 3000);
}
Interfaz.prototype.mostrarResultado = function (seguro, total) {
     const resultado = document.getElementById('resultado');
     let marca;
     switch (seguro.marca) {
          case '1':
               marca = 'Americano'
               break;
          case '2':
               marca = 'Asiatico'
               break;
          case '3':
               marca = 'Europeo'
               break;
     }
     const div = document.createElement('div');
     div.innerHTML = `
     <p class='header'>Tu resumen: </p>
     <p>Marca: ${marca}</p>
     <p>Año: ${seguro.anno}</p>
     <p>Tipo de seguro: ${seguro.tipo}</p>
     <p>Total: ${total}</p>
     `;

     const spinner = document.querySelector('#cargando img');
     spinner.style.display = 'block';
     setTimeout(() => {
          spinner.style.display = 'none';
          resultado.appendChild(div);
     }, 3000);

}

const max = new Date().getFullYear(),
     min = max - 20;
const selectAnnos = document.getElementById('anio');
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function (e) {
     e.preventDefault();
     const marca = document.getElementById('marca');
     const marcaSeleccionada = marca.options[marca.selectedIndex].value;
     const anno = document.getElementById('anio');
     const annoSeleccionado = anno.options[anno.selectedIndex].value;
     const tipo = this.querySelector('input[name="tipo"]:checked').value

     const interfaz = new Interfaz();

     if (marcaSeleccionada === '' || annoSeleccionado === '' || tipo === '') {
          interfaz.mostrarMensaje('Faltan datos, revisa el formulario', 'error');
     } else {
          const resultados = this.querySelector('#resultado div');
          if (resultados != null) {
               resultados.remove();
          }

          const seguro = new Seguro(marcaSeleccionada, annoSeleccionado, tipo);
          const cantidad = seguro.cotizarSeguro(seguro);
          interfaz.mostrarResultado(seguro, cantidad);
          interfaz.mostrarMensaje('Cotizando...', 'exito');
     }
});

for (let index = max; index > min; index--) {

     let option = document.createElement('option');
     option.value = index;
     option.innerHTML = index;
     selectAnnos.appendChild(option);

}
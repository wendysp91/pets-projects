// Variables
const presupuestoUsuario = prompt('Cual es tu presupuesto Semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;


// Clases
class Presupuesto {
     constructor(presupuesto) {
          this.presupuesto = Number(presupuesto);
          this.restante = Number(presupuesto);
     }
     presupuestoRestante(cantidad = 0) {
          return this.restante -= Number(cantidad);
     }
}
class Interfaz {

     insertarPresupuesto(cantidad) {
          const presupuestoSpan = document.querySelector('span#total');
          const restanteSpan = document.querySelector('span#restante');

          presupuestoSpan.innerHTML = `${cantidad}`;
          restanteSpan.innerHTML = `${cantidad}`;
     }
     imprimirMensaje(mensaje, tipo) {
          const divMensaje = document.createElement('div');
          divMensaje.classList.add('text-center', 'alert');
          if (tipo === 'error') {
               divMensaje.classList.add('alert-danger');
          } else {
               divMensaje.classList.add('alert-success');
          }
          divMensaje.appendChild(document.createTextNode(mensaje));
          document.querySelector('.primario').insertBefore(divMensaje, formulario);

          setTimeout(() => {
               document.querySelector('.primario .alert').remove();
               formulario.reset()
          }, 3000);
     }
     agregarGastoListado(nombreGasto, cantidadGasto) {
          const gastosListado = document.querySelector('#gastos ul');

          const li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between align-items-center';
          li.innerHTML = `
          ${nombreGasto}
          <span class = "badge badge-primary badge-pill">$ ${cantidadGasto}</span>
          `;

          gastosListado.appendChild(li);
     }
     cantidadRestante(cantidadGasto) {
          const restante = document.querySelector('span#restante');
          const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidadGasto);
          restante.innerHTML = `${presupuestoRestanteUsuario}`;

          this.comprobarPresupuesto();
     }
     comprobarPresupuesto() {
          const presupuestoTotal = cantidadPresupuesto.presupuesto;
          const presupuestoRestante = cantidadPresupuesto.restante;

          if ((presupuestoTotal / 4) > presupuestoRestante) {
               const restante = document.querySelector('.restante');
               restante.classList.remove('alert-succes', 'alert-warning');
               restante.classList.add('alert-danger');
          } else if ((presupuestoTotal / 2) > presupuestoRestante) {
               const restante = document.querySelector('.restante');
               restante.classList.remove('alert-succes');
               restante.classList.add('alert-warning');
          }

     }
}




//listeners
document.addEventListener('DOMContentLoaded', () => {
     if (presupuestoUsuario === null || presupuestoUsuario === '') {
          window.location.reload();
     } else {
          cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
          const ui = new Interfaz();
          ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
     }
});

formulario.addEventListener('submit', (e) => {
     e.preventDefault();
     const nombreGasto = document.querySelector('#gasto').value;
     const cantidadGasto = document.querySelector('#cantidad').value;
     const ui = new Interfaz();

     if (nombreGasto === '' || cantidadGasto === '') {
          ui.imprimirMensaje('Hubo un error', 'error');
     } else {
          ui.imprimirMensaje('Correcto', 'correcto');
          ui.agregarGastoListado(nombreGasto, cantidadGasto);
          ui.cantidadRestante(cantidadGasto);
     }
})
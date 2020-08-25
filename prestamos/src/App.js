import React, { Fragment, useState } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Mensajes from './componentes/Mensajes';
import Resultado from './componentes/Resultado';

function App() {

  const [cantidad, guardarCantidad] = useState(0);
  const [plazo, guardarPlazo] = useState('');
  const [total, guardarTotal] = useState(0);

  let componente;
  if (total === 0) {
    componente = <Mensajes />
  } else {
    componente = <Resultado 
    cantidad = {cantidad}
    plazo = {plazo}
    total = {total}
    />
  }

  return (
    <Fragment>
      <Header 
      titulo = "Cotizador de prestamos"
      />

      <div className= "container">
        <Formulario 
        cantidad = {cantidad}
        guardarCantidad = {guardarCantidad}
        plazo = {plazo}
        guardarPlazo = {guardarPlazo}
        total = {total}
        guardarTotal = {guardarTotal}
        />
        <div className = "mensajes">
          {componente}
        </div>
  
      </div>
    </Fragment>
  );
}

export default App;
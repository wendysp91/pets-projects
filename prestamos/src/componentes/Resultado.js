import React from 'react';
 const Resultado = ({total, plazo, cantidad}) => {
     return ( 
         <div className = "u-full-width resultado">
             <h2>Resumen</h2>
     <p>La cantidad solicitada es {cantidad}</p>
     <p>El plazo solicitado es {plazo} meses</p>
     <p>El total a cotizar es $ {total}</p>
     <p>El pago mensual es de $ {(total/plazo).toFixed(2)}</p>
         </div>
      );
 }
  
 export default Resultado;
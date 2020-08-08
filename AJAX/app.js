function cargarDatos() {
     //crear objeto XMLHttpRequest
     const xhr = new XMLHttpRequest();

     //abrir conexion
     xhr.open('GET', 'datos.txt', true);

     //una vez que carga
     xhr.onreadystatechange = function () {

          // ready status
          /*
          0 - No inicializado
          1.- Conexion establecida
          2.- Recibido
          3: Procesando
          4: Respuesta lista
          */
          if (this.readyState === 4 && this.status === 200) {

          }
     }
     xhr.send();
}
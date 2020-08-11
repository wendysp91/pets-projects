let DB;
//Selectores de la interfaz
const form = document.querySelector('form'),
    mascota = document.querySelector('#mascota'),
    cliente = document.querySelector('#cliente'),
    telefono = document.querySelector('#telefono'),
    fecha = document.querySelector('#fecha'),
    hora = document.querySelector('#hora'),
    sintomas = document.querySelector('#sintomas'),
    citas = document.querySelector('#citas'),
    heading = document.querySelector('#administra');

document.addEventListener('DOMContentLoaded', () => {
    //crear la base de datos
    let crearDB = window.indexedDB.open('citas', 1);

    //si hay un error mandarlo a la consola
    crearDB.onerror = function () {
        console.log('todo mal')
    }
    //si todo esta bien, asignar la base de datos
    crearDB.onsuccess = function () {
        DB = crearDB.result;

        mostrarCitas();
    }

    //este metodo solo corre una vez y es ideal para crear el schema
    crearDB.onupgradeneeded = function (e) {
        let db = e.target.result;

        //definir el objectStore
        //keyPath es el indice de la base de datos 
        let objectStore = db.createObjectStore('citas', {
            keyPath: 'key',
            autoIncrement: true
        });

        //crear los indices y campos de la base de datos con 3 parametros nombre keypath y opciones
        objectStore.createIndex('mascota', 'mascota', {
            unique: false
        });
        objectStore.createIndex('cliente', 'cliente', {
            unique: false
        });
        objectStore.createIndex('telefono', 'telefono', {
            unique: false
        });
        objectStore.createIndex('fecha', 'fecha', {
            unique: false
        });
        objectStore.createIndex('hora', 'hora', {
            unique: false
        });
        objectStore.createIndex('sintomas', 'sintomas', {
            unique: false
        });

        console.log('base de datos lista')
    }

    form.addEventListener('submit', agregarDatos);

    function agregarDatos(e) {
        e.preventDefault();

        const nuevaCita = {
            mascota: mascota.value,
            cliente: cliente.value,
            telefono: telefono.value,
            fecha: fecha.value,
            hora: hora.value,
            sintomas: sintomas.value
        }

        let transaction = DB.transaction(['citas'], 'readwrite');
        let objectStore = transaction.objectStore('citas');
        let peticion = objectStore.add(nuevaCita);

        peticion.onsuccess = () => {
            form.reset();
        }
        transaction.oncomplete = () => {
            console.log('cita agregada')
            mostrarCitas();
        }
        transaction.onerror = () => {
            console.log('hubo un error')
        }
    }

    function mostrarCitas() {

        while (citas.firstChild) {
            citas.removeChild(citas.firstChild);
        }

        let objectStore = DB.transaction('citas').objectStore('citas');
        objectStore.openCursor().onsuccess = function (e) {
            let cursor = e.target.result;

            if (cursor) {
                let citaHTML = document.createElement('li');
                citaHTML.setAttribute('data-cita-id', cursor.value.key);
                citaHTML.classList.add('list-group-item');
                citaHTML.innerHTML = `
                <p class="font-weight-bold">Mascota: <span class="font-weight-normal">${cursor.value.mascota}</span></p>
                <p class="font-weight-bold">Cliente: <span class="font-weight-normal">${cursor.value.cliente}</span></p>
                <p class="font-weight-bold">Telefono: <span class="font-weight-normal">${cursor.value.telefono}</span></p>
                <p class="font-weight-bold">Fecha: <span class="font-weight-normal">${cursor.value.fecha}</span></p>
                <p class="font-weight-bold">Hora: <span class="font-weight-normal">${cursor.value.hora}</span></p>
                <p class="font-weight-bold">Sintomas: <span class="font-weight-normal">${cursor.value.sintomas}</span></p>
                `;

                const botonBorrar = document.createElement('button');
                botonBorrar.classList.add('borrar', 'btn', 'btn-danger');
                botonBorrar.innerHTML = '<span aria-hidden="true">X</span> Borrar';
                botonBorrar.onclick = borrarCita;
                citaHTML.appendChild(botonBorrar);

                citas.appendChild(citaHTML);

                cursor.continue();
            } else if (!citas.firstChild) {
                heading.textContent = 'Agrega citas para comenzar';
                let listado = document.createElement('p');
                listado.classList.add('text-center');
                listado.textContent = 'No hay registros';
                citas.appendChild(listado);
            } else {
                heading.textContent = 'Administra tus citas';
            }

        }
    }

    function borrarCita(e) {
        let citaID = Number(e.target.parentElement.getAttribute('data-cita-id'));

        let transaction = DB.transaction(['citas'], 'readwrite');
        let objectStore = transaction.objectStore('citas');
        let peticion = objectStore.delete(citaID);

        transaction.oncomplete = () => {
            e.target.parentElement.parentElement.removeChild(e.target.parentElement);
            console.log(`se elimino la cita con el id ${citaID}`)

            if (!citas.firstChild) {
                heading.textContent = 'Agrega citas para comenzar';
                let listado = document.createElement('p');
                listado.classList.add('text-center');
                listado.textContent = 'No hay registros';
                citas.appendChild(listado);
            } else {
                heading.textContent = 'Administra tus citas';
            }
        }
    }
});
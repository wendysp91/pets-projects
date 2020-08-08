const carrito = document.getElementById('carrito');
const listaCursos = document.getElementById('lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.getElementById('vaciar-carrito');

listaCursos.addEventListener('click', comprarCurso);
carrito.addEventListener('click', eliminarCurso);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);
document.addEventListener('DOMContentLoaded', leerLocalStorage)

function comprarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        let curso = e.target.parentElement.parentElement;
        leerCurso(curso);
    }
}

function leerCurso(curso) {
    let infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')

    };

    insertarCarrito(infoCurso);
}

function insertarCarrito(curso) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>
    <img src="${curso.imagen}" width="100px">
    </td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
    <a data-id="${curso.id}" href="#" class="borrar-curso">X</a>
    </td>
    `;

    listaCarrito.appendChild(row);
    guardarLocalStorage(curso);
}

function eliminarCurso(e) {
    e.preventDefault();

    let curso, cursoId;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');


    }

    eliminarCursoLocalStorage(cursoId);
}

function vaciarCarrito() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
    vaciarLocalStorage();
}

function guardarLocalStorage(curso) {
    let cursos = obtenerLocalStorage();
    cursos.push(curso);
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerLocalStorage() {
    let cursoLS;
    if (localStorage.getItem('cursos') === null) {
        cursoLS = [];
    } else {
        cursoLS = JSON.parse(localStorage.getItem('cursos'))
    }
    return cursoLS;
}

function leerLocalStorage() {
    let cursos = obtenerLocalStorage();

    cursos.forEach(curso => {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${curso.imagen}" width="100px">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
        <a data-id="${curso.imagen}" href="#" class="borrar-curso">X</a>
        </td>
        `;
        listaCarrito.appendChild(row);
    });
}

function eliminarCursoLocalStorage(cursoId) {
    let cursos = obtenerLocalStorage();

    cursos.forEach((curso, index) => {
        if (curso.id === cursoId) {
            cursos.splice(index, 1);

        }
    });
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function vaciarLocalStorage() {
    localStorage.clear();
}
var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

var vp = document.getElementById("villaplatzi");
var papel = vp.getContext("2d");
document.addEventListener("keydown", dibujarTeclado);
var movimiento = 5;

var fondo = {
    url: "tile.png",
    cargaOK: false
}
var vaca = {
    url: "vaca.png",
    cargaOK: false
};
var pollo = {
    url: "pollo.png",
    cargaOK: false
};
var cerdo = {
    url: "cerdo.png",
    cargaOK: false,
    cerdox: 100,
    cerdoy: 100
};

fondo.imagen = new Image();
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener("load", cargarFondo);

vaca.imagen = new Image();
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener("load", cargarVacas);

cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener("load", cargarCerdos);

pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
pollo.imagen.addEventListener("load", cargarPollos);

function cargarFondo() {
    fondo.cargaOK = true;
    dibujar();
}

function cargarVacas() {
    vaca.cargaOK = true;
    dibujar();
}

function cargarCerdos() {
    cerdo.cargaOK = true;
    dibujar();
}

function cargarPollos() {
    pollo.cargaOK = true;
    dibujar();
}


function dibujar(x, y) {

    if (fondo.cargaOK) {
        papel.drawImage(fondo.imagen, 0, 0);
    }
    if (vaca.cargaOK) {

        var x = aleatorio(0, 400);
        var y = aleatorio(0, 400);
        papel.drawImage(vaca.imagen, x, y);

    }
    if (cerdo.cargaOK) {

        papel.drawImage(cerdo.imagen, cerdo.cerdox, cerdo.cerdoy);

    }

    if (pollo.cargaOK) {

        var x = aleatorio(0, 400);
        var y = aleatorio(0, 400);
        papel.drawImage(pollo.imagen, x, y);

    }
}

function dibujarCerdo(x, y) {
    if (cerdo.cargaOK) {
        papel.drawImage(cerdo.imagen, x, y);
        dibujar();

    }
}

function aleatorio(min, max) {
    var resultado;
    resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    return resultado;
}

function dibujarTeclado(evento) {
    console.log("hola")
    switch (evento.keyCode) {
        case teclas.UP:
            dibujarCerdo(cerdo.cerdox, cerdo.cerdoy - movimiento);
            cerdo.cerdoy = cerdo.cerdoy - movimiento;
            break;
        case teclas.DOWN:
            dibujarCerdo(cerdo.cerdox, cerdo.cerdoy + movimiento);
            cerdo.cerdoy = cerdo.cerdoy + movimiento;
            break;
        case teclas.LEFT:
            dibujarCerdo(cerdo.cerdox - movimiento, cerdo.cerdoy);
            cerdo.cerdox = cerdo.cerdox - movimiento;
            break;
        case teclas.RIGHT:
            dibujarCerdo(cerdo.cerdox + movimiento, cerdo.cerdoy);
            cerdo.cerdox = cerdo.cerdox + movimiento;
            break;
    }
}
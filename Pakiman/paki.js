var imagenes = [];
imagenes["Cauchin"] = "vaca.png";
imagenes["Pokacho"] = "pollo.png";
imagenes["Tocinauro"] = "cerdo.png";

class Pakiman {
    constructor(nombre, vida, ataque) {
        this.imagen = new Image();
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;

        this.imagen.src = imagenes[this.nombre];
    }
    hablar() {
        alert(this.nombre);
    }
    mostrar() {
        document.body.appendChild(this.imagen);
        document.write("<br /><strong>" + this.nombre + "</strong><br />");
        document.write("Vida: " + this.vida + "<br />");
        document.write("Ataque: " + this.ataque + "<hr />");
    }
}

var coleccion = [];
coleccion.push(new Pakiman("Cauchin", 100, 30));
coleccion.push(new Pakiman("Pokacho", 80, 50));
coleccion.push(new Pakiman("Tocinauro", 120, 40));

for (var freddito of coleccion) {
    freddito.mostrar();
}

for (var x in coleccion[0]) {
    console.log(x);
}
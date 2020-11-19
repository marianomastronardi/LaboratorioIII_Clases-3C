"use strict";
var Animales;
(function (Animales) {
    class Gato {
        constructor(nombre, raza) {
            this.nombre = nombre;
            this.raza = raza;
            this.tipo = Animales.eAnimal.Gato;
        }
        hacerRuido() {
            return "Miau";
        }
    }
    Animales.Gato = Gato;
})(Animales || (Animales = {}));

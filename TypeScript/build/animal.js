"use strict";
var Animales;
(function (Animales) {
    let eAnimal;
    (function (eAnimal) {
        eAnimal["Perro"] = "Perro";
        eAnimal["Gato"] = "Gato";
        eAnimal["Pajaro"] = "Pajaro";
    })(eAnimal = Animales.eAnimal || (Animales.eAnimal = {}));
})(Animales || (Animales = {}));

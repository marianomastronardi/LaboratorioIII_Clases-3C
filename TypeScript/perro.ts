namespace Animales{
    export class Perro implements Animal{
         nombre:string;
         tipo:any;
         raza:string;

        constructor(nombre:string, raza:string){
            this.nombre = nombre;
            this.raza = raza;
            this.tipo = eAnimal.Perro;
        }

        hacerRuido():string {
            return "Guau";
        }
    }
}
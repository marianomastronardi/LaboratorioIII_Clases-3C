namespace Animales{
    export class Gato implements Animal{
         nombre:string;
         tipo:any;
         raza:string;

        constructor(nombre:string, raza:string){
            this.nombre = nombre;
            this.raza = raza;
            this.tipo = eAnimal.Gato;
        }

        hacerRuido():string {
            return "Miau";
        }
    }
}
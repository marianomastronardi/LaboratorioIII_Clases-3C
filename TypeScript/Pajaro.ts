namespace Animales{
    export class Pajaro implements Animal{
         nombre:string;
         tipo:any;
         raza:string;

        constructor(nombre:string, raza:string){
            this.nombre = nombre;
            this.raza = raza;
            this.tipo = eAnimal.Pajaro;
        }

        hacerRuido():string {
            return "pi";
        }
    }
}
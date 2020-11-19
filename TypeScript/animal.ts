namespace Animales {

    export interface Animal{
        nombre:string;
        tipo:any;
        hacerRuido():string;
    }

    export enum eAnimal{
        Perro = 'Perro',
        Gato = 'Gato',
        Pajaro = 'Pajaro'
    }
}
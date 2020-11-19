// Funciones Básicas
function sumar( a:number, b:number ):number{
  return a + b;
}

var contar = function( heroes:string[] ):number{
  return heroes.length;
}
var superHeroes:string[] = ["Flash", "Arrow", "Superman", "Linterna Verde"];
contar(superHeroes);

//Parametros por defecto
function llamarBatman( llamar:boolean = true):void{
  if( llamar ){
    console.log("Batiseñal activada");
  }
}

llamarBatman(false);

// Rest?
function unirheroes( ...personas:string[] ):string{
  return personas.join(", ");
}


// Tipo funcion
function noHaceNada( numero:number, texto:string, booleano:boolean, arreglo:any[] ):void{
}

// Crear el tipo de funcion que acepte la funcion "noHaceNada"
var noHaceNadaTampoco:(numero:number, texto:string, booleano:boolean, arreglo:any[])=>void;

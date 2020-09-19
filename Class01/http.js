var req = new XMLHttpRequest();
var user; 
var pass;
window.addEventListener('load', load);

function load(){
     user = document.getElementById("usuario");
     pass = document.getElementById("Password");
}

function reset(){
/*     var user = document.getElementById("usuario");
    var pass = document.getElementById("Password");  */
    user.value="";
    pass.value="";
}
function validar(){
    
/*     var user = document.getElementById("usuario");
    var pass = document.getElementById("Password"); */
    // if(pass.value == "1234"){
        //alert("el usuario se logueo correctamente");
        req.onreadystatechange = cb;
req.open("GET", `http://localhost:3000/loginUsuario?usr=${user.value}&pass=${pass.value}`, true);
req.send();
  /*   }
    else{
        alert("contraseña incorrecta");
    } */
}
function cb(){
    if (req.readyState === 4){
        if(req.status===200){
            alert(req.responseText);
        }
    }
}
var http = new XMLHttpRequest();
var user;
var pass;
window.addEventListener('load', load);

function load() {
    user = document.getElementById("usuario");
    pass = document.getElementById("Password");
}

function reset() {
    /*     var user = document.getElementById("usuario");
        var pass = document.getElementById("Password");  */
    user.value = "";
    pass.value = "";
}
function validar() {

    /*     var user = document.getElementById("usuario");
        var pass = document.getElementById("Password"); */
    // if(pass.value == "1234"){
    //alert("el usuario se logueo correctamente");
    http.onreadystatechange = cb;
    http.open("GET", `http://localhost:3000/loginUsuario?usr=${user.value}&pass=${pass.value}`, true);
    http.send();
    /*   }
      else{
          alert("contraseña incorrecta");
      } */
}
function cb() {
    if (http.readyState === 4) {
        if (http.status === 200) {
            alert(http.responseText);
        }
    }
}
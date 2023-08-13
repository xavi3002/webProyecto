/* 




*/// 1- use strict

const auth = firebase.auth();
const database= firebase.database();

function register(){
    let cedula = document.getElementById("txtCedula");
    let nombre = document.getElementById("txtNombre");
    let apellidos = document.getElementById("txtApellidos");
    let edad = document.getElementById("txtEdad");
    let sexo = document.getElementById("txtSexo");
    let direccion = document.getElementById("txtDireccion");
    let contrasena = document.getElementById("txtContrasena");
}


function validate_email(email){
    expression = /^[^@]+@\w+(\. \w+)+\w$/
    if(expression.test(email)== true){
        // email si sirve
        return true;

    }else{
        return false;
    }
}


function validatePassword(password){

    if (password<6){
        return false;
    }else{
        return true;
    }

}


function validateField(field){
    
}
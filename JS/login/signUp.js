"use strict"

/*2 Referenciar la instancia de auth de firebase*/
const auth3 = firebase.auth();


/* const btnRegistrar */

const btnRegistrar = document.querySelector("#btnRegistrar");


const btnLogin = document.querySelector("#btnLogin");
const btnLogout = document.querySelector("#btnLogout");

btnRegistrar.addEventListener("click",()=>{
    let email = document.querySelector("#txtRegisterUser").value;
    let password = document.querySelector("#txtRegisterPassword").value;
    
    if (email.length >0 && password.length >0){
        
        auth3.createUserWithEmailAndPassword(email, password)
            .then(data=>{
                window.location.href="vistaAdmin.html"
                alert("Registro exitoso. "+ email)
               
            })
            .catch(error => console.log("error al crear usuario "+error.message));
    }

});



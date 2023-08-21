"use strict"

/*2 Referenciar la instancia de auth de firebase*/
const auth = firebase.auth();


/* const btnRegistrar */

const btnLogin = document.querySelector("#btnLogin");
const btnLogout = document.querySelector("#btnLogout");



 
btnLogin.addEventListener("click",()=>{
    let email = document.querySelector("#txtLoginUsuario").value;
    let password = document.querySelector("#txtLoginPassword").value;
    
    if (email.length >0 && password.length >0){
        
        auth.signInWithEmailAndPassword(email, password)
            .then(data=>{
                alert("login exitoso. "+ email)
                window.location.href="vistaAdmin.html"
            })
            .catch(() => alert("error al logguearse "));
    }

});

auth.onAuthStateChanged(user => {
        
    if(user){
        window.location.href="vistaAdmin.html"
    }else{
        
        
        
    }


})


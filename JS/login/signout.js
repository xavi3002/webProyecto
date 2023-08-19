"use strict"

/*2 Referenciar la instancia de auth de firebase*/
const auth2 = firebase.auth();


/* const btnRegistrar */


const btnLogout = document.querySelector("#btnLogout");


//Log out

btnLogout.addEventListener("click", ()=>{
    console.log("entro")
    auth2.signOut()
    .then (()=> {
        
        window.location.href="inicio.html"
    
    })
    .catch(error => console.log("error al desloguearse"))
})
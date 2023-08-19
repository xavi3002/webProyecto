"use strict"

/*
/** 2- Objeto conexion */
const db = firebase.firestore();

//3-  crear objetos 
// String para usar una vez el nombre
const collectionString = "contacto";


const form = document.querySelector("#frm");



//---------------------------------------------------------5- Metodos del crud-------------------------------------------------------

// insertar 

const onInsert = contactoNuevo => db.collection(collectionString).doc().set(contactoNuevo);


// 7- configurar el submit 

form.addEventListener("submit", async (ev) =>{
    ev.preventDefault();

    // cajas de texto
    let nombre = form.txtNombre.value;
    let email = form.txtEmail.value;
    let tema = form.txtTema.value;
    let mensaje = form.txtMensaje.value;
    let estado = "Pendiente"    

   
        await onInsert({
            nombre, 
            email,
            tema,
            mensaje,
            estado
    
    
        })
   
    
    
    alert("Su solicitud sera revisada proximamente por uno de nuestros asesores");
    form.reset();
})
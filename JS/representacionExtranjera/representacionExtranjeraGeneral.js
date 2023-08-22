"use strict"

/*
/** 2- Objeto conexion */
const db = firebase.firestore();

//3-  crear objetos 
// String para usar una vez el nombre

const collectionString = "representacionExtranjeras";
var estadoEditar = false;
var idSeleccionado = "";

const form = document.querySelector("#frm");
// que se agarre el tbody dentro de tbl datos
const table = document.querySelector(".row2")


//---------------------------------------------------------5- Metodos del crud-------------------------------------------------------

// encuentra todos de la coleccion
const findAll=()=> db.collection(collectionString).get();

//encuentra por ID
const findbyId=paramId => db.collection(collectionString).doc(paramId).get();

//encontrar todos x2
const onFindAll = callback => db.collection(collectionString).onSnapshot(callback)

// insertar 

const onInsert = contactoNuevo => db.collection(collectionString).doc().set(contactoNuevo);

// actualizar

const onUpdate = (paramId, newContacto)=> db.collection(collectionString).doc(paramId).update(newContacto);

//eliminar
const onDelete = paramId => db.collection(collectionString).doc(paramId).delete();



window.addEventListener("load", async()=>{
    await onFindAll((query)=>{
        let contador = 0;
        table.innerHTML="";
        query.forEach(element => {
            let dato=element.data();
        
            table.innerHTML+= `
            
            <div class="col-4 text-center mb-5">
            <div class="card border-dark w-100 h-100">
                <img src="${dato.imagenUrl}" alt="Imagen 1" class="card-img-top h-50">
                <div class="card-body">
                    <h3 class="card-title"> ${dato.titulo} </h3>
                    <p class="card-text text-dark" style="text-align:left !important;">
                        <strong>Dirección:</strong> ${dato.direccion}<br>
                        <strong>Código Postal:</strong> ${dato.CodPostal} <br>
                        <strong>Teléfono:</strong> ${dato.Telefono} <br>
                        <strong>Fax:</strong> ${dato.Fax}<br>
                        <strong>Email:</strong> ${dato.Email}<br>
                        <strong>Tipo de atención:</strong> ${dato.Atencion}<br>
                        <strong>Horario:</strong> ${dato.Horas}
                    </p>
                </div>
            </div>
        </div>
            `;

           
        });
    });
});
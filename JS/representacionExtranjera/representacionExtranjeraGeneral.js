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
const table = document.querySelector(".row")


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

        table.innerHTML="";
        query.forEach(element => {
            let dato=element.data();
            table.innerHTML+= `
                    
            
        <div class="col col-md-4>
            <div class="card">
                    <img src="${dato.imagenUrl}"
                        alt="Imagen 1" class="card-image">
                    <h3 class="card-title"> ${dato.titulo} </h3>
                    <p class="card-description">Direccion: ${dato.direccion} <br>Codigo postal: ${dato.CodPostal} <br>
                    Telefono: ${dato.Telefono} <br>
                    Fax: ${dato.Fax}<br>
                    Email: ${dato.Email}<br>
                    Tipo de atencion ${dato.Atencion}<br>
                    Horario: ${dato.Horas}
                    </p>
            </div>
        </div>   
      
            
            `;
        });
    });
});
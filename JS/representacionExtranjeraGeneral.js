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
const table = document.querySelector("#tblDatos>tbody")


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
                    
            
            <div class="card">
                    <img src="https://geopoliticaybanderas.files.wordpress.com/2015/12/alemania.png?w=500&h=300"
                        alt="Imagen 1" class="card-image">
                    <h3 class="card-title"> Alemania </h3>
                    <p class="card-description">Embajada en Costa Rica</p>
                    <a href="#" class="card-button">Leer Mas</a>
            </div>
            
            
                        <tr>
                        <td>${dato.direccion}</td>
                        <td>${dato.CodPostal}</td>
                        <td>${dato.Telefono}</td>
                        <td>${dato.Fax}</td>
                        <td>${dato.Email}</td>
                        <td>${dato.Atencion}</td>

                        <td>
                            <button class="btn btn-warning btn-editar mx-1" data-id="${element.id}"> Editar </button>
                            <button class="btn btn-danger btn-borrar mx-1" data-id="${element.id}">Eliminar </button>
                        </td>
                    </tr>

            
            
            `;
        });
    });
});
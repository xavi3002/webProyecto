"use strict"

/*
/** 2- Objeto conexion */
const db = firebase.firestore();

//3-  crear objetos 
// String para usar una vez el nombre

const collectionString = "representacionCR";
var estadoEditar = false;
var idSeleccionado = "";

const form = document.querySelector("#frm");
// que se agarre el tbody dentro de tbl datos
const table = document.querySelector(".contenedor")


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


//6-  cargar la lista

window.addEventListener("load", async()=>{
    await onFindAll((query)=>{

        table.innerHTML="";
        query.forEach(element => {
            let dato=element.data();
            table.innerHTML+= `
            <div class="accordion-item ">
            <h2 class="accordion-header" id="Title${element.id}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#${element.id}" aria-expanded="true" aria-controls="${element.id}">
                    ${dato.pais} - ${dato.ciudad}
                    <br>
                </button>
            </h2>

            <div id="${element.id}" class="accordion-collapse collapse " aria-labelledby="Title${element.id}"
                data-bs-parent="#accordionExample">
                <div class="accordion-body pb-5">
                    <img src="${dato.imagenUrl}" class="img-thumbnail float-start position-static" style="height:150px; width:200px" /> <br>
                    <div class="row">
                        <div class="col-2">
                            <strong>Dirección:</strong> ${dato.Direccion}<br>
                            <strong>Código postal:</strong> ${dato.CodigoPostal}<br>
                            <strong>Teléfono:</strong> ${dato.telefono}<br>
                            <strong>Email:</strong> ${dato.Email}<br>
                        </div>
                        <div class="col-2">
                            
                            <strong>Atención:</strong> ${dato.Atencion}<br>
                            <strong>Horas:</strong> ${dato.Horas}<br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
        });

    });

});


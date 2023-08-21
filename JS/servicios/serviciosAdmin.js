"use strict"

/*
/** 2- Objeto conexion */
const db = firebase.firestore();

//3-  crear objetos 
// String para usar una vez el nombre

const collectionString = "servicios";
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


//6-  cargar la lista

window.addEventListener("load", async()=>{
    await onFindAll((query)=>{

        table.innerHTML="";
        query.forEach(element => {
            let dato=element.data();
            table.innerHTML+= `
                    <tr>
                        <td>${dato.titulo}</td>
                        <td>${dato.subtitulo}</td>
                        <td>${dato.autor}</td>
                        <td>${dato.fecha}</td>
                        <td>${dato.descripcion}</td>

                        <td>
                            <button class="m-2 btn btn-warning btn-editar mx-1" data-id="${element.id}"> Editar </button>
                            <button class="m-2 btn btn-danger btn-borrar mx-1" data-id="${element.id}">Eliminar </button>
                        </td>
                    </tr>

            
            
            `;
        });

        // se obtienen todos los botones con esa clase
        const btnBorrar= document.querySelectorAll(".btn-borrar");

        // le agregamos el evento a cada boton
        btnBorrar.forEach(btn=>{
            btn.addEventListener("click", async ev => {
                // se le agrega el mensaje
                if(confirm("Desea borrar el servicio?")){
                    await onDelete(ev.target.dataset.id);
                    alert("servicio eliminado")
                }
            });

        });


        // se obtienen todos los botones con editar
        const btnEditar = document.querySelectorAll(".btn-editar");

        btnEditar.forEach(btn => {
            btn.addEventListener("click", async ev =>{
                const docSeleccionado= await findbyId(ev.target.dataset.id);
                const contactoSeleccionado= docSeleccionado.data();


                form.txtTitulo.value = contactoSeleccionado.titulo;
                form.txtSubtitulo.value= contactoSeleccionado.subtitulo;
                form.txtAutor.value= contactoSeleccionado.autor;
                form.txtFecha.value= contactoSeleccionado.fecha;
                form.txtDescripcion.value= contactoSeleccionado.descripcion;
                form.btnGuardar.innerText="Modificar servicio";

                estadoEditar=true;
                idSeleccionado=ev.target.dataset.id;


            });

        });


    });




});

// 7- configurar el submit 

form.addEventListener("submit", async (ev) =>{
    ev.preventDefault();

    // cajas de texto
    let titulo = form.txtTitulo.value;
    let subtitulo = form.txtSubtitulo.value;
    let autor = form.txtAutor.value;
    let fecha = form.txtFecha.value;
    let descripcion = form.txtDescripcion.value;
    


    if (!estadoEditar){
        console.log("entro insert");
        await onInsert({
            titulo, 
            subtitulo,
            autor,
            fecha,
            descripcion
    
    
        })
    }else{
        console.log("entro update");
        await onUpdate (idSeleccionado, {titulo, subtitulo,autor, fecha,descripcion });
       
    }

    
    estadoEditar=false;
    idSeleccionado="";
    form.btnGuardar.innerText="Registrar servicio"
    form.reset();


})
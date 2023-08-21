"use strict"

/*
/** 2- Objeto conexion */
const db = firebase.firestore();

//3-  crear objetos 
// String para usar una vez el nombre

const collectionString = "contacto";
var idSeleccionado = "";

const form = document.querySelector("#frm");
// que se agarre el tbody dentro de tbl datos
const table = document.querySelector("#tblDatos>tbody")
const formulario = document.querySelector(".formulario");

//---------------------------------------------------------5- Metodos del crud-------------------------------------------------------

// encuentra todos de la coleccion
const findAll=()=> db.collection(collectionString).get();

//encuentra por ID
const findbyId=paramId => db.collection(collectionString).doc(paramId).get();

//encontrar todos x2
const onFindAll = callback => db.collection(collectionString).onSnapshot(callback)

// insertar 


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
                        <td>${dato.nombre}</td>
                        <td>${dato.email}</td>
                        <td>${dato.tema}</td>
                        <td>${dato.mensaje}</td>
                        <td>${dato.estado}</td>
                        <td></td>
                        

                        <td>
                            <button class="btn btn-warning btn-editar mx-1" data-id="${element.id}"> Editar </button>
                            <button class="btn btn-danger btn-borrar mx-1" data-id="${element.id}">Eliminar </button>
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
                if(confirm("Desea borrar la solicitud de contacto?")){
                    
                    await onDelete(ev.target.dataset.id);
                    alert("Solicitud de contacto eliminada correctamente")
                }
            });

        });


        // se obtienen todos los botones con editar
        const btnEditar = document.querySelectorAll(".btn-editar");

        btnEditar.forEach(btn => {
            btn.addEventListener("click", async ev =>{
                const docSeleccionado= await findbyId(ev.target.dataset.id);
                const contactoSeleccionado= docSeleccionado.data();

               
                form.txtNombre.value = contactoSeleccionado.nombre;
                form.txtEmail.value= contactoSeleccionado.email;
                form.txtTema.value= contactoSeleccionado.tema;
                form.txtMensaje.value= contactoSeleccionado.mensaje;
                form.txtEstado.value = contactoSeleccionado.estado

                document.getElementById("txtNombre").style.visibility="visible";
                document.getElementById("txtEmail").style.visibility="visible";
                document.getElementById("txtTema").style.visibility="visible";
                document.getElementById("txtMensaje").style.visibility="visible";
                document.getElementById("txtEstado").style.visibility="visible";
                document.getElementById("btnEnviar").style.display = 'inline';

                document.getElementById("labelTitulo1").style.visibility = 'visible';
                document.getElementById("labelTitulo2").style.visibility = 'visible';
                document.getElementById("labelTitulo3").style.visibility = 'visible';
                document.getElementById("labelTitulo4").style.visibility = 'visible';
                document.getElementById("labelTitulo5").style.visibility = 'visible';
                
                idSeleccionado=ev.target.dataset.id;
            });
        });
    });
});

//7- configurar el submit 

form.addEventListener("submit", async (ev) =>{
    ev.preventDefault();

    // cajas de texto
    let nombre = form.txtNombre.value;
    let email = form.txtEmail.value;
    let tema = form.txtTema.value;
    let mensaje = form.txtMensaje.value;
    let estado = form.txtEstado.value;
    
        await onUpdate (idSeleccionado, {nombre, email,tema, mensaje,estado});
       
    
    idSeleccionado="";
    form.reset();
    alert("El registro fue actualizado ")

    document.getElementById("txtNombre").style.visibility="hidden";
    document.getElementById("txtEmail").style.visibility="hidden";
    document.getElementById("txtTema").style.visibility="hidden";
    document.getElementById("txtMensaje").style.visibility="hidden";
    document.getElementById("txtEstado").style.visibility="hidden";
    document.getElementById("btnEnviar").style.display = 'none';

    document.getElementById("labelTitulo1").style.visibility = 'hidden';
    document.getElementById("labelTitulo2").style.visibility = 'hidden';
    document.getElementById("labelTitulo3").style.visibility = 'hidden';
    document.getElementById("labelTitulo4").style.visibility = 'hidden';
    document.getElementById("labelTitulo5").style.visibility = 'hidden';

})
"use strict"

/*
/** 2- Objeto conexion */
const db = firebase.firestore();

//3-  crear objetos 
// String para usar una vez el nombre

const collectionString = "usuarioAdministrador";
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
                        <td>${dato.cedula}</td>
                        <td>${dato.nombre}</td>
                        <td>${dato.apellido}</td>
                        <td>${dato.edad}</td>
                        <td>${dato.sexo}</td>
                        <td>${dato.direccion}</td>
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
                if(confirm("Desea borrar el usuario administrador?")){
                    
                    await onDelete(ev.target.dataset.id);
                    alert("usuario administrador eliminado correctamente")

                    


                }
            });

        });


        // se obtienen todos los botones con editar
        const btnEditar = document.querySelectorAll(".btn-editar");

        btnEditar.forEach(btn => {
            btn.addEventListener("click", async ev =>{
                const docSeleccionado= await findbyId(ev.target.dataset.id);
                const contactoSeleccionado= docSeleccionado.data();

                form.txtNombre.value= contactoSeleccionado.nombre;
                form.txtApellidos.value= contactoSeleccionado.apellido;
                form.txtEdad.value= contactoSeleccionado.edad;
                form.txtSexo.value= contactoSeleccionado.sexo;
                form.TxtDireccion.value= contactoSeleccionado.direccion;

                form.btnGuardar.innerText="Modificar";

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

    let cedula = form.txtCedula.value;
    let nombre = form.txtNombre.value;
    let apellido = form.txtApellidos.value;
    let edad = form.txtEdad.value;
    let sexo = form.txtSexo.value;
    let direccion = form.TxtDireccion.value;
    let password = form.txtContrasena.value;

    if (!estadoEditar){
        await onInsert({
            cedula,
            nombre,
            apellido,
            edad,
            sexo,
            direccion,
            password
    
    
        })
    }else{
        await onUpdate (idSeleccionado, {cedula, nombre,apellido,edad, sexo,direccion,password });
       
    }

    
    estadoEditar=false;
    idSeleccionado="";
    form.btnGuardar.innerText="Registrar usuario administrador"
    form.reset();


})
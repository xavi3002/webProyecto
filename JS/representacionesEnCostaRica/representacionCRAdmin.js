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
                        <td>${dato.pais}</td>
                        <td>${dato.ciudad}</td>
                        <td>${dato.Direccion}</td>
                        <td>${dato.CodigoPostal}</td>
                        <td>${dato.telefono}</td>
                        <td>${dato.Email}</td>
                        <td>${dato.Atencion}</td>
                        <td>${dato.Horas}</td>
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
                if(confirm("Desea borrar la representacion de costa rica?")){
                    
                    await onDelete(ev.target.dataset.id);
                    alert("representacion de CR eliminada correctamente")
                }
            });

        });


        // se obtienen todos los botones con editar
        const btnEditar = document.querySelectorAll(".btn-editar");

        btnEditar.forEach(btn => {
            btn.addEventListener("click", async ev =>{
                const docSeleccionado= await findbyId(ev.target.dataset.id);
                const contactoSeleccionado= docSeleccionado.data();


                form.txtPais.value = contactoSeleccionado.pais;
                form.txtCiudad.value= contactoSeleccionado.ciudad;
                form.txtDireccion.value= contactoSeleccionado.Direccion;
                form.txtCodPostal.value= contactoSeleccionado.CodigoPostal;
                form.txtTelefono.value= contactoSeleccionado.telefono;
                form.txtEmail.value= contactoSeleccionado.Email;
                form.txtHoras.value= contactoSeleccionado.Horas;
                form.txtAtencion.value= contactoSeleccionado.Atencion;
                

                form.btnGuardar.innerText="Modificar representacion de cr en el extranjero";

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
    let pais = form.txtPais.value;
    let ciudad = form.txtCiudad.value;
    let Direccion = form.txtDireccion.value;
    let CodigoPostal = form.txtCodPostal.value;
    let telefono = form.txtTelefono.value;
    let Email = form.txtEmail.value;
    let Horas = form.txtHoras.value;
    let Atencion = form.txtAtencion.value;


    if (!estadoEditar){
        await onInsert({
            pais, 
            ciudad,
            Direccion,
            CodigoPostal,
            telefono,
            Email,
            Horas,
            Atencion
    
    
        })
    }else{
        await onUpdate (idSeleccionado, {pais, ciudad,Direccion, CodPostal,Telefono,Fax, Email,Horas,Atencion });
       
    }
    estadoEditar=false;
    idSeleccionado="";
    form.btnGuardar.innerText="Registrar representacion de costa rica"
    form.reset();
})
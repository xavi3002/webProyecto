
"use script"

/* 2. CREAR OBJETO CONEXION */

const db = firebase.firestore();


/* 3. CREAR OBJETOS */
const collectionStr = "noticia";
var editStatus = false;
var idSeleccionado = "";

const form = document.querySelector("#frm");
const table = document.querySelector("#tblDatos>tbody");

/* 4. CONSTANTES DE MENSAJES */

/* 5. METODOS DEL CRUD */
const findAll = () => db.collection(connectionStr);

const findById = paramId => db.collection(collectionStr).doc(paramId).get();

const onFindAll = callback => db.collection(collectionStr).onSnapshot(callback);

const onInsert = newNoticia => db.collection(collectionStr).doc().set(newNoticia);

const onUpdate = (paramId, newNoticia) => db.collection(collectionStr).doc(paramId).update(newNoticia);

const onDelete = paramId => db.collection(collectionStr).doc(paramId).delete();

/* 6. GENERAR LA BUSQUEDA */
window.addEventListener("load", async ()=>{
    //await es para que espere a que se ejecute eso antes de seguir
    await onFindAll((query)=>{
        table.innerHTML = "";
        
        query.forEach(documento =>{
            let dato = documento.data();
            table.innerHTML += `
                                <tr>
                                    <td>${dato.titulo}</td>
                                    <td>${dato.fecha}</td>
                                    <td>${dato.detalle}</td>
                                    <td><img src="${dato.imagenUrl}" style= "height:100px ; width:200px"</td>
                                    <td>
                                        <button class= "btn btn-warning btn-editar mb-1" data-id="${documento.id}">Editar</button>
                                        <button class= "btn btn-danger btn-borrar" data-id="${documento.id}">Borrar</button>
                                    </td>
                                </tr>
            `;
        });

        const btnBorrar = document.querySelectorAll(".btn-borrar");
        btnBorrar.forEach(btn =>{
            btn.addEventListener("click", async ev => { //tiene que ser asincrono para usar await y que el sepa que no va a estar sincronizado con el resto del codigo
                //console.log(ev.target.dataset.id);
                if (confirm("Desea borrar el registro?")){
                    await onDelete(ev.target.dataset.id);//se usa wait para que el codigo espere a la respuesta del backend
                    alert("Registro borrado");
                }
            });
        });

        const btnEditar = document.querySelectorAll(".btn-editar");

        btnEditar.forEach(btn =>{
            btn.addEventListener("click", async ev =>{
                const docSeleccionado = await findById(ev.target.dataset.id);
                const noticiaSeleccionada = docSeleccionado.data();
                
                form.txtTitulo.value = noticiaSeleccionada.titulo;
                form.txtFecha.value = noticiaSeleccionada.fecha;
                form.txtDetalleNot.value = noticiaSeleccionada.detalle;
                //form.txtImagen.value = noticiaSeleccionada.imagen;
                form.btnGuardar.innerText = "Modificar";

                editStatus = true;
                idSeleccionado = ev.target.dataset.id;
            });
        });
    }); 
});


// 7- configurar el submit 
var ejecutar = false;
form.addEventListener("submit", async (ev) =>{
ev.preventDefault();


    let titulo = form.txtTitulo.value;
    let fecha = form.txtFecha.value;
    let detalle = form.txtDetalleNot.value;
    let imagenUrl;

    if (editStatus==false){
    

    // referencia con firestore
    const ref = firebase.storage().ref();

    // se agarra el file
    const file = document.querySelector("#txtFile").files[0];

    // se le crea un nuevo nombre
    const name = new Date () + '-' + file.name;
   
    const metadata = {
        contentType:file.type

    }

    const task = ref.child(name).put(file,metadata)

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
       
        alert("Image upload succesfull")
        
        
        imagenUrl = url
        
            
           
        onInsert({titulo, fecha, detalle,imagenUrl});
        alert("Registro almacenado correctamente.");
            

            
        })
    }else{
        await onUpdate(idSeleccionado, {titulo, fecha, detalle});
        alert("Registro actualizado correctamente");

        estadoEditar=false;
        idSeleccionado="";
        form.btnGuardar.innerText="Registrar representacion extranjera"
        
    }

    form.reset();
    
    

        
        

    
    


})


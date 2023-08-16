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

const contenedor = document.querySelector(".containerPages")
const Titulos = document.querySelector(".tabs")

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
        
        contenedor.innerHTML="";
        Titulos.innerHTML="";

        let orden1 = 1;
        query.forEach(element => {
            let dato=element.data();
            
            if (orden1==1){
                
                Titulos.innerHTML+= `
                    <li class="nav-item tab is-active"> <a href="#" class="nav-link text-decoration-none" data-switcher
                            data-tab="${orden1}"> <i class="fa-solid fa-book"></i> ${dato.titulo} </a></li>
                `;
    
                contenedor.innerHTML+= `
                
                <section class="pages is-active" data-page="${orden1}">
                    <h2>${dato.titulo}</h2>
                    <h5>Fecha: ${dato.fecha}</h5>
                    <h4><span>${dato.subtitulo}<span></h4>
                    <p>${dato.descripcion} 
                    
                    <br>

                    Autor: ${dato.autor}
                    </p>
                </section>
                
                
                `;
            }else{
                
                Titulos.innerHTML+= `
                    <li class="nav-item tab"> <a href="#" class="nav-link  text-decoration-none" data-switcher
                    data-tab="${orden1}"> <i class="fa-solid fa-person"></i> ${dato.titulo}</a></li>
                `;
    
                contenedor.innerHTML+= `
                <section class="pages" data-page="${orden1}">
                    <h2>${dato.titulo}</h2>
                    <h5>Fecha: ${dato.fecha}</h5>
                    <h4><span>${dato.subtitulo}<span></h4>
                    <p>${dato.descripcion} 
                    
                    <br>

                    Autor: ${dato.autor}
                    </p>
                </section>
                
                `;
            }

           
            
            orden1++;
        });

        const tab_switchers= document.querySelectorAll('[data-switcher]');
        

    for (let i=0; i<tab_switchers.length;i++){
        const tab_switcher = tab_switchers[i];
        const page_id = tab_switcher.dataset.tab;

        tab_switcher.addEventListener('click', () => {
            document.querySelector('.tabs .tab.is-active').classList.remove('is-active');
            tab_switcher.parentNode.classList.add('is-active');

            cambiarPagina(page_id);

        });
    }

    });

    

});


window.onload = ()=>{   
    

    
}


function cambiarPagina(page_id){
    const current_page =  document.querySelector('.containerPages .pages.is-active')
    current_page.classList.remove('is-active');

    const next_page = document.querySelector(`.containerPages .pages[data-page="${page_id}"]`);
    
    next_page.classList.add('is-active');
}
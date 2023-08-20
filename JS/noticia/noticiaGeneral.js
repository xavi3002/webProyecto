"use strict"

/*
/** 2- Objeto conexion */
const db = firebase.firestore();

//3-  crear objetos 
// String para usar una vez el nombre

const collectionString = "noticia";
var estadoEditar = false;



// que se agarre el tbody dentro de tbl datos
const carousel = document.getElementById("carouselContainer")


//---------------------------------------------------------5- Metodos del crud-------------------------------------------------------

// encuentra todos de la coleccion
const findAll=()=> db.collection(collectionString).get();

//encuentra por ID
const findbyId=paramId => db.collection(collectionString).doc(paramId).get();

//encontrar todos x2
const onFindAll = callback => db.collection(collectionString).onSnapshot(callback)

window.addEventListener("load", async()=>{
    await onFindAll((query)=>{

        let contador =0;
        carousel.innerHTML="";
        
        query.forEach(element => {
            let dato=element.data();

            if (contador ==0){
                carousel.innerHTML+= ` 
                <div class="carousel-item active">
                    <div class="card" >
                       
                        <div class="card-body">
                        <h5 class="card-title">${dato.titulo}</h5>
                        <p class="card-text">Fecha: ${dato.fecha}
                            <br>
                            ${dato.detalle}
                        </p>
                        
                        </div>
                    </div>
                </div> `;

                contador++;
            }else{
                carousel.innerHTML+= ` 
                <div class="carousel-item">
                    <div class="card">
                        
                        <div class="card-body">
                        <h5 class="card-title">${dato.titulo}</h5>
                        <p class="card-text">Fecha: ${dato.fecha}
                            <br>
                            ${dato.detalle}
                        </p>
                        
                        </div>
                    </div>
                </div> `;
            }
       
        });
        
    });
});
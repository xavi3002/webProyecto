function uploadImage(){

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
        const image = document.querySelector("#image")
        image.src = url;
        console.log(url)
    })
}
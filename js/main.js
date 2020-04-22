//variables
const nombre = document.getElementById('nombre')
const email = document.getElementById('email')
const mensaje = document.getElementById('mensaje')

//eventos

eventListener();

function eventListener(){
    //se ejecuta cuando carga el DOM
    document.addEventListener('DOMContentLoaded', inicioApp)
    nombre.addEventListener('blur', validarCampos)
    email.addEventListener('blur', validarCampos)
    mensaje.addEventListener('blur', validarCampos)
}



//funciones

function inicioApp(){
    console.log("star")
}


//valida que los campos no esten vacios
function validarCampos(){
    if(this.type === 'email'){
        console.log('email')
    }else{
        console.log('otro')
    }
}
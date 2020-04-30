//variables
const nombre = document.getElementById('nombre')
const email = document.getElementById('email')
const mensaje = document.getElementById('mensaje')

const btnEnviar = document.getElementById('enviar')
const formularioEnviar = document.getElementById('formulario')

//eventos

eventListener();

function eventListener(){
    //se ejecuta cuando carga el DOM
    document.addEventListener('DOMContentLoaded', inicioApp)
    //validan si los campos estan vac
    nombre.addEventListener('blur', validarCampos)
    email.addEventListener('blur', validarCampos)
    mensaje.addEventListener('blur', validarCampos)
    //envia el formulario
    formularioEnviar.addEventListener('submit', enviarMensaje)
    
    //temporal solo de prueva
    btnEnviar.addEventListener('click', hola)

    //cargar los datos del localstorage
    document.addEventListener('DOMContentLoaded', obtenerDatos_LocalStorage)

}

function hola(){
    console.log('precionaste enviar')

    const datos = btnEnviar.parentElement;
    console.log(datos)
    obtenerDatos(datos);
}

//funciones


// desabilita el boton enviar desde el inicio 
function inicioApp(eve){

    console.log("star")

    let state = btnEnviar.disabled = true;
    console.log(state)

    disabled_btnEnviar(state)
}

//agraga las clases si el boton enviar esta habilitado o no

function disabled_btnEnviar(state){
    if(state === true){
        btnEnviar.classList.remove('enviar')
        btnEnviar.disabled = true;
    }else{
        btnEnviar.classList.add('enviar')
        btnEnviar.disabled = false;
    }
}

//valida que los campos no esten vacios
function validarCampos(){
    validarEspacio(this)

    //valida si el email tiene @
    if(this.type === 'email'){
        validarEmail(this)
    }


    //valida que los campos no esten vacios
    let errores = document.querySelectorAll('.error')
    if(nombre.value !== "" && email.value !== "" && mensaje.value !== ""){
        if(errores.length === 0){
            disabled_btnEnviar(false)
        }
    }
}

//funcion valida que el email tenga @
function validarEmail(caracteres){
    let caracter =  caracteres.value;

    if(caracter.indexOf('@') !== -1){
        caracteres.classList.add('correcto')
        caracteres.classList.remove('error')
    }else{
        caracteres.classList.add('error')
        caracteres.classList.remove('correcto')
        disabled_btnEnviar(true)
    }
}

//comprueva que los campos tengan algo
function validarEspacio(campo){
    if(campo.value.length > 3){
        campo.classList.add('correcto')
        campo.classList.remove('error')
        
    }else{
        campo.classList.add('error')
        campo.classList.remove('correcto')
        disabled_btnEnviar(true)
    }
}


//optiene los datos del DOM

function obtenerDatos(datos){
    
    //guarda los del formulario en el objeto datosCampos
    let datosCampos = {
        info_nombre:    datos.querySelector('#nombre').value,
        info_correo:    datos.querySelector('#email').value,
        info_mensaje:   datos.querySelector('#mensaje').value
    }

    console.log(datosCampos)

    guardarDatos_LocalStorage(datosCampos)
}


//guarda los datos en local storage del objeto datoscampos

function guardarDatos_LocalStorage(datosCampos){
    let userData;

    userData = obtenerDatos_LocalStorage()
    userData.push(datosCampos)
    //guarda y convierte el objeto en string
    localStorage.setItem('UserData', JSON.stringify(userData))
}


function obtenerDatos_LocalStorage(){
    let userDataLS;

    if(localStorage.getItem('UserData') === null){
        userDataLS = [];
    }else{
        userDataLS = JSON.parse(localStorage.getItem('UserData'))
    }

    return userDataLS;
}


// carga los datos del localstorage al DOM

function cargarDatos_LocalStorage(){
    let userDataLS;
    userDataLS = obtenerDatos_LocalStorage()


    console.log(userDataLS);
    const insetDOM = document.getElementById('app');

    //recorre objeto userDataLS y lo carga al DOM
    userDataLS.forEach(function(data) {
        const lista =  document.createElement('ul')
        
        lista.innerHTML = `
            <li> Nombre: ${data.info_nombre} </li>
            <li> Correo: ${data.info_correo}</li>
            <li> Mensaje: ${data.info_mensaje}</li
        `;

        lista.style.borderBottom = 'solid 1px black';
        lista.style.textAlign = 'center'
        insetDOM.appendChild(lista)
    });

}


//envia el formulario
function enviarMensaje(eve){
    eve.preventDefault()
    
}
//variables
const nombre = document.getElementById('nombre')
const email = document.getElementById('email')
const mensaje = document.getElementById('mensaje')
const insertDOM = document.getElementById('app')

const btnEnviar = document.getElementById('enviar')
const formularioEnviar = document.getElementById('formulario')

const btnRegistros =  document.getElementById('registros-click')
const btnCerrarRegistros = document.getElementById('cerrar-registro')
const registros = document.getElementById('registros')
const Btn_borrarRegistros = document.getElementById('app')
//eventos

eventListener();

function eventListener(){
    //se ejecuta cuando carga el DOM
    document.addEventListener('DOMContentLoaded', inicioApp)

    //validan si los campos estan vac
    nombre.addEventListener('blur', validarCampos)
    email.addEventListener('blur', validarCampos)
    mensaje.addEventListener('blur', validarCampos)

    //cargar los datos del localstorage
    document.addEventListener('DOMContentLoaded', cargarDatos_LocalStorage)

    //envia el formulario
    formularioEnviar.addEventListener('submit', enviarMensaje) 

    //abre el form con los datos registrados
    btnRegistros.addEventListener('click', registrosView)
    //cierra los registros
    btnCerrarRegistros.addEventListener('click', registrosCerrar)

    //borrar los registros del DOM y local Storage
    Btn_borrarRegistros.addEventListener('click', borrarRegistros)
}


//funciones


// desabilita el boton enviar desde el inicio 
function inicioApp(eve){

    let state = btnEnviar.disabled = true;

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
    
    //crea el numero randon para indentificar cada registro

    let aleatoreo1 = Math.random();
    let aleatoreo2 = Math.random() * aleatoreo1;

    //guarda los del formulario en el objeto datosCampos
    let datosCampos = {
        data_id:        aleatoreo2,
        info_nombre:    datos.querySelector('#nombre').value,
        info_correo:    datos.querySelector('#email').value,
        info_mensaje:   datos.querySelector('#mensaje').value
    }

    // ya no se utiliza de forma directa se hace desde una funcion
    /* const lista =  document.createElement('ul')
        
        lista.innerHTML = `
            <li> Nombre: ${datosCampos.info_nombre} </li>
            <li> Correo: ${datosCampos.info_correo}</li>
            <li> Mensaje: ${datosCampos.info_mensaje}</li
        `;

        lista.style.borderBottom = 'solid 1px black';
        lista.style.textAlign = 'center'
        insertDOM.appendChild(lista) */

    //crea el templace literal y lo envia al DOM

    templace_Literal(datosCampos)

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

function cargarDatos_LocalStorage(eve){
    eve.preventDefault()
    let userDataLS;
    userDataLS = obtenerDatos_LocalStorage()

    //recorre objeto userDataLS y lo carga al DOM
    userDataLS.forEach(function(data) {

        // ya no se utiliza de forma directa se hace desde una funcion
        /* const lista =  document.createElement('ul')
        
        lista.innerHTML = `
            <li> Nombre: ${data.info_nombre} </li>
            <li> Correo: ${data.info_correo}</li>
            <li> Mensaje: ${data.info_mensaje}</li
        `;

        lista.style.borderBottom = 'solid 1px black';
        lista.style.textAlign = 'center'
        insertDOM.appendChild(lista) */

        templace_Literal(data)
    });

}


///crea templace literal del DOM
function templace_Literal(dato){
    const lista = document.createElement('ul')
    lista.setAttribute('data_id', dato.data_id)
    const btnBorrar = document.createElement('a')
    btnBorrar.textContent = "X"
    btnBorrar.classList.add('borrar')
    btnBorrar.title = "Borrar Registro";

    insertDOM.appendChild(btnBorrar)
        lista.innerHTML = `
            <li> Nombre: ${dato.info_nombre}</li>
            <li> Correo: ${dato.info_correo}</li>
            <li> Mensaje: ${dato.info_mensaje}</li
        `;
        lista.classList.add('list-data');
        insertDOM.appendChild(lista)
}

//envia el formulario
function enviarMensaje(eve){
    eve.preventDefault()
    
    swal({
        title: "Esta seguro el mensaje sera enviado?",
        text: "Una ves enviado para quitarlo tiene que borrarlo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            const datos = btnEnviar.parentElement;

            obtenerDatos(datos);

            const spinner = document.getElementById('spinner');
            spinner.style.display = 'block'

            setTimeout(function enviarHidden(){
        
            btnEnviar.style.display = 'none'
            setTimeout(function spinnerTime(){
                
                spinner.style.display = 'none';
                swal("El mensaje se esta enviando!", {
                    icon: "success",
                })
                setTimeout(function(){
                    formularioEnviar.reset()
                    window.location.reload()
                },3000)

        }, 1000)

    },0)
            ;
        } else {
            swal("El mensaje sigue como lo dejo!");
        }
    });
}

//abre los registros guardados
function registrosView(eve){
    eve.preventDefault()


    registros.classList.remove('registros-cerrar')
    registros.classList.add('registros-ver')
    formularioEnviar.style.zIndex = '10'
}

//cierra los registros guardados

function registrosCerrar(eve){
    eve.preventDefault()

    registros.classList.remove('registros-ver')
    registros.classList.add('registros-cerrar')

    setTimeout(function esperar(){
        formularioEnviar.style.zIndex = '20'
    },300)
}

//borra los registros

function borrarRegistros(eve){
    eve.preventDefault()

    swal({
        title: "Esta seguro?",
        text: "Una vez borrado, No podras volver a recuperarlo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("Listo! El mensaje a sido borrado!", {
            icon: "success",
            });
            let registro, registroId;
            if(eve.target.classList = 'error'){
                registro = eve.target.nextSibling;
                registroId = registro.getAttribute('data_id')
                eve.target.nextSibling.remove()
                eve.target.remove()
            }
            borrarRegistros_LS(registroId)
        } else {
            swal("El mensaje esta a salvo!");
        }
    });
}

function borrarRegistros_LS(registroId){
    const data = obtenerDatos_LocalStorage()
    
    data.forEach(function(dat, index){
        if(dat.data_id == registroId){
            data.splice(index, 1)
            localStorage.setItem('UserData' , JSON.stringify(data));
        }
    })
}
//variables
const enviarBtn = document.querySelector('#send')


//eventListener

function cargarEventListener(){
    //document.querySelector('#formulario').addEventListener('submit', enviarLocalStorage);
    enviarBtn.addEventListener('click', enviarLocalStorage)
}





//funciones

function enviarLocalStorage(){
    e.preventDefault();
    console.log(e.target.parentElement);
    alert('fds')
}
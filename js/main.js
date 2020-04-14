

function cap_form() {
    let name =   document.getElementById("name").value;
    let e_mail = document.getElementById("e-mail").value;
    let message = document.getElementById("message").value;


    const persona = {
        nomb: name,
        mail: e_mail,
        mes: message
    }
 
   console.log(`${persona.nomb} ${persona.mail} ${persona.mes}`);

}
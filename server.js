
/* BedelBot compara lista de cumpleaños que esta en Array de Objetos con Fecha actual.
Luego publica un comentario en Whatsapp si hay o no cumpleaños con Web-Whatsapp desde NodeJs.
Lo hacemos funcional solo con Backend por simplicidad. Asi solo ingresamos a la carpeta de proyecto con cd directorio,
luego ejecutamos con Node server.js. Me despreocupo de buscar archivo con lista de cumpleaños. */

const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

//Fechas de cumpleaños usuarios. Hay usuarios pendientes.
var birthdays = [
    { name: "User1", birthmonth: 0, birthdate: 8 },
    { name: "User2", birthmonth: 0, birthdate: 15 },
];

//Ejecuta QR virtual en terminal para crear instancias de ElectronJS - Whatsapp Desktop
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();


//Función compara fechas con lista de usuarios y envía mensaje a watsapp desktop si encuentra coincidencia, sino mensaje de saludo o null.
client.on('ready', () => {
    
    console.log('Client is ready!'); 
    // Número al que enviar mensaje. El segundo es el id en whatsapp del Grupo Osorno
    //const number = "";//Usuario de pruebas local
    const number = '@g.us'//Este es numero de quien creo grupo y extiende para crear grupo.

    // Obteniendo ChatId desde mensajes
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    //const chatId = number.substring(1) + "@c.us";
    const chatId = number;


    //ternario toma un valor u otro dependiende de que tenga dentro.
    //var cumple= (cumple !== undefined) ? cumple : "BedelBot: Nadie de cumpleaños hoy. Fuerza Cabecita y compañeros. Buen día!!!";//Ternario para funcion
    var cumple='';//Esta opción de variable solo saluda si hay coincidencia de cumpleaños dentro del día.
    var cumpleMan='';
    
    //Aqui la logica que compara fechas cumpleaños del día 
    var today = new Date();
    console.log("Fecha de hoy")
    console.log(today)
      
        birthdays.find((it) => {

            if(it.birthdate === today.getDate() && it.birthmonth === today.getMonth()) {
                cumple= `BedelBot: Hoy esta de cumpleaños ${it.name}. Salud y vigor cumpleañer@s!!!`;     
            } else {
                console.log("Usuario no esta de cumpleaños")   
            };

    });

    //Aqui la logica que compara fechas cumpleaños de mañana 
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    console.log(tomorrow)
      
        birthdays.find((it) => {

            if(it.birthdate === tomorrow.getDate() && it.birthmonth === tomorrow.getMonth()) {
                cumpleMan= `BedelBot: Recuerden que mañana esta de cumpleaños ${it.name}!!!`;     
            } else {
                console.log("Usuario no esta de cumpleaños")   
            };

    });  
    var cumples= `${cumple} ${cumpleMan}`;
    // Sending message.
    client.sendMessage(chatId, cumples);
});

//Fin.









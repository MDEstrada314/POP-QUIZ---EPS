require ('dotenv').config()  //importacion de las variables de entorno

//importacion de la clase server
const Server = require("./model/Server.js");
const server = new Server(); //instacia de la clase server

server.listen(); //ejecucucon del servidor
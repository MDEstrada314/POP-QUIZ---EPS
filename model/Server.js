
const { MongoClient } = require('mongodb');
const express = require('express');


//creacion de la clase server que ejecuta todas las funciones de nuestro servidor
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.client = new MongoClient(process.env.MONGO_URI);
    this.paths = {
      eps: '/EPS',
    };
    this.middlewares();
    this.connectDB();
    this.routes();
  }
 //conecion a la base de datos
  async connectDB() {
    try {
      await this.client.connect();
      console.log('Conectado a la base de datos');
    } catch (error) {
      console.log(error);
    }
  }
//para manejar archivos tipo json
  middlewares() {
    this.app.use(express.json());
  }
//importacion de las rutas
  routes() {
    this.app.use(this.paths.eps, require('../router/citas.router.js'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running in port: ${this.port}`);
    });
  }
}

module.exports = Server; //esportacon de la clase server para usarla sen app
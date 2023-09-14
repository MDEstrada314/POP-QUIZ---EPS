const { MongoClient } = require('mongodb'); //importacion 


//funcion para usarla que conecta la colecion 
const client = new MongoClient(process.env.MONGO_URI);

async function usuarios(Usuarios) {
  try {
    await client.connect();
    const database = client.db('EPS');
    const collection = database.collection(Usuarios);
    return collection;
  } catch (error) {
    console.log(error);
  }
}



//empoins 1 que llama a los usuarios en orden alfabetico
const getUsuarios= async (req, res) => {
    try {
      const collection = await usuarios('Usuarios');
      const data = await collection.find().sort({nombre:1}).toArray()
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'No funciona :C' });
    }
  };


//funcion para llamar a la fecha selecionada y al nombre que estan por esa fecha asignadas
  const getData= async (req, res) => {
    try {
      await client.connect();
      const database = client.db('EPS');
      const collection = database.collection('Cita');
      const fechaCita = new Date('2023-09-02');
      const data = await collection.find({ fecha: fechaCita }).sort({ Usuario: 1 }).toArray();
  
      const usuariosCollection = database.collection('Usuarios');
  
      // Creamos un array para almacenar solo los nombres de usuarios
      const usuarioNombres = [];
      for (const item of data) {
        const usuarioData = await usuariosCollection.findOne({ _id: item.Usuario });
        if (usuarioData && usuarioData.nombre) {
          // Si el documento de usuario existe y tiene un campo "nombre", lo agregamos al array
          usuarioNombres.push(usuarioData.nombre);
        }
      }
  
      res.json({
        data,
        usuarioNombres,
      });
    } catch (error) {
      res.status(500).json({ error: 'No fecha registrada :C' });
    }
  };
  
  
  



  
//exportacion de las funciones para usarlas en las rutas
module.exports = {
    getUsuarios,
    getData
  

}
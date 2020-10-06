const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
require('dotenv').config();

//Importa Rotas
const rotaUsuario = require('./rotas/usuario_rota');
const rotaEmpresa = require('./rotas/empresa_rota');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//Configuração do Mongoose
mongoose.connect(process.env.MDB_CONN_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(()=> {
    console.log('BD conectado');
  })
  .catch((error)=> {
    console.log('Error ao conectar ao BD');
  });
mongoose.Promise = global.Promise;

//Middleware para Log
// app.use((req,resp,next) => {
//   console.log("Request Time: "+Date.now());
//   console.log("Method: "+req.method)
//   next();
// });

//Uso das rotas
app.use('/usuarios', rotaUsuario);
app.use('/empresas', rotaEmpresa);

app.listen(port, () => {
  console.log(`Iniciando o servidor: http://localhost:${port}`);
});
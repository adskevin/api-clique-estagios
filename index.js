const express = require('express');
const app = express();
const mongoose = require('mongoose');
let devPort = 3000;

try {
  let result = require('dotenv').config();
  if(result.error) {
    console.log(result.error);
  } else {
    devPort = process.env.PORT;
  }
} catch (error) {
  console.log('Erro ao carregar a dependência "dotenv" - ' + error);
}

//Importa Rotas
const rotaAuth = require('./rotas/auth_rota');
const rotaUsuario = require('./rotas/usuario_rota');
const rotaEmpresa = require('./rotas/empresa_rota');
const rotaVaga = require('./rotas/vaga_rota');

// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))


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
app.use('/auth', rotaAuth);
app.use('/usuarios', rotaUsuario);
app.use('/empresas', rotaEmpresa);
app.use('/vagas', rotaVaga);

app.listen(process.env.PORT || devPort);

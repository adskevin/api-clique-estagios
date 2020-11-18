const Usuario = require('../model/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.listar = (req, res) => {
    Usuario.find({},(err, usuarios) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(usuarios);
    });
}

exports.inserir = (req, res) => {
    let novoUsuario = new Usuario(req.body);
    console.log(req.body);
    novoUsuario.senha = bcrypt.hashSync(req.body.senha,10); 
    novoUsuario.save((err, usuario) => {
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        res.status(201).json(usuario);        
    });
}

exports.atualizar = (req, res) => {
    let id = req.id;
    let usuarioAtualizar = req.body;
    Usuario.findOneAndUpdate({ _id: id }, usuarioAtualizar, { new: true }, (err, usuarioAtual) => {
        if(err){
            res.send(err);
        }
        res.json(usuarioAtual);
    });
}

exports.deletar = (req, res) => {
    let id = req.id;
    Usuario.findOneAndDelete({ _id: id }, (err, usuarioAtual) => {
        if(err){
            res.send(err);
        }
        res.json(usuarioAtual);
    });
}

exports.buscarUsuario = (req, res) => {
    if (req.query && req.query.cpf){
        const paramUsuario = req.query.cpf;
        Usuario.findOne({ 'informacoes.pessoais.cpf': paramUsuario }, (err, usuario) => {
            if(err){
                res.status(500).send(err);
            }
            if(usuario) {
                usuario.senha = "";
                res.json(usuario);
            } else {
                res.status(400).send("Bad request.");
            }
        });
    }
}

// exports.buscarPorId = (req, res) => {
//     let id = req.params.id;
//     Usuario.findById(id, (err, usuario) => {
//         if(err)
//             res.status(500).send(err);        
//         res.json(usuario);
//     });
// }
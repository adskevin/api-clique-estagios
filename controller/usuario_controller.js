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
    novoUsuario.senha = bcrypt.hashSync(req.body.senha,10); 
    novoUsuario.save((err, usuario) => {
        if(err){
            res.send(err);
        }    
        res.status(201).json(usuario);
        
    });
}

exports.atualizar = (req, res) => {
    let id = req.params.id;
    let usuarioAtualizar = req.body;
    Usuario.findOneAndUpdate({ _id: id }, usuarioAtualizar, { new: true }, (err, usuarioAtual) => {
        if(err){
            res.send(err);
        }
        res.json(usuarioAtual);
    });
}

exports.deletar = (req, res) => {
    let id = req.params.id;
    Usuario.findOneAndDelete({ _id: id }, (err, usuarioAtual) => {
        if(err){
            res.send(err);
        }
        res.json(usuarioAtual);
    });
}

exports.buscarPorId = (req, res) => {
    let id = req.params.id;
    Usuario.findById(id, (err, usuario) => {
        if(err)
            res.status(500).send(err);        
        res.json(usuario);
    });
}

exports.buscarUsuario = (req, res, next) => {
    if (req.query && req.query.usuario){
        const paramUsuario = req.query.usuario;
        Usuario.find({usuario: paramUsuario}, (err, usuarios) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(usuarios);
        });
    }
}

exports.validaUsuario = (req, res, next) => {
    if (req.body && req.body.usuario && req.body.senha){
        const usuario = req.body.usuario;
        const senha = req.body.senha
        Usuario.findOne({usuario}, (err, usuario) => {
            if(err){
                res.status(500).send(err);
            }
            const valido = bcrypt.compareSync(senha, usuario.senha);
            if(usuario && valido){
                const token = jwt.sign({
                    id: usuario.id,
                    user: true
                }, process.env.SECRET_KEY, {expiresIn: "1h"});
                res.status(201).send({token});
            }
            else{
                res.status(401).send("Usuario ou senha invalidos");
            }
        });
    }
}

exports.validaTokenUsuario = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(!token) {
        res.status(401).send("Nao tem token de acesso");
    }
    else {
        jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) =>{
            if(err){
                res.status(401).send(err.message);
            }
            else {
                console.log("Usuario autorizado: " + userInfo.id);
                next();
            }
        })
    }
}

const Empresa = require('../model/empresa');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.listar = (req, res) => {
    Empresa.find({},(err, empresas) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(empresas);
    });
}

exports.inserir = (req, res) => {
    let novoEmpresa = new Empresa(req.body);
    novoEmpresa.senha = bcrypt.hashSync(req.body.senha,10); 
    novoEmpresa.save((err, empresa) => {
        if(err){
            res.send(err);
        }    
        res.status(201).json(empresa);
        
    });
}

exports.atualizar = (req, res) => {
    let id = req.params.id;
    let empresaAtualizar = req.body;
    Empresa.findOneAndUpdate({ _id: id }, empresaAtualizar, { new: true }, (err, empresaAtual) => {
        if(err){
            res.send(err);
        }
        res.json(empresaAtual);
    });
}

exports.deletar = (req, res) => {
    let id = req.params.id;
    Empresa.findOneAndDelete({ _id: id }, (err, empresaAtual) => {
        if(err){
            res.send(err);
        }
        res.json(empresaAtual);
    });
}

exports.buscarPorId = (req, res) => {
    let id = req.params.id;
    Empresa.findById(id, (err, empresa) => {
        if(err)
            res.status(500).send(err);        
        res.json(empresa);
    });
}

exports.buscarEmpresa = (req, res, next) => {
    if (req.query && req.query.empresa){
        const paramEmpresa = req.query.empresa;
        Empresa.find({empresa: paramEmpresa}, (err, empresas) => {
            if(err){
                res.status(500).send(err);
            }
            res.json(empresas);
        });
    }
}

exports.validaEmpresa = (req, res) => {
    if (req.body && req.body.login && req.body.senha){
        const login = req.body.login;
        const senha = req.body.senha
        Empresa.findOne({login}, (err, empresa) => {
            if(err){
                res.status(500).send(err);
            }
            const valido = bcrypt.compareSync(senha, empresa.senha);
            if(empresa && valido){
                const token = jwt.sign({
                    id: empresa.id,
                    user: false
                }, process.env.SECRET_KEY, {expiresIn: "1h"});
                res.status(201).send({token});
            }
            else{
                res.status(401).send("Login ou senha invalidos");
            }
        });
    }
}

exports.validaTokenEmpresa = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(!token) {
        res.status(401).send("Nao tem token de acesso");
    }
    else {
        jwt.verify(token, process.env.SECRET_KEY, (err, empresaInfo) =>{
            if(err){
                res.status(401).send(err.message);
            }
            else {
                console.log("Empresa autorizada: " + empresaInfo.id);
                next();
            }
        })
    }
}

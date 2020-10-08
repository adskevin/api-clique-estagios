const Empresa = require('../model/empresa');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.listar = (req, res) => {
    Empresa.find({},(err, empresas) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(empresas);
    }).populate('vagas');
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
    let id = req.id;
    let empresaAtualizar = req.body;
    Empresa.findOneAndUpdate({ _id: id }, empresaAtualizar, { new: true }, (err, empresaAtual) => {
        if(err){
            res.send(err);
        }
        res.json(empresaAtual);
    });
}

exports.atualizarVagas = (vaga) => {
    let id = vaga.empresa;
    Empresa.findOneAndUpdate({ _id: id }, { $push: { vagas: vaga } }, { new: true }, (err, empresaAtual) => {
        if(err){
            return err;
        }
        return true;
    });
}

exports.deletar = (req, res) => {
    let id = req.id;
    Empresa.findOneAndDelete({ _id: id }, (err, empresaAtual) => {
        if(err){
            res.send(err);
        }
        res.json(empresaAtual);
    });
}

exports.buscarEmpresa = (req, res, next) => {
    if (req.query && req.query.cnpj){
        const paramEmpresa = req.query.cnpj;
        console.log(typeof paramEmpresa);
        Empresa.findOne({ 'informacoes.principais.cnpj': paramEmpresa }, (err, empresa) => {
            if(err){
                res.status(500).send(err);
            }
            if(empresa) {
                empresa.senha = "";
                res.json(empresa);
            } else {
                res.status(400).send("Bad request.");
            }
        });
    }
}

// exports.buscarPorId = (req, res) => {
//     let id = req.params.id;
//     Empresa.findById(id, (err, empresa) => {
//         if(err)
//             res.status(500).send(err);        
//         res.json(empresa);
//     });
// }
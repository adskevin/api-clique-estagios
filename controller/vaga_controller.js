const Vaga = require('../model/vaga');
// const jwt = require('jsonwebtoken');

exports.listar = (req, res) => {
    Vaga.find({},(err, vagas) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(vagas);
    }).populate('empresa');
}

exports.inserir = (req, res) => {
    console.log(req.id);
    let novaVaga = new Vaga(req.body);
    novaVaga.empresa = req.id;
    novaVaga.save((err, vaga) => {
        if(err){
            res.send(err);
        }
        res.status(201).json(vaga);
    });
}

exports.atualizar = (req, res) => {
    let id = req.params.id;
    let vagaAtualizar = req.body;
    Vaga.findOneAndUpdate({ _id: id }, vagaAtualizar, { new: true }, (err, vagaAtual) => {
        if(err){
            res.send(err);
        }
        res.json(vagaAtual);
    });
}

exports.deletar = (req, res) => {
    let id = req.params.id;
    Vaga.findOneAndDelete({ _id: id }, (err, vagaAtual) => {
        if(err){
            res.send(err);
        }
        res.json(vagaAtual);
    });
}

exports.buscarPorId = (req, res) => {
    let id = req.params.id;
    Vaga.findById(id, (err, vaga) => {
        if(err)
            res.status(500).send(err);        
        res.json(vaga);
    });
}

exports.buscarVaga = (req, res, next) => {
    if (req.query && req.query.cnpj){
        const paramVaga = req.query.cnpj;
        console.log(typeof paramVaga);
        Vaga.findOne({ 'informacoes.principais.cnpj': paramVaga }, (err, vagas) => {
            if(err){
                res.status(500).send(err);
            }
            vagas.senha = "";
            res.json(vagas);
        });
    }
}

const Vaga = require('../model/vaga');
const Empresa = require('../model/empresa');
const Usuario = require('../model/usuario');
const { atualizarVagas } = require('./empresa_controller.js');
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
    if(req.isUser === true) {
        res.status(403).send('Não autorizado');
    } else {
        let novaVaga = new Vaga(req.body);
        novaVaga.empresa = req.id;
        novaVaga.save((err, vaga) => {
            if(err){
                res.send(err);
            } else {
                atualizarVagas(vaga);
                res.json(vaga);
            }
        });
    }
}

exports.atualizar = (req, res) => {
    let idEmpresa = req.id;
    let idVaga = req.body._id;
    let vagaAtualizar = req.body;
    Vaga.findOne({ _id: idVaga }, (err, vaga) => {
        if(err){
            res.status(400).send("Bad request.");
        }
        if(vaga) {
            if (vaga.empresa.toString() === idEmpresa) {
                console.log('vaga pertence à empresa logada');
                Vaga.findOneAndUpdate({ _id: idVaga }, vagaAtualizar, { new: true }, (err, vagaAtual) => {
                    if(err){
                        res.send(err);
                    }
                    res.json(vagaAtual);
                });
            } else {                
                res.status(400).send('Bad request.');
            }
        }
    });
}

exports.deletar = (req, res) => {
    let idVaga = req.params.id;
    let idEmpresa = req.id;
    Vaga.findOne({ _id: idVaga }, (err, vaga) => {
        if(err){
            res.status(400).send("Bad request.");
        }
        if(vaga) {
            if (vaga.empresa.toString() === idEmpresa) {
                console.log('vaga pertence à empresa logada');
                Vaga.findOneAndDelete({ _id: idVaga }, (err, vagaAtual) => {
                    if(err){
                        res.send(err);
                    }
                    res.json(vagaAtual);
                });
            } else {                
                res.status(400).send('Bad request.');
            }
        }
    });
}

exports.buscarVaga = (req, res) => {
    if (req.query && req.query.id){
        const paramVaga = req.query.id;
        Vaga.findOne({ _id: paramVaga }, (err, vagas) => {
            if(err){
                res.status(400).send("Bad request.");
            }
            res.json(vagas);
        });
    }
}

exports.buscarVagaCNPJ = (req, res) => {
    if (req.query && req.query.cnpj){
        const cnpj = req.query.cnpj;
        Empresa.findOne({ 'informacoes.principais.cnpj': cnpj }, (err, empresa) => {
            if(err){
                res.status(400).send("Bad request.");
            }
            if (empresa) {
                res.json(empresa.vagas);
            }
        }).populate('vagas');
    }
}

exports.buscarVagaCPF = (req, res) => {
    if (req.query && req.query.cpf){
        const cpf = req.query.cpf;
        Usuario.findOne({ 'informacoes.pessoais.cpf': cpf }, (err, usuario) => {
            if(err){
                res.status(400).send("Bad request.");
            }
            if (usuario) {
                res.json(usuario.informacoes.vagasInteresse);
            }
        }).populate('informacoes.vagasInteresse');
    }
}

exports.interesseVaga = (req, res) => {
    let idVaga = req.body.idVaga;
    let idUsuario = req.id;

    Vaga.findOneAndUpdate({ _id: idVaga }, { $push: { interessados: idUsuario } }, { new: true }, (err) => {
        if(err){
            res.status(400).send("Bad request.");
        }
        Usuario.findOneAndUpdate({ _id: idUsuario }, { $push: { 'informacoes.vagasInteresse': idVaga } }, { new: true }, (err) => {
            if(err){
                res.status(400).send("Bad request.");
            }
        });
        res.json("done");
    });
}

// exports.buscarPorId = (req, res) => {
//     let id = req.params.id;
//     Vaga.findById(id, (err, vaga) => {
//         if(err)
//             res.status(500).send(err);        
//         res.json(vaga);
//     });
// }

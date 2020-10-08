const Empresa = require('../model/empresa');
const Usuario = require('../model/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.autentica = (req, res) => {
    console.log('autentica');
    if (req.body && req.body.senha) {
        const senha = req.body.senha
        if(req.body.cpf) {
            const cpf = req.body.cpf;
            Usuario.findOne({'informacoes.pessoais.cpf': cpf}, (err, usuario) => {
                if(err){
                    res.status(500).send(err);
                }
                if(usuario != null) {
                    const valido = bcrypt.compareSync(senha, usuario.senha);
                    if(usuario && valido){
                        const token = jwt.sign({
                            id: usuario.id,
                            user: true
                        }, process.env.SECRET_KEY, {expiresIn: "1h"});
                        res.status(201).send({token});
                    }
                    else{
                        res.status(401).send("Credenciais inválidas");
                    }
                } else {
                    res.status(400).send('Usuário não encontrado.');
                }
            });
        }
        else if(req.body.cnpj) {
            const cnpj = req.body.cnpj;
            Empresa.findOne({'informacoes.principais.cnpj': cnpj}, (err, empresa) => {
                if(err) {
                    res.status(500).send(err);
                }
                if(empresa != null) {
                    const valido = bcrypt.compareSync(senha, empresa.senha);
                    if(empresa && valido){
                        const token = jwt.sign({
                            id: empresa.id,
                            user: false
                        }, process.env.SECRET_KEY, {expiresIn: "1h"});
                        res.status(201).send({token});
                    }
                    else{
                        res.status(401).send("Credenciais inválidas");
                    }
                } else {
                    res.status(400).send('Empresa não encontrada.');
                }
            });
        }
    }
}

exports.validaToken = (req, res, next) => {
    const token = req.get("x-auth-token");
    if(!token) {
        res.status(401).send("Nao tem token de acesso");
    }
    else {
        jwt.verify(token, process.env.SECRET_KEY, (err, tokenInfo) => {
            console.log(tokenInfo);
            if(err){
                res.status(401).send(err.message);
            }
            else {
                req.id = tokenInfo.id;
                req.isUser = tokenInfo.user;
                next();
            }
        })
    }
}

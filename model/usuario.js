var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UsuarioSchema = new Schema({
    usuario: String,
    senha: String,
    email: String,
    informacoes: {
        pessoais: {
            nome: String,
            sexo: String,
            estadoCivil: String,
            dataNasc: String,
            rg: String,
            cpf: String,
        },
        endereco: {
            cep: String,
            rua: String,
            numero: String,
            complemento: String,
            uf: String,
            cidade: String,
            bairro: String
        },
        contato: {
            celular: String,
            outros: [String]
        },
        redesSociais: {
            facebook: String,
            instagram: String,
            linkedin: String,
            twitter: String,
            github: String,
            outras: [String]
        },
        habilidades: [String],
        educacao: [
            {
                nivelEnsino: String,
                instituicao: String,
                cursoGrau: String,
                prevFormatura: String,
            }
        ],
        disponibilidade: String,
        experiencias: [
            {
                descr: String,
                empresa: String,
                periodo: String
            }
        ]

    }
}, {
    versionKey:false
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
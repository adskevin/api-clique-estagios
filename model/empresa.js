var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const EmpresaSchema = new Schema({
    admins: [String],
    login: String,
    senha: String,
    email: String,
    informacoes: {
        principais: {
            razaoSocial: String,
            nomeFantasia: String,
            dataFundacao: String,
            ie: String,
            ramo: String,
            cnpj: String
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
            celular: Number,
            outros: [
                {
                    descr: String,
                    numero: Number
                }
            ],
            sites: [
                {
                    descr: String,
                    link: String
                }
            ],
            responsaveis: [String]
        },
        redesSociais: {
            facebook: String,
            instagram: String,
            linkedin: String,
            twitter: String,
            github: String,
            outras: [
                {
                    descr: String,
                    valor: String
                }
            ]
        },
        outros: {
            numeroFuncionarios: Number,
            comentarios: [String],
            pontosRef: [String],
            onibusPerto: [String]
        }
    },
    vagas: [String]
}, {
    versionKey:false
});

module.exports = mongoose.model("Empresa", EmpresaSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const EmpresaSchema = new Schema({
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
            celular: String,
            telefonePrincipal: String,
            telefoneAuxiliar: String,
            responsavel: String,
            substituto: String,
            site: String
        },
        redesSociais: {
            facebook: String,
            instagram: String,
            linkedin: String,
            twitter: String,
            github: String,
            outras: String
        },
        outros: {
            numeroFuncionarios: Number,
            comentarios: String,
            pontosRef: String,
            onibusPerto: String
        }
    },
    vagas: [{ type: Schema.ObjectId, ref: 'Vaga' }]
}, {
    versionKey: false
});

module.exports = mongoose.model("Empresa", EmpresaSchema);
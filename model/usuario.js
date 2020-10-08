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
            dataNasc: Date,
            rg: String,
            cpf: String
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
            ]
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
        habilidades: [String],
        educacao: [
            {
                nivelEnsino: String,
                instituicao: String,
                cursoGrau: String,
                prevFormatura: String
            }
        ],
        disponibilidade: String,
        experiencias: [
            {
                descr: String,
                empresa: String,
                periodo: String
            }
        ],
        vagasInteresse: [{ type: Schema.ObjectId, ref: 'Vaga' }]
    }
}, {
    versionKey:false
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
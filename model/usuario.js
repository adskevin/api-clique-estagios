var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UsuarioSchema = new Schema({
    usuario: String,
    senha: String,
    informacoes: {
        pessoais: {
            nome: String,
            sexo: String,
            estadoCivil: String,
            dataNasc: Date,
            rg: String,
            cpf: String,
            email: String,
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
            telefonePrincipal: String,
            telefoneAuxiliar: String,
            celular: String,
            responsavelRecado: String
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
                nivelEnsino: [String],
                instituicao: String,
                cursoGrau: String,
                mesFormatura: [String],
                anoFormatura: [String],
                numeroMatricula: String,
                semestre: String
            }
        ],
        disponibilidade: [String],
        experiencias: {
            experienciaAtual: {
                empresaAtual: String,
                periodoIncialAtual: String,
                periodoFinalAtual: String,
                atividadesAtual: String,
              },
              experienciaPenultima: {
                empresaPenultima: String,
                periodoIncialPenultima: String,
                periodoFinalPenultima: String,
                atividadesPenultima: String,
              },
              experienciaVivenciaAnterior1: {
                empresaVivenciaAnterior: String,
                periodoIncialVivenciaAnterior: String,
                periodoFinalVivenciaAnterior: String,
                atividadesVivenciaAnterior: String,
              },
              experienciaVivenciaAnterior2: {
                empresaVivenciaAnterior: String,
                periodoIncialVivenciaAnterior: String,
                periodoFinalVivenciaAnterior: String,
                atividadesVivenciaAnterior: String,
              }
        },
        habilidades: [],
        educacao: [],
        disponibilidade: [],
        experiencias: [],
        conhecimentos: {
            idiomas: [],
            informatica: [],
            outros: []
        },
        portfolio: String,
        vagasInteresse: [{ type: Schema.ObjectId, ref: 'Vaga' }]
    }
}, {
    versionKey:false
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
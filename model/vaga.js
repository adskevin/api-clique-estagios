var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const VagaSchema = new Schema({
    nome: String,
    atividade: String,
    numeroVagas: String,
    remuneracao: String,
    possibilidadeEfetivacao: String,
    horario: String,
    cargaHoraria: String,
    requisitos: String,
    SemestreMinimo: String,
    beneficios: String,
    outrosBeneficios: String,
    observacao: String,
    empresa: { type: Schema.ObjectId, ref: 'Empresa' },
    interessados: [{ type: Schema.ObjectId, ref: 'Usuario' }]
}, {
    versionKey:false
});

module.exports = mongoose.model("Vaga", VagaSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const VagaSchema = new Schema({
    titulo: String,
    atividades: String,
    ramo: String,
    cidade: String,
    bairro: String,
    onibusProximos: String,
    pontoReferencia: String,
    numeroVagas: String,
    remuneracao: Number,
    possibilidadeEfetivacao: String,
    horario: String,
    cargaHoraria: String,
    requisitos: String,
    semestreMinimo: String,
    beneficios: String,
    outrosBeneficios: String,
    observacao: String,
    empresa: { type: Schema.ObjectId, ref: 'Empresa' },
    interessados: [{ type: Schema.ObjectId, ref: 'Usuario' }]
}, {
    versionKey: false
});

module.exports = mongoose.model("Vaga", VagaSchema);
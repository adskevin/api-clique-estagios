var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const VagaSchema = new Schema({
    nome: String,
    descricao: String,
    empresa: { type: Schema.ObjectId, ref: 'Empresa' },
    interessados: [{ type: Schema.ObjectId, ref: 'Usuario' }]
}, {
    versionKey:false
});

module.exports = mongoose.model("Vaga", VagaSchema);
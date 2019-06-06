'use strict'

//--------------------- importações ------------------------------
const mongoose = require('mongoose');
const schema = mongoose.Schema;
// --------------------------------------------------------------


const categoriaModel = new schema({
    titulo: {trim: true, index: true, required: true, type: String},
    descricao: { type: String},
    foto: { type: String, required: true},
    ativa: { type: Boolean, required: true, default: true},
    dataCriacao: { type: Date, default: Date.now}

}, { versionKey: false});

//usando o pre para fazer algo antes de salvar.

categoriaModel.pre('save', next => {
    //dizendo que se não tiver nenhuma data preenchida será criada uma data nova.
let agora = new Date();
if(!this.dataCriacao){
    this.dataCriacao = agora;
    next();
}

})

module.exports = mongoose.model('Categoria', categoriaModel);
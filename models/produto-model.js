'use strict';

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const produtoModel = new schema(
  {
    nome: { type: String, required: true, trim: true, index: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    foto: { type: String, required: true },
    ativa: { type: Boolean, required: true, default: true },
    //criando um id para criar o relacionamento, na referência vai o nome dado ao modelo.
    categoria: {type: schema.Types.ObjectId, ref: 'Categoria'},
    dataCriacao: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

produtoModel.pre("save", next => {
  let agora = new Date();
  if (!this.dataCriacao) {
    this.dataCriacao = agora;
    next();
  }
});

module.exports = mongoose.model("Produto", produtoModel);

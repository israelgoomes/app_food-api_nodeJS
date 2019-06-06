"use strict";
const repository = require("../repositories/produto-repository");
const _repo = new repository();
const validation = require("../bin/helpers/validation");
const ctrlBase = require("../bin/base/controller-base");

function produtoController() {}

produtoController.prototype.post = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.nome, "Digite um título");
  _validationContract.isRequired(req.body.descricao, "Digite uma desccrição");
  _validationContract.isRequired(req.body.preco, "Informe o preço.");
  _validationContract.isRequired(req.body.foto, "A foto é obrigatória.");
  //se o preço for informado, será checado se o preço é igual a 0
  if (req.body.preco) {
    _validationContract.isTrue(req.body.preco == 0, "Digite um preço válido!");
  }

  ctrlBase.post(_repo, _validationContract, req, res);
};

produtoController.prototype.put = async (req, res) => {
  let _validationContract = new validation();

  _validationContract.isRequired(req.body.nome, "Digite um título");
  _validationContract.isRequired(req.body.descricao, "Digite uma desccrição");
  _validationContract.isRequired(req.body.preco, "Informe o preço.");
  _validationContract.isRequired(req.body.foto, "A foto é obrigatória.");

  if (req.body.preco) {
    _validationContract.isTrue(req.body.preco == 0, "Digite um preço válido!");
  }

  ctrlBase.put(_repo, _validationContract, req, res);
};

produtoController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res);
};

produtoController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res);
};

produtoController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res);
};

module.exports = produtoController;

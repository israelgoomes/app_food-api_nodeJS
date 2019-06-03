'use strict'
const repository = require('../repositories/produto-repository');

function produtoController() {

}

produtoController.prototype.post = async(req, res) => {
    let lista = await new repository().create(req.body);
    res.status(200).send(lista);

 }

produtoController.prototype.put = async(req, res) => {
    let modificado = await new repository().update(req.params.id, req.body);
    res.status(200).send(modificado);
 }

produtoController.prototype.get = async(req, res) => { 
    let resultado = await new repository().getAll();
    res.status(200).send(resultado);
}

produtoController.prototype.getById = async(req, res) => { 
    let resultado = await new repository().getById(req.params.id);
    res.status(200).send(resultado);
}

produtoController.prototype.delete = async(req, res) => { 
    let deletado = await new repository().delete(req.params.id);
    res.status(204).send(deletado);
}

module.exports = produtoController;
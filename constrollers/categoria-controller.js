'use strict'

//registrando a categoria model
const mongoose = require('mongoose');
//importando o model de cateogira através do nome colocado na exportação ná página da model.
const repository = require('../repositories/categoria-repository');


mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

function categoriaController(){
}

//C R U D

//representa o objeto protótipo da function
categoriaController.prototype.post = async (req, res) => { 
//criando uma categoria que recebe o que está vindo do body
let lista = await new repository().create(req.body);
res.status(200).send(lista);



/*trata a requisição da rota, resolve e retorna.
return modelo.save(); */
};

categoriaController.prototype.put = async(req, res) => { 
    //findByIdAndUpdate é uma das diversas funções do mongo
    //forma de se passar o id: req.params.id, e depois está setandp as informações vindas do body
    let resultado = await new repository().update(req.params.id, req.body);
    res.status(202).send(resultado);
   //return categoria.findById(req.params.id);

};

categoriaController.prototype.get = async(req, res) => {
    let lista = await new repository().getAll();
    res.status(200).send(lista);
    //return categoria.find();
};

categoriaController.prototype.getById = async(req, res) => {
    let buscarPorId = await new repository().getById(req.params.id);
    res.status(200).send(buscarPorId);
    //return categoria.findById(req.params.id);
};

categoriaController.prototype.delete = async(req, res) => { 
    let deletado = await new repository().delete(req.params.id);
    res.status(204).send(deletado);
    //return categoria.findByIdAndRemove(req.params.id);

};

module.exports = categoriaController;
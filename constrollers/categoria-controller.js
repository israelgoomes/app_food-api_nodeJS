'use strict'

function categoriaController(){

}

//C R U D

//representa o objeto protótipo da function
categoriaController.prototype.post = async (req, res) => { };

categoriaController.prototype.put = async(req, res) => { };

categoriaController.prototype.get = async(req, res) => {
    res.status(200).send("Funcionando ...")
 };

categoriaController.prototype.getById = async(req, res) => {
    res.status(200).send(`O id passado foi: ${req.params.id}`);
 };

categoriaController.prototype.delete = async(req, res) => { };

module.exports = categoriaController;
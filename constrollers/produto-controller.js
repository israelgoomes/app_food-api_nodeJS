'use strict'

function produtoController() {

}

produtoController.prototype.post = async(req, res) => {
    
 }

produtoController.prototype.put = async(req, res) => { }

produtoController.prototype.get = async(req, res) => { 
    res.status(200).send("Funcionando produto...")
}

produtoController.prototype.getById = async(req, res) => { 
    res.status(200).send(`Id do Produto: ${req.params.id}`)
}

produtoController.prototype.delete = async(req, res) => { }

module.exports = produtoController;
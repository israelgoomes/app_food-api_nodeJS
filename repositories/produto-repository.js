require('../models/produto-model');
const base = require('../bin/base/repository-base');

class produtorepository{
constructor(){
    this._base = new base('Produto');
}


async create(data){
 return await this._base.create(data);
}

async update(id, data){
    return await this._base.update(id, data);

}

async getAll(){
       //trazendo todos os dados e populando uma relação, no caso da da categoria, e informando a projeção dos 
        //dados que deseja trazer.
       return await this._base._model.find().populate('categoria','_id titulo' );
}

async getById(id){
    return await this._base.getById(id);
}

async delete(id){
    return await this._base.delete(id);
}


}

module.exports = produtorepository;
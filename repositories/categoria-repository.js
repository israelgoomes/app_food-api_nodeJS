require('../models/categoria-model');
const base = require('../bin/base/repository-base');


class categoriaRepository{

constructor(){
    /*criando uma varável que irá representar o nosso repository base, pegando o nome do nosso model 'Categoria', 
    dessa forma usando essa variável será possível utilizar os métodos do repositoryBase através da variável criada no construtor*/
    this._base = new base('Categoria');
}

//data de dados.
async create(data){
return await this._base.create(data);
}

async update(id, data){
  return await this._base.update(id, data);
}

async getAll(){
    return await this._base.getAll();
}

async getById(id){ 
    return await this._base.getById(id);
}

async delete(id){
return await this._base.delete(id);
}

}


module.exports = categoriaRepository;


'use strict'

require('../models/usuario-model');
const base = require('../bin/base/repository-base');
const md5 = require('md5');

class usuarioRepository {
constructor(){

    this._base = new base('Usuario');
    this._projection = 'nome email _id';
}
async isEmailExiste(Email){
    return await this._base._model.findOne({email: Email}, this._projection);
}

async authenticate(Email, Senha){
    //criptografando a senha
    let _hashSenha = mds(Senha);
    //fazendo a autenticação do login, e criando uma projeção para mostrar o que deve aparecer no select (nome email _id), utilizando o ._model pois dentro do base não havia os métodos necessários.
    return await this._base._model.findOne({ email: Email, senha: _hashSenha}, this._projection);
}


async create(data){
    //a estrutura muda pois ao invés de retornar o usuario direto, foi criado uma projeção para retornar apenas os dados configurados.
    //não foi utilizado o find criado no repository pois ele não foi configurado com projeção.
    let usuarioCriado = await this._base.create(data);
    return this._base._model.findById(usuarioCriado._id, this._projection);
}

async update(id, data){
    let usuarioAtualizado = await this._base.update(id, {
        nome: data.nome,
        email: data.email,
        foto: data.foto
    });
    return this._base._model.findById(usuarioAtualizado._id, this._projection); 

}

async getAll(){
  return await this._base._model.find({}, this._projection);
  
}

async getById(id){
   return await this._base._model.findById(id, 'nome email _id foto');
}

async delete(id){
        return await this._base.delete(id);
}



}

module.exports = usuarioRepository;
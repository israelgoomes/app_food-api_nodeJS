exports.post = async(repository, validationContract, req, res) => { 
try {
    let data = req.body;

    //se não estiver válido entra aqui, caso contrário pula
    if(!validationContract.isValid()) {
        res.status(400).send({message: 'Existem dados inválidos na sua requisição', 
        validation: validationContract.errors()}).end();
        //esse return serve para sair da função, se não o javascript continua.
        return;
    }

    //pegando o repositório que será passado para o controller específico e utilizando sua função create
    let resultado = await repository.create(data);
    res.status(201).send(resultado);

} catch (err) {
    console.log('post com erro, motivo: ', err); 
    res.status(500).send({message: 'Erro no processamento', error: err})
}
};

exports.put = async(repository, validationContract, req, res) => {

   
try {
    let data = req.body;

    if(!validationContract){
        res.status(400).send({message: 'Existem dados inválidos na sua requisição',
        validation: validationContract.errors()}).end();
        return;
    }
    let resultado =  await repository.update(req.params.id, data);
    res.status(202).send(resultado);

} catch (err) {
    console.log('Update com erro, motivo: ', err);
    res.status(500).send({message: 'Erro no processamento', error: err});
    
}
 };

exports.get = async(repository, req, res) => { 

    try {
    let resultado = await repository.getAll();
    res.status(200).send(resultado);

} catch (err) {
        console.log('Get com erro, motivo: ', err);
        res.status(500).send({message: 'Erro no processamento', error: err});
}
};

exports.getById = async(repository, req, res) => { 

    try {  
        let id = req.params.id

     if(id){
        let resultado = await repository.getById(id);
        res.status(200).send(resultado);
     }else{
         res.status(400).send({message: 'O parâmetro ID precisa ser informado.'});
     }
   
} catch (err) {
        console.log('Get by id com erro, motivo: ', err)
        res.status(500).send({message: 'Erro no processamento', error: err});
}

};

exports.delete = async(repository, req, res) => { 
try {
    let id = req.params.id;

    if(id){
        let resultado = await repository.delete(id);
        res.status(200).send({message: 'Registro exluído com sucesso'});
    }else {
        res.status(400).send({message: 'O parâmetro ID precisa ser informado.'});

    }
    
} catch (err) {
    console.log('Delete com erro motivo: ', err)
    res.status(500).send({message: 'Erro no processamento', error: err});
}

};
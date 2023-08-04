const getCollection = require('./billingCycle');
const ObjectId = require('mongodb').ObjectId;

let coll; // Defina a variável coll no nível do módulo

getCollection().then(collection => {
  coll = collection; // Atribua a coleção à variável coll
});

// Rota para obter todos os ciclos de faturamento
async function get(req, res, next) {
    try {
      const result = await coll.find().toArray();
      res.json(result);
    } catch (error) {
      res.status(500).json({ errors: [error] });
    }
  }
  

// Rota para adicionar um novo ciclo de faturamento
async function post(req, res, next) {
    console.log('Função post chamada'); // Log para verificar se a função é chamada
    
    try {
        console.log('Tentando inserir o documento'); // Log para verificar se a função é chamada
        const result = await coll.insertOne(req.body);
        console.log('Resultado da inserção:', result); // Log para ver o resultado completo da inserção
        
        if (result.acknowledged) {
            const insertedDocument = await coll.findOne({ _id: result.insertedId });
            console.log('Documento inserido com sucesso:', insertedDocument); // Log para ver o documento inserido
            res.json(insertedDocument);
        } else {
            throw new Error('Falha na inserção');
        }
    } catch (error) {
        console.log('Erro ao inserir o documento:', error); // Log para ver se há algum erro
        res.status(500).json({ errors: [error] });
    }
}


// Rota para atualizar um ciclo de faturamento existente
async function put(req, res, next) {
    console.log('Função put chamada'); // Log para verificar se a função é chamada
    const _id = new ObjectId(req.params.id);
    const data = req.body;
  
    try {
      const options = { returnDocument: 'after' };
      const result = await coll.findOneAndUpdate({ _id }, { $set: data }, options);
      
      if (result.value) {
        res.json(result.value);
      } else {
        throw new Error('Documento não encontrado');
      }
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ errors: ['O nome fornecido já existe. Por favor, escolha um nome diferente.'] });
      } else {
        res.status(500).json({ errors: [error] });
      }
    }
  }

// Rota para excluir um ciclo de faturamento
async function deleteMethod(req, res, next) {
    try {
      const _id = new ObjectId(req.params.id);
      const result = await coll.deleteOne({ _id });
  
      if (result.deletedCount === 1) {
        res.json({ message: 'Documento excluído com sucesso.' });
      } else {
        res.status(404).json({ errors: ['Documento não encontrado ou já excluído.'] });
      }
    } catch (error) {
      res.status(500).json({ errors: [error] });
    }
  }


// Rota para obter a contagem total de ciclos de faturamento
async function count(req, res, next) {
    try {
      const value = await coll.countDocuments();
      res.json({ value });
    } catch (error) {
      res.status(500).json({ errors: [error] });
    }
  }
  

// Rota para obter um resumo de créditos e débitos
async function summary(req, res, next) {
    try {
      const result = await coll.aggregate([
        { $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } } },
        { $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } } },
        { $project: { _id: 0, credit: 1, debt: 1 } }
      ]).toArray();
  
      res.json(result[0] || { credit: 0, debt: 0 });
    } catch (error) {
      res.status(500).json({ errors: [error] });
    }
  }
  

module.exports = { get, post, put, delete: deleteMethod, count, summary };

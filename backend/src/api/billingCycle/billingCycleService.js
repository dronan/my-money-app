require('./billingCycle');

// Rota para obter todos os ciclos de faturamento
function get(req, res, next) {
  coll.find().toArray((error, result) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json(result);
    }
  });
}

// Rota para adicionar um novo ciclo de faturamento
function post(req, res, next) {
  coll.insertOne(req.body, (error, result) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json(result.ops[0]);
    }
  });
}

// Rota para atualizar um ciclo de faturamento existente
function put(req, res, next) {
  const { _id, ...data } = req.body;
  coll.updateOne({ _id }, { $set: data }, { returnDocument: 'after' }, (error, result) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json(result);
    }
  });
}

const ObjectId = require('mongodb').ObjectId;

// Rota para excluir um ciclo de faturamento
function deleteMethod(req, res, next) {
  coll.deleteOne({ _id: ObjectId(req.params.id) }, (error, result) => {
    if (error) {
        res.status(500).json({ errors: [error] });
      } else {
        res.json(result);
      }
  });
}




// Rota para obter a contagem total de ciclos de faturamento
function count(req, res, next) {
  coll.countDocuments((error, value) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json({ value });
    }
  });
}

// Rota para obter um resumo de créditos e débitos
function summary(req, res, next) {
  coll.aggregate([
    { $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } } },
    { $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } } },
    { $project: { _id: 0, credit: 1, debt: 1 } }
  ]).toArray((error, result) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json(result[0] || { credit: 0, debt: 0 });
    }
  });
}

module.exports = { get, post, put, delete: deleteMethod, count, summary };

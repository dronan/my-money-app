const getCollection = require('./billingCycle');
const parseMongoError = require('../errorHandler/error');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

// Local variable to store the collection
let coll;

// Get the collection and store it in the variable above
getCollection().then(collection => {
  coll = collection;
});

// Route to get all billing cycles
async function get(req, res, next) {
  try {
    const matchedRecords = await filterGetByUserEmail(req);
    res.json(matchedRecords);
  } catch (error) {
    res.status(500).json({ errors: [error] });
  }
}

// Rote to insert a billing cycle
async function post(req, res, next) {
  const data = req.body;
  data.userEmail = data.userEmail;

  try {
        const result = await coll.insertOne(data);
        if (result.acknowledged) {
            const insertedDocument = await coll.findOne({ _id: result.insertedId });
            res.json(insertedDocument);
        } else {
            throw new Error('Falha na inserção');
        }
  } catch (error) {
      const parsedError = parseMongoError(error);
      res.status(500).json(parsedError);
  }

}

// Route to update a billing cycle
async function put(req, res, next) {
    const _id = new ObjectId(req.params.id);
    const data = req.body;
    delete data._id;
            
    try {
      const options = { returnDocument: 'after' };
      const result = await coll.findOneAndUpdate({ _id }, { $set: data }, options);
      if (result.value) {
        res.json(result.value);
      } else {
        throw new Error('Document not found');
      }
    } catch (error) {
        res.status(500).json({ errors: [error] });
    }
  }

// Route to delete a billing cycle
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


async function filterGetByUserEmail(req) {
  const email = req.query.userEmail;
  const matchedRecords = await coll.find({ userEmail: email }).toArray();
  return matchedRecords;
}

// Route to the number of billing cycles
async function count(req, res, next) {
  try {
    const matchedRecords = await filterGetByUserEmail(req);
    const value = matchedRecords.length;  // count the array elements
    res.json({ value });
  } catch (error) {
    res.status(500).json({ errors: [error] });
  }
}
  
// Route to the summary of credits and debts
async function summary(req, res, next) {
  try {
    const userEmail = req.query.userEmail;

    // Aggregation for credit
    const creditResult = await coll.aggregate([
      { $match: { userEmail } },
      { $unwind: "$credits" },
      {
        $group: {
          _id: null,
          credit: { $sum: "$credits.value" },
        },
      },
    ]).toArray();

    // Aggregation for debt
    const debtResult = await coll.aggregate([
      { $match: { userEmail } },
      { $unwind: "$debts" },
      {
        $group: {
          _id: null,
          debt: { $sum: "$debts.value" },
        },
      },
    ]).toArray();

    const credit = creditResult[0]?.credit || 0;
    const debt = debtResult[0]?.debt || 0;

    res.json({ credit, debt });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [error] });
  }
}




  

module.exports = { get, post, put, delete: deleteMethod, count, summary };
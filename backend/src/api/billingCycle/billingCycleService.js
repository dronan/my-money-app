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
            
    //bcrypt to encrypt email
    const salt = bcrypt.genSaltSync();
    data.userEmail = bcrypt.hashSync(data.userEmail, salt);

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
      
      const result = await coll.aggregate([
          { $match: { userEmail } },
          { $unwind: '$credits' },
          { $unwind: '$debts' },
          {
              $group: {
                  _id: null,
                  totalCredit: { $sum: '$credits.value' },
                  totalDebt: { $sum: '$debts.value' }
              }
          },
          {
              $project: {
                  _id: 0,
                  credit: '$totalCredit',
                  debt: '$totalDebt'
              }
          }
      ]).toArray();

      res.json(result[0] || { credit: 0, debt: 0 });

  } catch (error) {
      console.log(error); // For debugging
      res.status(500).json({ errors: [error] });
  }
}

  

module.exports = { get, post, put, delete: deleteMethod, count, summary };
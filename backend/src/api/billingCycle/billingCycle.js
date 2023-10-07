const client =  require('../../config/database.js');
let coll;

console.log('Applying BillingCycle schema...')

async function run() {
  try {
    await client.connect();
    const db = client.db();
    
    // Check if collection exists
    const collections = await db.listCollections({ name: 'BillingCycle' }).toArray();

    if (collections.length === 0) {

      const billingCycleSchema = {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'month', 'year', 'credits', 'debts'],
            properties: {
              name: { bsonType: 'string' },
              month: { bsonType: 'int', minimum: 1, maximum: 12 },
              year: { bsonType: 'int', minimum: 1970, maximum: 2100 },
              userEmail: { bsonType: 'string' },
              credits: {
                bsonType: 'array',
                items: {
                  bsonType: 'object',
                  required: ['name', 'value'],
                  properties: {
                    name: { bsonType: 'string' },
                    value: { bsonType: 'number' },
                  },
                },
              },
              debts: {
                bsonType: 'array',
                items: {
                  bsonType: 'object',
                  required: ['name', 'value'],
                  properties: {
                    name: { bsonType: 'string' },
                    value: { bsonType: 'number' },
                    status: { bsonType: 'string', enum: ['PAYED', 'PENDING', 'SCHEDULED'] },
                  },
                },
              },
            },
          },
        },
      };
    
      await db.createCollection('BillingCycle', billingCycleSchema);
    }

    coll = db.collection('BillingCycle');
  
    console.log('BillingCycle Schema applied successfully');
  
    return coll; 
  } 
  catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = run // Exporta a função run
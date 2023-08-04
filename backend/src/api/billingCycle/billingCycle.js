const client =  require('../../config/database.js');

console.log('Applying schema...')

let coll;

async function run() {
  try {
    await client.connect();
    const db = client.db();
    
    // Verifica se a coleção existe
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
            credits: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                required: ['name', 'value'],
                properties: {
                  name: { bsonType: 'string' },
                  value: { bsonType: 'number', minimum: 0 },
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
                  value: { bsonType: 'number', minimum: 0 },
                  status: { bsonType: 'string', enum: ['PAYED', 'PENDING', 'SCHEDULED'] },
                },
              },
            },
          },
        },
      },
    };
  
    await db.createCollection('BillingCycle', billingCycleSchema);
  } else {
    console.log('BillingCycle collection already exists.');
  }


    coll = db.collection('BillingCycle');
    await coll.createIndex({ name: 1 }, { unique: true });
  
    console.log('Schema applied successfully');

    return coll; // Retorna a coleção

  } finally {
    // await client.close();
  }
}

module.exports = run // Exporta a função run
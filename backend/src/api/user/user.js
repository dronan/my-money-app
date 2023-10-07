const client =  require('../../config/database.js');
let coll;

console.log('Applying User schema...')

async function run() {
  try {
    await client.connect();
    const db = client.db();
    
    // Check if collection exists
    const collections = await db.listCollections({ name: 'User' }).toArray();

    if (collections.length === 0) {

      const userSchema = {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'email', 'password'],
            properties: {
              name: { bsonType: 'string' },
              email: { bsonType: 'string' },
              password: { bsonType: 'string', minimum: 6, maximum: 12 },
              },
            },
        },
      };
    
      await db.createCollection('User', userSchema);
    }

    coll = db.collection('User');
  
    console.log('User schema applied successfully');
  
    return coll; 
  } 
  catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = run // Exporta a função run
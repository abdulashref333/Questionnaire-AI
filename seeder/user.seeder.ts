const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
dotenv.config();


async function seedUser() {
  const uri = `${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    // const db = client.db(process.env.MONGODB_DB_NAME); // Use the database you want to connect to
    const usersCollection = client.db().collection('users');

    const user = {
      name: 'Abdelrahman Admin',
      email: 'admin@example.com',
      password: 'admin123', // Replace with your desired password, users shouldn't be in plain text, I did this just for simplicity.
    };

    const result = await usersCollection.insertOne(user);
    console.log(`User inserted with _id: ${result.insertedId}`);
  } catch (err) {
    console.error('Error seeding user:', err);
  } finally {
    await client.close();
    process.exit()
  }
}

seedUser();
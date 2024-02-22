import clientPromise from '@/lib/mongodb';

export async function findOne(email: string) {
  const client = await clientPromise
  const usersCollection = client.db(process.env.MONGODB_DB_NAME).collection('users')
  return await usersCollection.findOne({ email })
}
import clientPromise from '@/lib/mongodb';

export async function findOne(email: string){
  const client = await clientPromise
  const usersCollection = client.db().collection('users')
  return await usersCollection.findOne({ email })
}
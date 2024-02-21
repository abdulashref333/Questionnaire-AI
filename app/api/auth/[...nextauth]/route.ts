import NextAuth, { RequestInternal, User } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from '@/lib/mongodb';

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (
        credentials: Record<"email" | "password", string> | undefined, 
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ): Promise<User | null> => {
        // Add logic here to look up the user from the credentials supplied
        const client = await clientPromise
        const usersCollection = client.db().collection('users')
        const user = await usersCollection.findOne({ email: credentials?.email })

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve({id: user.id, ...user})
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null)
        }
      }
    }),
  ],
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }

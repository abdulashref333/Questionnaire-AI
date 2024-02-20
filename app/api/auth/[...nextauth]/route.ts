import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from '@/lib/mongodb';

const handler = NextAuth({  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials){
        // Add logic here to look up the user from the credentials supplied
        const client = await clientPromise
        const usersCollection = client.db().collection('users')
        const user = await usersCollection.findOne({ username: credentials?.username })

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user)
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null)
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      }
    }),
    // ...add more providers here
  ],
  // ...rest of the NextAuth configuration
});
export { handler as GET, handler as POST }

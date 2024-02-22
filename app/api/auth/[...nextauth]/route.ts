import NextAuth, { RequestInternal, User } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { findOne } from '@/lib/services/user.service';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (
        credentials: Record<"email" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ): Promise<User | null> => {
        if (!credentials?.email) return Promise.resolve(null);

        const user = await findOne(credentials.email)
        if (user && user.password === credentials.password) {
          return Promise.resolve({ id: user.id, ...user })
        } else {
          return Promise.resolve(null)
        }
      }
    }),
  ],
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }

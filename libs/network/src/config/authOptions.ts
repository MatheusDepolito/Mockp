import { getServerSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  AuthProviderType,
  GetAuthProviderDocument,
  LoginDocument,
  RegisterWithProviderDocument,
} from '@mockp/network/src/gql/generated';
import { fetchGraphQL } from '../fetch';
import { sign, verify } from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

const MAX_AGE = 1 * 24 * 60 * 60;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Email and password are required.');
        }

        const { email, password } = credentials;

        try {
          const { data, error } = await fetchGraphQL({
            document: LoginDocument,
            variables: { loginInput: { email, password } },
          });

          if (!data?.login.token || error) {
            throw new Error(
              'Authentication failed: Invalid credentials or user not found.',
            );
          }
          const uid = data.login.user.uid;
          const image = data.login.user.image;
          const name = data.login.user.name;

          return { id: uid, name, image, email };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  debug: true,
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },
  jwt: {
    maxAge: MAX_AGE,
    async encode({ token, secret }): Promise<string> {
      if (!token) {
        throw new Error('Token is undefined.');
      }

      const { sub, ...tokenProps } = token;

      const nowInSeconds = Math.floor(Date.now() / 1000);

      const expirationTimestamp = nowInSeconds + MAX_AGE;

      return sign(
        { uid: sub, ...tokenProps, exp: expirationTimestamp },
        secret,
        {
          algorithm: 'HS256',
        },
      );
    },
    async decode({ token, secret }): Promise<JWT | null> {
      if (!token) {
        throw new Error('Token is undefined.');
      }

      try {
        const decodedToken = verify(token, secret, {
          algorithms: ['HS256'],
        });

        return decodedToken as JWT;
      } catch (error) {
        return null;
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { id, name, image } = user;

        const existingUser = await fetchGraphQL({
          document: GetAuthProviderDocument,
          variables: {
            uid: id,
          },
        });

        if (!existingUser.data?.getAuthProvider?.uid) {
          const newUser = await fetchGraphQL({
            document: RegisterWithProviderDocument,
            variables: {
              registerWithProviderInput: {
                uid: id,
                type: AuthProviderType.Google,
                image,
                name: name || '',
              },
            },
          });
        }
      }
      return true;
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          image: token.picture,
          uid: (token.uid as string) || '',
          email: token.email,
          name: token.name,
        };
      }

      return session;
    },
  },
  pages: {
    signIn: '/signIn',
  },
};

export const getAuth = () => getServerSession(authOptions);

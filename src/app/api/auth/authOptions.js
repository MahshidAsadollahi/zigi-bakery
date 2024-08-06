import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs';
import * as mongoose from "mongoose";
import { User } from "@/app/models/User";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.username;
        const password = credentials?.password;

        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
          return user;
        }

        return null;
      }
    })
  ],
};
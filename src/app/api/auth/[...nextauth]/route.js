import NextAuth from "next-auth";
import userModel from "@/models/users";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    session: {
        strategy: "jwt",  // JWT session strategy
    },
    providers: [
        CredentialsProvider({    // authentication provider for email and password
            name: "Credentials",
            credentials: {
                email: {},
                password: { },
            },
            async authorize(credentials) {   // function to authorize user
                try{
                        await connectToDatabase();
                        const user = await userModel.findOne({ email: credentials?.email });   
                        if (!user) {
                            throw new Error("No user found with the email");
                        }

                        const isValidPassword = await bcrypt.compare( credentials?.password, user.password )
                        if (!isValidPassword) {
                            throw new Error("Invalid password");
                        }
                        return user;
                    } catch (error) {
                            return null
                    }
                }     
        })
    ],
    callbacks: {                      // function to handle JWT token creation and session
      async jwt({ token, user }) {    // function to create JWT token
        if (user) {
          token.id = user.id;
          token.email = user.email;
        }
        return token;
      },
     async session({ session, token }) {  // function to create session
            if (token) {
            session.user = {
                email: token.email,
                name: token.name,
                image: token.picture,
            }
            }
            return session;   
     },
    },
    pages: {     // custom pages for sign in and error
        signIn: "/sign-in",
    },
    
    secret: process.env.NEXTAUTH_SECRET,  // secret for JWT token
})

export { handler as GET, handler as POST };    
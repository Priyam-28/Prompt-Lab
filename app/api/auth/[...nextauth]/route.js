import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    // Setting up sign-in options like Google
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            try {
                await connectToDB();
                const sessionUser = await User.findOne({
                    email: session.user.email
                });

                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
                return session;
            } catch (error) {
                console.error('Error in session callback:', error);
                return session; // Return the session even if there's an error
            }
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
                const userExists = await User.findOne({
                    email: profile.email // Finding already existing user using the email
                });

                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }

                return true;
            } catch (error) {
                console.error('Error in signIn callback:', error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };

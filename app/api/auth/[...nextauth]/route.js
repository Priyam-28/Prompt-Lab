import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";
import User from "@models/user";
const handler=NextAuth({
    //Here we are setting up the signin options like google or github etc and in nav we call them using getProviders
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    
    async session({session}){
        const sessionUser=await User.findOne({
            email:session.user.email
        })

        session.user.id = sessionUser._id.toString();
        return session;

    },
    async signIn({profile}){
        try{
            await connectToDB();
            const Userexists=await User.findOne({
                email:profile.email //finding alredy existing user using the email
            })
            
            if(!Userexists){
                await User.create({
                    email:profile.email,
                    username:profile.name.replace(" ", "").toLowercase(),
                    image:profile.picture
                })
                
            }

            return true;
        }
        catch(error){
            console.log(error.message);
            return false;
        }
        
    }
})

export {handler as GET, handler as POST};
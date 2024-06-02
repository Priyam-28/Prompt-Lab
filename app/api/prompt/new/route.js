import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


export const POST=async(request)=>{
    const {userId,prompt,tag}=await request.json(); 
    //create-prompt ke andar wale page se request ayega
    // usko database mein store karna hai
    try{
        await connectToDB();
        const newPrompt=new Prompt({creator:userId,prompt,tag})
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{status:210})
       
    }
    catch(error){
        return new Response("Failed to create new prompt",{status:500})

    }

}
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"


export const GET=async(request,response)=>{
    try{
        await connectToDB();
        const prompts=await Prompt.find({}).populate('creator'); // retrieving all prompts.and also gets all the info of the creator from the user collection

        return new Response(JSON.stringify(prompts),{status: 200});


    }
    catch(error){
        return new Response("Failed to fetch all prompts",{status: 500})
    }
}
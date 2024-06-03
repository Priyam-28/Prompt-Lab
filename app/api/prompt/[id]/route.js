import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"
//GET(read)

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator'); // retrieving all prompts.and also gets all the info of the creator from the user collection
        if (!prompt) return new Response("Prompt not found", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 });


    }
    catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

//Patch(update)

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200});
    }
    catch (error) {
        return new Response("Failed to update the prompt",{status:500});
    }
}

//Delete(delete)
export const DELETE= async(request,{params})=>{
    try{
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted",{status: 200});

    }
    catch(error){
        return new Response("Failed to Delete",{status:500});
    }
}
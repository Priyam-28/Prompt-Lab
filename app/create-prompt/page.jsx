'use client'

import Form from "@components/Form"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    const createPrompt = async(e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try{
            const response=await fetch('/api/prompt/new',{ //we need to fetch this directly to the similar file structre inside our api prompt then new then then the file so it will fetch from the that api-end point
                method: 'POST',
                body: JSON.stringify({  
                    //body:This is a property of an HTTP request object, indicating the content that will be sent in the body of the request. 
                    prompt:post.prompt,
                    userId:session?.user.id,
                    tag:post.tag
                })
                //this line would be part of the code that sends this form data to the server using the api we create in the api folder
                // usme ek request maar raha ha ki mereko ye post karna hai.
            });
            if(response.ok){
                router.push('/');
            }

        }
        catch(error){
           console.log(error.message); 
        }
        finally{
            setIsSubmitting(false);
        }

    }
    return (
        <div>
            <Form
                type='Create'
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={createPrompt} />
        </div>
    )
}

export default CreatePrompt

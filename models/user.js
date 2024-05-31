import { Schema,model,models } from "mongoose";

const UserSchema=newSchema({
    email:{
        type: 'string',
        unique:[true,'Email alredy exists'],
        required:[true,'Email is required'],
    },
    username:{
        type: 'string',
        unique:[true,'Username alredy exists'],
        required:[true,'Username is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image:{
        type:'string',
    }

});

const User=models.User || model("User",UserSchema); //else routes will be called and connection is to be made again and again
//route will be called and running only when it is called
//The models stores all the registered models and prevents rewrting them 

export default User;


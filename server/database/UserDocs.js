import mongoose from "mongoose";

const UserDocSchema=mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        unique:true
    },
    AllDocs:{
        type:Array,
        default:[]
    }
},{timestamps:true})

export const UserDocs=new mongoose.model("UserDocs",UserDocSchema);
// export default UserDocs
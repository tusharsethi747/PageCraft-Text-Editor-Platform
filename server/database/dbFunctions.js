// import MyDocSchema from "./Schema";/
import Document from "./Schema.js";
import {UserDocs} from "./UserDocs.js";

export const getDocument = async (id) => {
    if (id === null) return;

    const document = await Document.findById(id);

    if(document) return document;

    return await Document.create({ _id: id, data: "" })
}


export const updateDocument = async (id, data) => {
    return await Document.findByIdAndUpdate(id, { data });
}

export const AddDocToUser= async (id,UserID)=>{
    const My_Docs=await UserDocs.findOne({user_id:UserID});
    if(My_Docs){
        if(My_Docs.AllDocs.includes(id)==false){
            My_Docs.AllDocs.push(id);
            await My_Docs.save();
            return My_Docs;
        }
    }
    else{
        return await UserDocs.create({user_id:UserID,AllDocs:[id]});
    }
}



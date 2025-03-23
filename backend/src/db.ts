//create user schemas and modals here

import {model, Model,Schema} from "mongoose";
import mongoose from "mongoose";
import { title } from "process";
mongoose.connect(process.env.DB_CONNECT as string)

  /************************************  DB CONNECTION DONE ***********************************************/

  const UserSchema=new Schema({
    username:{type:String,unique: true},
    password:String

  })

  export const UserModel= model('User',UserSchema)
  

const ContentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    type:String,
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true}
})

export const ContentModel=model('Content',ContentSchema)

const LinkSchema=new Schema({
  hash:String,
  userId:{type:mongoose.Types.ObjectId,ref:'User',required:true,
    unique:true},

})

export const LinkModel=model('Links',LinkSchema)
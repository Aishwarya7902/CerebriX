//create user schemas and modals here

import {model, Model,Schema} from "mongoose";
import mongoose from "mongoose";
mongoose.connect(process.env.DB_CONNECT as string)

  /************************************  DB CONNECTION DONE ***********************************************/

  const UserSchema=new Schema({
    username:{type:String,unique: true},
    password:String

  })

  export const UserModel= model('User',UserSchema)
  
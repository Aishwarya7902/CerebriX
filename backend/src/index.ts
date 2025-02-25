import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import { ContentModel, UserModel } from './db';
import { CustomRequest, userMiddleware } from './middleware';
const app = express();
app.use(express.json())


app.post("/api/v1/signup", async (req, res) => {
    // zod validation ,hash the password

    const username = req.body.username;
    const password = req.body.password;
    try {


        await UserModel.create({
            username: username,
            password: password
        })

        res.json({
            message: "User signed up!"
        })
    } catch (e) {
        res.status(411).json({
            message: "Internal Server Error"
        })
    }

})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const existingUser = await UserModel.findOne({
        username,
        password
    })

    if(existingUser){
        const token=jwt.sign({id: existingUser._id}, process.env.JWT_SECRET as string,{expiresIn:'24h'})
        res.json({token})
    }
    else{
        res.status(403).json({
            message:'Incorrect Credentials'
        })
    }


})

app.post("/api/v1/content",userMiddleware,async (req: CustomRequest, res: Response) => {
    const link=req.body.link
    const type=req.body.type

   await ContentModel.create({
    link,
    type,
    title: req.body.title,
    userId: req.userId,
    tags: []
    })

    res.json({
        message:"Content added"
    })
})

app.get("/api/v1/content",userMiddleware,async (req: CustomRequest, res: Response) => {
     const userId= req.userId;
     const content =await ContentModel.find({
        userId:userId
     }).populate("userId","username")

    res.json({
        content
    })
})

app.delete("/api/v1/content", (req, res) => {

})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

app.listen(3000)
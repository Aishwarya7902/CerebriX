import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import { ContentModel, LinkModel, UserModel } from './db';
import { CustomRequest, userMiddleware } from './middleware';
import { random } from './utils';
import cors from "cors"
const app = express();
app.use(express.json())
app.use(cors());



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

    if (existingUser) {
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' })
        res.json({ token })
    }
    else {
        res.status(403).json({
            message: 'Incorrect Credentials'
        })
    }


})

app.post("/api/v1/content", userMiddleware, async (req: CustomRequest, res: Response) => {
    const link = req.body.link
    const type = req.body.type

    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
})

app.get("/api/v1/content", userMiddleware, async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")

    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        const contentId = req.body.contentId ;
        const content = await ContentModel.findById(contentId).select("userId");;
        if (!content) {
             res.status(404).json({ message: "Content not found" });
             return
        }
        
        // Ensure only the owner can delete
        if (content?.userId && content?.userId.toString() !== req.userId) {
              res.status(403).json({ message: "Unauthorized to delete this content" });
              return;
        }

        // Delete the content
        await ContentModel.findByIdAndDelete(contentId);

         res.json({ message: "Content Deleted" });
         return;
        
    }

    catch (error) {
        console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
          return
    }
})

app.post("/api/v1/brain/share",userMiddleware,async (req: CustomRequest, res: Response) => {
    const share=req.body.share;
    
    if(share){ // if share is true , then generate a sharable link
            
            const existingLink=await LinkModel.findOne({
                userId:req.userId
            })

            // if the link already exists ...don't regenerate it..just return to the user
            if(existingLink){
                res.json({
                    hash:existingLink.hash
                })

                return
            }


            const hash=random(10)
            await LinkModel.create({
                userId:req.userId,
                hash:hash
             })
    
             res.json({
                hash
            })
        
        
    }
// if share is false , hide the content from the world
    else{
       await LinkModel.deleteOne({
            userId:req.userId
        })
        res.json({
            message:"Removed Link"
        })
    }

    
    
    
})

app.get("/api/v1/brain/:shareLink",async (req: CustomRequest, res: Response) => {
    const hash =req.params.shareLink

    const link= await LinkModel.findOne({
        hash
     })

    if(!link){
        res.status(411).json({
            message:"Sorry Incorrect inputs"
        })
    }

    const content=await ContentModel.find({
        userId:link?.userId
    })

    const user=await UserModel.findOne({
        _id:link?.userId
    })

    if(!user){
        res.status(411).json({
            message:"user does not exist ,Something went wrong"
        })
    }

    res.json({
        username:user?.username,
        content:content
    })


})

app.listen(3000)
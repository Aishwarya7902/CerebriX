import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import { ContentModel, LinkModel, UserModel } from './db';
import { CustomRequest, userMiddleware } from './middleware';
import { random } from './utils';
import cors from "cors"
import { z } from 'zod'
import bcrypt from 'bcrypt'
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(express.json())

app.use(cors());
app.use(
    helmet({
        crossOriginResourcePolicy: false, // Allows images, fonts, etc.
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'", "data:", "blob:"], // Allow self and base64/blob
                scriptSrc: ["'self'", "'unsafe-inline'", "https:"], // Allow scripts from same origin
            },
        },
    })
);

//rate limit logic
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);


// making signup Schema
const signupSchema = z.object({
    username: z.string().min(3, "username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

//making signin Schema
const signinSchema = z.object({
    username: z.string().min(3, "username must be at least 3 characters long"),
    password: z.string().min(6, "password must be at least 6 characters long")
})


app.post("/api/v1/signup", async (req, res) => {

    //using zod for validation
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
        const messages = result.error.errors.map(err => err.message).join(", ");
        res.status(400).json({ message: messages })
        return;
    }

    const { username, password } = result.data;

    //checking if user already exists in database

    const existingUser = await UserModel.findOne({ username })
    if (existingUser) {
        res.status(409).json({ message: "User already exists" })
        return;
    }

    //hash the password before storing it

    const hashedPassword = await bcrypt.hash(password, 10);


    //creating a new user
    const newUser = await UserModel.create({
        username,
        password: hashedPassword
    })

    //generating token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

    const userResponse = {
        _id: newUser._id,
        username: newUser.username
    };
    res.status(201).json({
        user: userResponse,
        token
    });

})

app.post("/api/v1/signin", async (req, res) => {
    const result = signinSchema.safeParse(req.body)
    if (!result.success) {
        const messages = result.error.errors.map(err => err.message).join(", ");
        res.status(400).json({ message: messages })
        return;
    }
    const { username, password } = result.data

    const existingUser = await UserModel.findOne({
        username
    })
    if (!existingUser) {
        res.status(403).json({ message: "Incorrect Credentials" });
        return
    }
    if (!existingUser.password) {
        // Password is missing in the database
        res.status(403).json({ message: "Incorrect Credentials" });
        return
    }
    // comparing password
    const validPassword = await bcrypt.compare(password, existingUser.password as string)

    if (!validPassword) {
        res.status(403).json({ message: "Incorrect Credentials" })
        return;
    }

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
        const contentId = req.body.contentId;
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

app.post("/api/v1/brain/share", userMiddleware, async (req: CustomRequest, res: Response) => {
    const share = req.body.share;

    if (share) { // if share is true , then generate a sharable link

        const existingLink = await LinkModel.findOne({
            userId: req.userId
        })

        // if the link already exists ...don't regenerate it..just return to the user
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })

            return
        }


        const hash = random(10)
        await LinkModel.create({
            userId: req.userId,
            hash: hash
        })

        res.json({
            hash
        })


    }
    // if share is false , hide the content from the world
    else {
        await LinkModel.deleteOne({
            userId: req.userId
        })
        res.json({
            message: "Removed Link"
        })
    }




})

app.get("/api/v1/brain/:shareLink", async (req: CustomRequest, res: Response) => {
    try {
        const hash = req.params.shareLink
        // Look up the shared link
        const link = await LinkModel.findOne({
            hash
        })

        if (!link) {
            res.status(404).json({
                message: "Invalid share link."
            })
            return;
        }
        // Retrieve the content associated with the userId from the link
        const content = await ContentModel.find({
            userId: link?.userId
        })
        // Retrieve the user associated with the link
        const user = await UserModel.findOne({
            _id: link?.userId
        })

        if (!user) {
            res.status(404).json({
                message: "user does not exist ,Something went wrong"
            })
            return;
        }
        // Return the user info and content
        res.json({
            username: user?.username,
            content: content
        })
        return;

    }
    catch (error) {
        console.error("Error fetching shared content:", error);
        res.status(500).json({ message: "Internal server error." });
        return
    }

})

app.listen(3000)
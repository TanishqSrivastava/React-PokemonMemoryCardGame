import express from "express";
import collection from "./mongo.js";
import cors from "cors";
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.post("/highScore",async(req,res)=>{
    const {email, score} = req.body;
    try{
        const user = await collection.findOne({email});
        if (!user) return res.status(404).json("user not found");
        if (score > user.highScore){
            user.highScore = score;
            await user.save();

        }
        return res.json({highScore: user.highScore});

    }catch(e){
        return res.status(500).json("fail");
    }


})


app.get("/highScore", async(req, res)=>{
    const {email} = req.query;
    try{
        const user = await collection.findOne({email});
        if (!user) return res.status(404).json("email not found");
        return res.json({highScore:user.highScore});

    }catch(e){
        return res.status(500).json("fail");
    }
})


app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.listen(8000,()=>{
    console.log("port connected");
})

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected");
})
.catch((e)=>{
    console.log(e);
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    highScore: {
        type: Number,
        required:true,
        default:0
    },
    username: {
        type: String,
        required: true
    }
})

const collection = mongoose.model("collection",newSchema)

export default collection;
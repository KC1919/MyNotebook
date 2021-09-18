const mongoose=require("mongoose");

const dbURL="mongodb://localhost:27017/FoodDb";

const connectToMongoDb=async ()=>{
    await mongoose.connect(dbURL,()=>{
        console.log("Connected to mongoDB");
    });
    console.log("inside function");
    
}

module.exports=connectToMongoDb;
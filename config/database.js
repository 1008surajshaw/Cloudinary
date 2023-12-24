const mongoose =require("mongoose");
require("dotenv").config();

exports.connect =() =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology :true,
    })
    .then(console.log("DB connection is succesfull"))
    .catch ( (error) =>{
        console.log("DB connection Issues");
        console.log(error);
        process.exit(1);
    })
}
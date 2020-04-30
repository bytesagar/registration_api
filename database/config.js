const mongoose = require("mongoose");

const databaseConnection = async () =>{
    try{
        const connect = await mongoose.connect(process.env.DB_CONFIG,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if(connect) console.log("Connected to DB successflully")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = databaseConnection;



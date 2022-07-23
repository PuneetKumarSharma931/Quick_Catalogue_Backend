const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(()=>{

    console.log("MongoDB Successfully Connected!");

}).catch(()=>{

    console.log("Some Error Occured!");
});
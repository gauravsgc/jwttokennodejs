// Connect to the MongoDB
const mongoose = require('mongoose');

//mongo 7 warnning
// Option strict is used before Schema and global level strictQuery
mongoose.set("debug", true);
mongoose.set("strictQuery", false);
uri=process.env.cn;
// console.log(uri);
mongoose.connect(
  uri,
    { useNewUrlParser: true, useUnifiedTopology: true ,
    
    },    
    //proper connect dont show any depricacy..
)//this method returns promise so handle it..

 
 .then(() => console.log("connected with database")).

     catch((e) =>
         console.log(e));

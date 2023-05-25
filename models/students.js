const mongoose = require('mongoose');

let StudentSchema = new mongoose.Schema({

 
username:{
    type:String,
    required:[true,'name is required'],
    unique:true
},
userpass:{
    type:String,
    required:true,
    minlength:[5,'Too short'],
    maxlength:7
},
//array of an object...
tokens:{
    
            type:String,
            required:true
        
    }



}, { collection: 'example' });
//we will create collection schema create



module.exports = mongoose.model("example", StudentSchema);

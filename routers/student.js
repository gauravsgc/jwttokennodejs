const express = require('express');
const {createTokens, validateToken } = require('../JWT');
// console.log(createTokens);
// console.log(validateToken)
const router = new express.Router();
const app = express();
const STUDENT = require("../models/students");
//


//
//data insert into database:----
router.post("/myapp", async (req, res) => {
try {
    // console.log("post hit");
    // console.log(req.body);
        const user = new STUDENT(req.body);
        
          const createuser=await user.save()
          res.status(201).send(user);
    }
    catch (e) {
        
        res.status(400).send(e)
    }

})

//pagination:---
// ..........
//the rule of api is the root has to be same..

//..
// router.get('/Myapp',async (req, res) => {
    
//     try {
//         console.log("gud morning");
//        let page=Number(req.query.page)||1;
//        console.log(page);
//        let limit=Number(req.query.limit)||2;
//        console.log(limit);
       //formula;
    //    let skip=(page-1)*limit;
    //    const total=await STUDENT.countDocuments();
    //     const Data = await STUDENT.find().skip(skip).limit(limit);
        //res.send(Data);
//         res.status(200).json({
//             Data,
//             limit,
//             page,
//             total
//         });
//     }
//     catch (e) {
//         res.status(500).send(e);
        
//     }
// })

//.........
// ..........
//the rule of api is the root has to be same..
router.get('/Myapp', async (req, res) => {
    //app.get('/students/:id', async (req, res) => {
    try {
        console.log("gud morning");
        //const id=req.params.id;
        // const Data = await STUDENT.findById({_id:id}//{_id}//{key:value});
        const Data = await STUDENT.find();
        res.send(Data);
        //res.send("good morning");
        res.status(200);
    }
    catch (e) {
        res.status(500).send(e);
    }
})

//fetching only one data from the 
//api on the basis of name...
router.get('/Myapp/:nm', async (req, res) => {
    try {
        const name = req.params.nm;

        
        // const Data = await STUDENT.find({ name: name });//{key:value});
        const Data = await STUDENT.find(
            { username: name });//{key:value});
            if(Data){

                res.status(200).send(Data);
        }
        else{
        
        res.status(400).json({
               err:'user Does not exist'
           })
        
        }
    }
     catch (e) {
         res.status(500).send(e);
     }
})



//...............

//delete data....on the basis of name
router.delete('/Myapp/:nm', async (req, res) => {
    try {
        const name = req.params.nm;
        // console.log(name);

        

        const Data = await STUDENT.deleteOne({ username: name });
        
        //{key:value});
        
        res.status(200).send(Data);
        

    }
    catch (e) {
        res.status(500).send(e);
    }
})


//update data.....
// update pasword on the basis of name
//patch
router.patch('/Myapp/:name/:pwd', async (req, res) => {
    try {
        const name = req.params.name;
        const pwd = req.params.pwd;
        console.log(name);
        console.log(pwd);

      
        //updated data
        const Data = await STUDENT.updateOne({ username: name }, { $set: { userpass: pwd } });
        
   
        res.status(200).send(Data);
        //}

    }
    catch (e) {
        res.status(500).send(e);
    }
})

router.post('/login',async(req,res)=>{
   
   const {username,userpass}=req.body;
   console.log(req.body);
   const user=await STUDENT.findOne({'username':username,'userpass':userpass});
   if(!user)
   res.status(401).json({
       err:'user Does not exist'
   })
   if(user){
       const accessToken=createTokens(user);//jwt
       console.log(accessToken);
       await STUDENT.updateOne({_id: user._id}, {$set:{tokens:accessToken}});


       res.cookie("access-Token",accessToken,
      {maxAge:5000*10,
       // expires works the same as the maxAge
    //    expires: new Date('13 12 2023'),
    secure:true,
        httpOnly:true,
      }
        // {maxAge: 60*60*24+Date.now()}
    );  
    

    //    res.json({
    //             accessToken
    //              })
        res.status(200).json(
            {
            username:username,
            accessToken

            }
            );       
     // res.json('Logged in')
   }
})

router.get('/profile',validateToken,(req,res)=>{
    // console.log(username);
res.json({
    _id:req.userId,
    msg:"profilepage"
})


});

//logout.....
// router.Post('/logout',validateToken,(req,res)=>{
    
//     res.json({msg:"profilepage"})
    
//     });
//........

module.exports = router;
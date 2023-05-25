//create token and verify tiken:-
let jwtSecretKey = process.env.JWT_SECRET_KEY;
const { sign, verify } = require('jsonwebtoken');
const STUDENT = require("./models/students");
const createTokens = (user) => {
    console.log(user);
    const accessToken =
        sign(
            {
                _id: user._id

            },
            jwtSecretKey,

            { expiresIn: '120s' }

            // ,
            // (err, token) => {
            //     console.log(token);
            //      res.json({
            //          token
            //      })
            //     return token;
            // }

        );

    //  console.log(accessToken);
    return accessToken;


};
////.......verifyToken.........
const validateToken = async(req, res, next) => {
console.log(req)
    console.log("good morning");
    //with cookie
     const accessToken = req.cookies["access-Token"];

    const authHeader = req.headers.authorization;
    //const accessToken = authHeader.split(" ")[1];
    try {

        if (accessToken) {

            console.log(accessToken);
            const validToken = verify(accessToken, jwtSecretKey);
            //in validToken u get info of the login user...
            console.log(validToken._id);

            if (validToken) {
DToken=await STUDENT.findOne({_id:validToken._id,'tokens':accessToken});
if(DToken){
                req.authenticated = true
                req.userId=validToken._id
                return next();
}
else{
    res.status(401).json({
        err:'unauthorized user'
    }) 
}
            }
            else {
                res.status(403).json("Token is not valid");
            }

        }

        else {
            res.status(401).json({
                error: 'user not authenticated!'
            });
        }
    }
    catch (error) {

        res.status(401).json({
            error: 'user not authenticated!'
        });

    }



};
module.exports = {
    createTokens, validateToken
};










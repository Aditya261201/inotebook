const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator'); //express validator
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');



const JWT_SECRET = '$aadiisagoodboy$'    // its a secret key by which we can authenticate the access of a user.this key is a part of authentication token.




//            ROUTE-1                  ------------------------**************************-------------------------
// Create a user using : POST "/api/auth/createuser". Doesn't require auth.(No login required)
router.post('/createuser', [
    // array holding all the validations.
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','password must be at least 5 characters.').isLength({min:5}),
],async (req, res)=>{  
    let success = false;
    // if there are errors then rerturn bad request and the errors  (snippet taken from express-validator docs.)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with the same email exists already.(and all that in try-catch block if any error occur)
    try{

        let user = await User.findOne({ email: req.body.email})   // chacking if the user with same email exists already
        if(user){// if the user with the same email exists already then showing error
            return res.status(400).json({success, error: "Sorry, user with this email already exists"})
        }


        const salt =await bcrypt.genSalt(10);                      // salt is generated to be added in password.(await bcos we cant proceed without salt)
        const secPass =await bcrypt.hash(req.body.password,salt);   // salt is added in the hashed password.(await bcos hashed(or maybe salted also) password is compulsory to proceed.)
        user = await User.create({                           // create a new user (await- waits until user is created)
            name: req.body.name,
            email: req.body.email,
            password: secPass                           // now secured password will be saved as a salted hash in db.
        })
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)        // here we will sign the data with our secret key to make authtoken 
        success = true;
        res.json({success, authToken})              // sends the authentication token in the response.

    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error !! ")
    }

    
})








//           ROUTE-2                   ------------------------**************************-------------------------
// Authenticate a user using : POST "/api/auth/login" 
router.post('/login', [
    body('email','enter a valid email').isEmail(),
    body('password','password must be at least 5 characters.').exists(),
],async (req, res)=>{ 
    let success = false;
    // if there are errors then rerturn bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    const{email, password} = req.body;
    try {
        let user =await User.findOne({email});
        if(!user){
            return res.status(500).json({error : "Please try to login with correct credentials"});
        }

        const passwordCompare =await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            return res.status(500).json({success, error : "Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)        // here we will sign the data with our secret key to make authtoken 
        success = true;
        res.json({success, authToken})

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error !! ");
    }
})










//           ROUTE-3                   ------------------------**************************-------------------------
// Getting loggedin  Userdetails  using : POST "/api/auth/getuser" 

// here we have used fetchuser function(that's a middleware) before async func , it will fetch the userid the authtoken given by the user.
// we can also have written fetchuser code here but, then we have to copy that in everyendpoint where we have to authenticate the user.so we made that as a midddleware.
router.post('/getuser',fetchuser,async (req, res)=>{ 
    try{
        userId = req.user.id;                    // userId is the id of the user fetched from the authtoken
        const user = await User.findById(userId).select("-password")          // select all the details of that user except the password.
        res.send(user)                                          // sends the useer details in response(except password as selected above.)
    }catch(error){   // if any error occurs.
        console.error(error.message);
        res.status(500).send("Internal Server Error !! ");
    }
})

module.exports = router
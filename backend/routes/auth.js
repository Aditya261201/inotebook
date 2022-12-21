const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator'); //express validator
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



const JWT_SECRET = '$aadiisagoodboy$'    // its a secret key by which we can authenticate the access of a user.this key is a part of authentication token.




//                              ------------------------**************************-------------------------
// Create a user using : POST "/api/auth/createuser". Doesn't require auth.(No login required)
router.post('/createuser', [
    // array holding all the validations.
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','password must be at least 5 characters.').isLength({min:5}),
],async (req, res)=>{  
    
    // if there are errors then rerturn bad request and the errors  (snippet taken from express-validator docs.)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with the same email exists already.(and all that in try-catch block if any error occur)
    try{

        let user = await User.findOne({ email: req.body.email})   // chacking if the user with same email exists already
        if(user){// if the user with the same email exists already then showing error
            return res.status(400).json({error: "Sorry, user with this email already exists"})
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
        res.json({authToken})              // sends the authentication token in the response.

    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error !! ")
    }

    
})








//                              ------------------------**************************-------------------------
// Authenticate a user using : POST "/api/auth/login" 
router.post('/login', [
    body('email','enter a valid email').isEmail(),
    body('password','password must be at least 5 characters.').exists(),
],async (req, res)=>{ 
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
            return res.status(500).json({error : "Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)        // here we will sign the data with our secret key to make authtoken 
        res.json({authToken})

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error !! ");
    }
})


module.exports = router
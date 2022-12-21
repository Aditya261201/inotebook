const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator'); //express validator




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
        // If doesn't exist then creates a new user.
        user = await User.create({ // create a new user (await- waits until user is created)
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({user})              // sends the user json in response
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Some error occured")
    }

    
})


module.exports = router
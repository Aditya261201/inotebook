const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator'); //express validator




// Create a user using : POST "/api/auth/". Doesn't require auth.
router.post('/', [
    // array holding all the validations.
    body('name','enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password','password must be at least 5 characters.').isLength({min:5}),
],(req, res)=>{
    // snippet taken from express-validator docs.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({ // create a new user
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))   // if everythinng is ok then shows the user json in response
    .catch(err => {console.log(err)   // if problem occurs then shows the error json in console.
    res.json({error: 'Please enter a unique email address',message: err.message})});  // if problem occurs then shows the error json in response.
})


module.exports = router
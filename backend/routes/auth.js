const express = require('express');
const User = require('../models/User')
const router = express.Router();

// Create a user using : POST "/api/auth/". Doesn't require auth.
router.post('/', (req, res)=>{
    console.log(req.body)
    const user = User(req.body)   // create a new user that we will give by thunderclient in json form (we will give name,email,password...date is added automatically )
    user.save()          // save the user in db
    res.send("done")   // send a response
})


module.exports = router
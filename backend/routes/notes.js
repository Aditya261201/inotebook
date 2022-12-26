const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');




//           ROUTE-1                   ------------------------**************************-------------------------
// Get all the notes using : GET "/api/auth/login" 
router.get('/fetchallnotes',fetchuser, async (req, res)=>{
    try{
        const notes = await Notes.find({user: req.user.id})
    res.json(notes);
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error !! ")
    }
})


//           ROUTE-2                   ------------------------**************************-------------------------
// Add a new note using : POST "/api/auth/login" 
router.post('/addnote',fetchuser,[
    // validation for notes;
    body('title','enter a valid title').isLength({min:3}),
    body('description','description must be at least 5 characters.').isLength({min:5}),
], async (req, res)=>{
    try{
        const {title,description,tag} = req.body; // destructuring notes.
    // if there are errors then rerturn bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // making a note and then saving it.
    const note = new Notes({
        title,description,tag,user:req.user.id
    })
    const savedNote = await note.save();

    res.json(savedNote);

    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error !! ")
    }

})


module.exports = router
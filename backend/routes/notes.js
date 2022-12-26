const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');




//           ROUTE-1                   ------------------------**************************-------------------------
// Get all the notes using : GET "/api/notes/fetchallnotes" 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error !! ")
    }
})


//           ROUTE-2                   ------------------------**************************-------------------------
// Add a new note using : POST "/api/notes/addnote" 
router.post('/addnote', fetchuser, [
    // validation for notes;
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be at least 5 characters.').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body; // destructuring notes.
        // if there are errors then rerturn bad request and the errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // making a note and then saving it.
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error !! ")
    }
})





//           ROUTE-3                   ------------------------**************************-------------------------
// Update an existing note using : PUT "/api/notes/updatenote" 
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body; // destructuring notes

    try {
        // making a note and then saving it.
        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it.

        // find the note to be updated by id. if not found then showing error.
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        // checking is it the same user who wanted to update and whose note is this.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // updating the note.
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error !! ")
    }

})




//           ROUTE-4                   ------------------------**************************-------------------------
// Delete an existing note using : DELETE "/api/notes/deletenote" 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body; // destructuring notes

    try {

        // find the note to be deleted by id. if not found then showing error.
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        // checking is it the same user who wanted to delete and whose note is this.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // deleting the note.
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success": "note has been deleted", note: note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error !! ")
    }

})


module.exports = router
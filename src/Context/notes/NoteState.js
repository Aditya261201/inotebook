import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    // for now here we are using hardcore notes..and passing them in notecontext
    const notesInitial = [
        {
            "_id": "63a99e066bede538eabf68b8",
            "user": "63a31bcefc425c11129540ec",
            "title": "my title",
            "description": "early to bed,early to rise",
            "tag": "personal",
            "date": "2022-12-26T13:13:42.182Z",
            "__v": 0
        },
        {
            "_id": "63a99e066bede538eabf68ba",
            "user": "63a31bcefc425c11129540ec",
            "title": "my title",
            "description": "early to bed,early to rise",
            "tag": "personal",
            "date": "2022-12-26T13:13:42.413Z",
            "__v": 0
        },
        {
            "_id": "63a9a7f37cff752d680f789a",
            "user": "63a31bcefc425c11129540ec",
            "title": "youtube",
            "description": "watch youtube videos",
            "tag": "personal",
            "date": "2022-12-26T13:56:03.833Z",
            "__v": 0
        },
        {
            "_id": "63a9c6383f691785d742bc70",
            "user": "63a31bcefc425c11129540ec",
            "title": "youtube 1",
            "description": "watch youtube videos 1",
            "tag": "personal",
            "date": "2022-12-26T16:05:12.978Z",
            "__v": 0
        },
        {
            "_id": "63a9c6433f691785d742bc72",
            "user": "63a31bcefc425c11129540ec",
            "title": "youtube 1",
            "description": "watch youtube videos 1",
            "tag": "personal",
            "date": "2022-12-26T16:05:23.283Z",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)


    // ADD A NOTE
    const addNote =(title, description, tag)=>{
        // todo api call- to also do the changes in the database.
        console.log("adding a new note..")
        const note = {
            "_id": "63a9c6433f691785d742bc72",
            "user": "63a31bcefc425c11129540ec",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-12-26T16:05:23.283Z",
            "__v": 0
        };
        setNotes(notes.concat(note))
    }

    // DELETE A NOTE
    const deleteNote = (id) => {
        // todo api call- to also do the changes in the database.
        console.log("deleting the note with id "+ id)
        const newNotes = notes.filter((note) => { return note._id !== id })     // if (note._id!==id) then it will remain in notes. otherwise not..
        setNotes(newNotes)
    }

    // EDIT A NOTE
    const editNote = () => {

    }



    return (
        // passing notes and setNotes function in the context
        <noteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}



export default NoteState;
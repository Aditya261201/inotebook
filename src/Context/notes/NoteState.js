import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    // for now here we are using hardcore notes..and passing them in notecontext
    const notesInitial = [] // initially empty array of notes.
    const [notes, setNotes] = useState(notesInitial)

    // Get all notes.
    const getNotes = async () => {
        // api call to fetch notes
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMzFiY2VmYzQyNWMxMTEyOTU0MGVjIn0sImlhdCI6MTY3MTYzMzg3MH0.dWeSTbmsOZMv8OyWcW9pc1IxEjl76iLxZZaxmuShnjE"
            }
        });
        const json = await response.json();
        console.log(json)
        setNotes(json)   // set the notes
    }


    // ADD A NOTE
    const addNote = async(title, description, tag)=>{
        // todo api call- to also do the changes in the database.
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMzFiY2VmYzQyNWMxMTEyOTU0MGVjIn0sImlhdCI6MTY3MTYzMzg3MH0.dWeSTbmsOZMv8OyWcW9pc1IxEjl76iLxZZaxmuShnjE"
            },
            body: JSON.stringify({title, description, tag})
        });

        //logic to add a note in client
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
    const deleteNote =async (id) => {
        // todo api call- to also do the changes in the database.
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMzFiY2VmYzQyNWMxMTEyOTU0MGVjIn0sImlhdCI6MTY3MTYzMzg3MH0.dWeSTbmsOZMv8OyWcW9pc1IxEjl76iLxZZaxmuShnjE"
            }
        });
        const json = response.json();
        console.log(json);

        // logic to delete a note in client 
        console.log("deleting the note with id "+ id)
        const newNotes = notes.filter((note) => { return note._id !== id })     // if (note._id!==id) then it will remain in notes. otherwise not..
        setNotes(newNotes)
    }

    // EDIT A NOTE
    const editNote = async(id, title, description,tag) => {
        // todo api call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMzFiY2VmYzQyNWMxMTEyOTU0MGVjIn0sImlhdCI6MTY3MTYzMzg3MH0.dWeSTbmsOZMv8OyWcW9pc1IxEjl76iLxZZaxmuShnjE"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        // logic to edit in client.
        for(let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id === id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }



    return (
        // passing notes and setNotes function in the context
        <noteContext.Provider value={{notes,getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}



export default NoteState;
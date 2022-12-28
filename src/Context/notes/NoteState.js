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

    return (
        // passing notes and setNotes function in the context
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}



export default NoteState;
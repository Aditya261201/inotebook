import React,{ useState } from "react";
import noteContext from "./noteContext"; 




const NoteState = (props)=>{

    const s1 = {
        "name": "aadi",
        "class": "12"
    }
    // usestate for state s1 and setstate() to update the state.
    const [state, setstate] = useState(s1);

    // update function to update the state in 1 sec with setTimeout func.
    const update =()=>{
        setTimeout(() => {
            setstate({
                "name":"aadi bhai",
                "class":"12c"
            })
        }, 1000);
    } 

    return(
        // wrap in this syntax-- and all the childerns will be wrapped in this.   and also we wrap our app in <notestate> tags i.e. the components inside notestate and their childerns can have the access to the context(states,functions..)
        // anything we want to provide we can pass it as value. ie, value={state,update} is passed means state and update can be used anywhere.if we use usecontext.
        <noteContext.Provider value={{state:state,update:update}}>
            {props.children}
        </noteContext.Provider>
    )
}



export default NoteState;
import {useState} from 'react';


function ColorButton() {

    let [state, changeState] = useState("btn-primary"); // ['btn-primary', function(){...}]

    function clickHandler() {

        if(state === "btn-primary") {
            changeState("btn-danger")
        } 
        else if(state === "btn-danger") {
            changeState("btn-primary");
        }
    }

    return (
        <button onClick={clickHandler} className={`btn ${state}`}>Click</button>
    )

}

export default ColorButton;
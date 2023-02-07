import {useState} from 'react';


function CounterButton() {

    let [state, changeState] = useState(0);

    function clickHandler() {
        // Write the solution to make the state
        // go up in increments of 1

        // Note:
        // DO NOT USE += or ++ or =

        changeState(state + 1);
    }

    return (
        <button onClick={clickHandler} className={`btn btn-primary`}>{state}</button>
    )

}

export default CounterButton;
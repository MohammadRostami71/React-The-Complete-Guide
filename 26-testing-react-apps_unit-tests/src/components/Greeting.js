import {useState} from "react";
import Output from "./Output";

const Greeting = () => {
    const [changeText, setChangeText] = useState(false);
    const changeTextHandler = () => {
        setChangeText(true);
    }
    return (
        <div>
            <h2>hello</h2>
            {!changeText && <Output>best react course</Output>}
            {changeText && <Output>changed!</Output>}
            <button onClick={changeTextHandler}>Change Text</button>
        </div>
    );
}

export default Greeting;
import {useCallback, useState} from "react";
import Button from "./components/UI/Button/Button";
import DemoOutput from "./components/Demo/DemoOutput";

function App() {
    const [showParagraph, setShowParagraph] = useState(false);
    const [allowToggle, setAllowToggle] = useState(false);
    console.log('running ...');
    const toggleParagraphHandler = useCallback(() => {
        if (allowToggle) {
            setShowParagraph(prevShowParagraph => !prevShowParagraph);
        }
    }, [allowToggle]);
    const allowToggleHandler = () => {
        setAllowToggle(true);
    };
    return (
        <div className="App">
            <h1>Hi There!</h1>
            {/*{showParagraph && <p>ths is New</p>}*/}
            <DemoOutput show={showParagraph}/>
            <Button onClick={allowToggleHandler}>Allow Toggle</Button>
            <Button onClick={toggleParagraphHandler}>show Paragraph!</Button>
        </div>
    );
}

export default App;

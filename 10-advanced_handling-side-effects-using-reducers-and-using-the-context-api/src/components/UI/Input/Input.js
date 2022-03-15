import classes from "./Input.module.css";
import React, {useEffect, useImperativeHandle, useRef} from "react";

const Input = React.forwardRef((props, ref) => {
    const InputRef = useRef();
    // useEffect(() => {
    //     InputRef.current.focus();
    // }, []);
    const activate = () => {
        InputRef.current.focus();
    };
    useImperativeHandle(ref, () => {
        return {
            focus: activate
        }
    });
    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={InputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
});

export default Input;
import {useContext, useEffect, useReducer, useRef, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.val, isValid: action.val.includes('@')}
    }
    if (action.type === 'INPUT_BLUR') {
        return {value: state.value, isValid: state.value.includes('@')}
    }
    return {value: null, isValid: false}
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.val, isValid: action.val.trim().length > 6}
    }
    if (action.type === 'INPUT_BLUR') {
        return {value: state.value, isValid: state.value.trim().length > 6}
    }
    return {value: null, isValid: false}
};

const Login = (props) => {
    const authCtx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false});
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: false});

    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = [passwordState];

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                emailState.isValid && passwordState.isValid
            );
        }, 5);
        return () => {
            clearTimeout(identifier);
        }
    }, [emailState.isValid, passwordState.isValid]);

    const emailChangeHandler = (event) => {
        // setEnteredEmail(event.target.value);
        dispatchEmail({type: 'USER_INPUT', val: event.target.value});
        // setFormIsValid(passwordState.isValid && event.target.value.includes('@'))
    };

    const passwordChangeHandler = (event) => {
        // setEnteredPassword(event.target.value);
        dispatchPassword({type: 'USER_INPUT', val: event.target.value})
        // setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid)
    };

    const validateEmailHandler = () => {
        // setEmailIsValid(emailState.isValid);
        dispatchEmail({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
        // setPasswordIsValid(enteredPassword.trim().length > 6);
        dispatchPassword({type: 'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input type='email' ref={emailInputRef} label='E-Mail' id='email' value={emailState.value}
                       isValid={emailIsValid}
                       onChange={emailChangeHandler}
                       onBlur={validateEmailHandler}/>
                <Input type='password' ref={passwordInputRef} label='Password' id='password' value={passwordState.value}
                       isValid={passwordIsValid}
                       onChange={passwordChangeHandler}
                       onBlur={validatePasswordHandler}/>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;

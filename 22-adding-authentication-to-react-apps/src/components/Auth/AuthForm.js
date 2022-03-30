import {useHistory} from "react-router-dom";

import {useContext, useRef, useState} from 'react';
import classes from './AuthForm.module.css';
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const authContext = useContext(AuthContext);
    const history = useHistory();
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        let url = '';
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8f1XF7wFY9_uE0OXqQbPZslAOkOiesC4';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8f1XF7wFY9_uE0OXqQbPZslAOkOiesC4';
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setIsLoading(false);
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(data => {
                    let errorMessage = 'Authentication Failed';
                    // if (data && data.error && data.error.message) {
                    //     errorMessage = data.error.message;
                    // }
                    throw new Error(errorMessage);
                })
            }
        }).then((data) => {
            const experationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
            authContext.login(data.idToken,experationTime.toISOString());
            history.replace('/');
        }).catch(error => {
            alert(error.message)
        });
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' ref={emailInputRef} id='email' required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' ref={passwordInputRef} id='password' required/>
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>sending request,loading ...</p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;

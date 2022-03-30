import classes from './ProfileForm.module.css';
import {useContext, useRef} from "react";
import AuthContext from "../../store/auth-context";
import {useHistory} from "react-router-dom";

const ProfileForm = () => {
    const authContext = useContext(AuthContext);
    const passwordInputRef = useRef();
    const history = useHistory();
    const changePasswordHandler = (event) => {
        event.preventDefault();
        const enteredPassword = passwordInputRef.current.value;
        let url = '';
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB8f1XF7wFY9_uE0OXqQbPZslAOkOiesC4'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                idToken: authContext.token,
                password: enteredPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            history.replace('/');
        }).catch(error => {
            alert(error.message)
        });
    };
    return (
        <form onSubmit={changePasswordHandler} className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' minLength='7' ref={passwordInputRef} id='new-password'/>
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;

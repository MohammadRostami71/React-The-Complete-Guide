import useInput from "../hooks/use-input";

const isNotEmpty = value => value.trim() !== '';
const isEmail = value => value.includes('@');
const BasicForm = () => {
    const {
        value: firstNameValue,
        isValid: firstNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstName
    } = useInput(isNotEmpty);
    const {
        value: lastNameValue,
        isValid: lastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastName
    } = useInput(isNotEmpty);
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmail
    } = useInput(isEmail);
    const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
    const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
    const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';
    let formIsValid = false;

    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        formIsValid = true;
    }
    const submitHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        resetFirstName();
        resetLastName();
        resetEmail();
    };
    return (
        <form onSubmit={submitHandler}>
            <div className='control-group'>
                <div className={firstNameClasses}>
                    <label htmlFor='name'>First Name</label>
                    <input type='text' id='name' value={firstNameValue} onBlur={firstNameBlurHandler}
                           onChange={firstNameChangeHandler}/>
                    {firstNameHasError &&
                        <p className='error-text'>Name must not be empty.</p>}
                </div>
                <div className={lastNameClasses}>
                    <label htmlFor='name'>Last Name</label>
                    <input type='text' id='name' value={lastNameValue} onBlur={lastNameBlurHandler}
                           onChange={lastNameChangeHandler}/>
                    {lastNameHasError &&
                        <p className='error-text'>Name must not be empty.</p>}
                </div>
            </div>
            <div className={emailClasses}>
                <label htmlFor='name'>E-Mail Address</label>
                <input type='text' id='name' value={emailValue} onBlur={emailBlurHandler}
                       onChange={emailChangeHandler}/>
                {emailHasError &&
                    <p className='error-text'>email must be valid.</p>}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;

import React, { useState } from 'react';
import { auth } from '../Firebase/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Login({ userInfo, newUserInfo, errorMsg, emailExist, googleLogin }) {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [hasAccount, setHasAccount] = useState(true);

    let [newUserName, setNewUserName] = useState('');
    let [newEmail, setNewEmail] = useState('');
    let [newPassword, setNewPassword] = useState('');

    const emailHandler = (e) => {
        setEmail(e.target.value.toLowerCase());
    };

    const pWordHandler = (e) => {
        setPassword(e.target.value);
    };

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, provider);
            let googleUserInfo = {
                email: res.user.email,
                userName: res.user.displayName,
            };
            googleLogin(googleUserInfo);
        } catch (err) {
            console.log(err);
        }
    }

    const newUserHandler = (e) => {
        e.preventDefault();

        let newUser = {
            userName: newUserName,
            email: newEmail,
            passWord: newPassword,
        };

        newUserInfo(newUser);
    };

    const sendUserInfo = (e) => {
        e.preventDefault();
        let info = { email, password };
        userInfo(info);
    };

    const showPassword = () => {
        let pwType = document.getElementById('passWord');
        if (pwType.type === 'password') {
            pwType.type = 'text';
        } else {
            pwType.type = 'password';
        }
    };

    const showNewPassword = () => {
        let pw = document.getElementById('newPassWord');
        if (pw.type === 'password') {
            pw.type = 'text';
        } else {
            pw.type = 'password';
        }
    };

    return (
        <>
            {hasAccount ? (
                <div className='login-page'>
                    <div id='logInContainer'>
                        <div id='logInInputs'>
                            <form onSubmit={sendUserInfo}>
                                <input
                                    type='email'
                                    placeholder='EMAIL'
                                    id='userName'
                                    className='logInField'
                                    onChange={emailHandler}
                                    value={email}
                                    required
                                />
                                <input
                                    type='password'
                                    placeholder='PASSWORD'
                                    id='passWord'
                                    className='logInField'
                                    onChange={pWordHandler}
                                    value={password}
                                    required
                                />
                                <div
                                    className='eye-icon'
                                    onClick={showPassword}
                                >
                                    Show password
                                </div>
                                {errorMsg ? (
                                    <p id='errorMsg'>Sorry, invalid login!</p>
                                ) : (
                                    ''
                                )}
                                <button type='submit' id='logInBtn'>
                                    Sign in
                                </button>
                                <p
                                    onClick={() => setHasAccount(!hasAccount)}
                                    id='signUp'
                                >
                                    Create account
                                </p>
                                <hr />
                                <h4>OR</h4>
                                <div
                                    className='google-btn'
                                    onClick={signInWithGoogle}
                                >
                                    <div className='google-icon-wrapper'>
                                        <img
                                            className='google-icon'
                                            src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                                            alt='google icon'
                                        />
                                    </div>
                                    <p className='btn-text'>
                                        <b>Sign in with google</b>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='login-page'>
                    <div id='newLogInContainer'>
                        <div id='logInInputs'>
                            <form onSubmit={newUserHandler}>
                                <input
                                    type='text'
                                    placeholder='CHOOSE NAME'
                                    id='newUserName'
                                    className='logInField'
                                    required='required'
                                    onChange={(e) =>
                                        setNewUserName(e.target.value)
                                    }
                                    value={newUserName}
                                />
                                <input
                                    type='email'
                                    placeholder='CHOOSE EMAIL'
                                    id='newEmail'
                                    className='logInField'
                                    required='required'
                                    onChange={(e) =>
                                        setNewEmail(
                                            e.target.value.toLowerCase()
                                        )
                                    }
                                    value={newEmail}
                                />
                                <input
                                    type='password'
                                    placeholder='CHOOSE PASSWORD'
                                    id='newPassWord'
                                    className='logInField'
                                    required='required'
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    value={newPassword}
                                />
                                <div
                                    className='eye-icon new-icon'
                                    onClick={showNewPassword}
                                >
                                    Show password
                                </div>
                                {emailExist ? (
                                    <p id='errorMsg'>Email already exist!</p>
                                ) : (
                                    ''
                                )}
                                <button id='createAccount'>
                                    Create account
                                </button>
                                <p
                                    onClick={() => setHasAccount(!hasAccount)}
                                    id='signUp'
                                >
                                    Have an account? Sign in
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;

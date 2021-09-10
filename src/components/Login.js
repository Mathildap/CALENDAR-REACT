import React, { useState } from 'react';

function Login({ userInfo }) {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const pWordHandler = (e) => {
        setPassword(e.target.value);
    };

    const sendUserInfo = (e) => {
        e.preventDefault();
        let info = { email, password };
        userInfo(info);
    };

    return (
        <div className='login-page'>
            <div id='logInContainer'>
                <div id='logInInputs'>
                    <form onSubmit={sendUserInfo}>
                        <input
                            type='text'
                            placeholder='EMAIL'
                            id='userName'
                            className='logInField'
                            onChange={emailHandler}
                            value={email}
                        />
                        <input
                            type='password'
                            placeholder='PASSWORD'
                            id='passWord'
                            className='logInField'
                            onChange={pWordHandler}
                            value={password}
                        />
                        <p id='errorMsg'></p>
                        <button id='logInBtn'>Sign in</button>
                        <p id='signUp'>Create account</p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

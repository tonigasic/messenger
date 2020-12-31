import React from 'react';
import './Login.css';
import {Button} from "@material-ui/core";
import {auth, provider} from "./firebase";

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider)
            .catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img
                    src="https://www.flaticon.com/svg/static/icons/svg/1400/1400488.svg"
                    alt=""
                />
                <h1>Messenger</h1>
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    );
}

export default Login;
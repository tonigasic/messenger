import React from 'react';
import './Login.css';
import {Button} from "@material-ui/core";
import {auth, provider} from "./firebase";
import {login} from "./features/userSlice";
import {useDispatch} from "react-redux";
import DemoUserImage from './demo-user.jpg'

function Login() {
    const dispatch = useDispatch();
    const signIn = () => {
        auth.signInWithPopup(provider)
            .catch(error => alert(error.message))
    }

    const demoLogin = () => {
        dispatch(login({
            uid: Math.random().toString(36).substring(7),
            photo: DemoUserImage,
            email: 'demo-user@gmail.com',
            displayName: 'demo-user',
            demo: true
        }))
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
            <div>
                <Button onClick={signIn}>Sign In</Button><br/><br/>
                <Button onClick={demoLogin}>Demo Sign In</Button>
            </div>
        </div>
    );
}

export default Login;
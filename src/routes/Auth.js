import React from 'react';
import {authService} from 'fBase';
import {
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider
} from 'firebase/auth';
import AuthForm from "../components/AuthForm";

const Auth = () => {
    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider
        if(name === "google"){
            provider = new GoogleAuthProvider();
        }else if(name === "github"){
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
    }

    return (
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>Countinue with Google</button>
                <button name="github" onClick={onSocialClick}>Countinue with Github</button>
            </div>
        </div>
    );
};

export default Auth;
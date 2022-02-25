import React, {useState} from 'react';
import {authService} from 'fBase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: {name, value}
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const toggleAccount = () => {
        setNewAccount((prev)=> !prev)
        console.log(newAccount)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount) {
                 data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                 data = await signInWithEmailAndPassword(authService, email, password);
            }
        }catch(error){
            setError(error.message)
            //console.log('234:'+error)
        }


    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password}
                       onChange={onChange}/>
                <input type="submit" placeholder="LogIn" required value={newAccount ? "Create Account" : "Log In"}/>
                <div>{error}</div>
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button>Countinue with Google</button>
                <button>Countinue with Github</button>
            </div>
        </div>
    );
};

export default Auth;
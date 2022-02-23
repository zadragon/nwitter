import React, {useState} from 'react';
import {authService} from 'fBase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

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

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount) {
                 data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                 data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data)
        }catch(error){
            console.log(error)
        }


    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password}
                       onChange={onChange}/>
                <input type="submit" placeholder="LogIn" required value={newAccount ? "Create Account" : "Log In"}/>
            </form>
            <div>
                <button>Countinue with Google</button>
                <button>Countinue with Github</button>
            </div>
        </div>
    );
};

export default Auth;
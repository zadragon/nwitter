import React, {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {authService} from 'fBase'


function App() {
    const [initi, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    useEffect(()=>{

    },[])
    return (
        <>
            <AppRouter isLoggedIn={isLoggedIn} />
            <footer>&copy; {new Date().getFullYear()}</footer>
        </>
    );
}

export default App;

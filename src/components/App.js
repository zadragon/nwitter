import React, {useState} from "react";
import AppRouter from "components/Router";
import {authService} from 'fBase';

function App() {
    console.log(authService.currentUser);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <>
            <AppRouter isLoggedIn />
            <footer>&copy; {new Date().getFullYear()}</footer>
        </>
    );
}

export default App;

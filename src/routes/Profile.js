import React, {useEffect, useState} from 'react';
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import {useHistory} from "react-router-dom";
import {authService, dbService} from "../fBase";

const Profile = ({userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/")
    }
    const onChange = (event) => {
        const {
            target : {value}
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
        }
    }
    const getMyNweets = async () => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }
    useEffect(()=>{
        getMyNweets();
    },[])
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="display name" onChange={onChange} />
                <input type="submit" value="update Profile"/>
            </form>
         <button onClick={onLogoutClick}>Log Out</button>
        </>
    );
};

export default Profile;
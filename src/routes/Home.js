import React, {useEffect, useState} from 'react';
import {addDoc, getDocs, collection, onSnapshot} from "firebase/firestore"
import {dbService, storageService} from "../fBase";
import { v4 as uuidv4 } from 'uuid';
import Nweet from "../components/Nweet";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import NweetFactory from "../components/NweetFactory";



const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);
    useEffect(()=>{
        onSnapshot(collection(dbService, "nweets"),(snapshot)=>{
            const nweetArray = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray)
        });
    },[])


    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map((nweet)=>(
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default Home;
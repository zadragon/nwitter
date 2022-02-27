import React, {useEffect, useState} from 'react';
import {addDoc, getDocs, collection, onSnapshot} from "firebase/firestore"
import {dbService} from "../fBase";


const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const querySnapshot = await getDocs(collection(dbService, "nweets"));
        querySnapshot.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id: doc.id,
            }
            setNweets(prev => [nweetObj, ...prev]);
        });
    };
    useEffect(()=>{
        getNweets()
    },[])

    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"),{
            text:nweet,
            createdAt:Date.now()
        });
        setNweet("")
    }
    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="what's on your mind?" />
                <input type="submit" value="ok"/>
            </form>
            <div>
                {nweets.map((nweet)=>(
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
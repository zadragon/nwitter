import React, {useEffect, useState} from 'react';
import {addDoc, getDocs, collection, onSnapshot} from "firebase/firestore"
import {dbService, storageService} from "../fBase";
import { v4 as uuidv4 } from 'uuid';
import Nweet from "../components/Nweet";
import { ref, uploadString } from "@firebase/storage";



const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState(null);

    useEffect(()=>{
        onSnapshot(collection(dbService, "nweets"),(snapshot)=>{
            const nweetArray = snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray)
        });
    },[])

    const onSubmit = async (event) => {
        event.preventDefault();
        /*await addDoc(collection(dbService, "nweets"),{
            text:nweet,
            createdAt:Date.now(),
            creatorId:userObj.uid
        });
        setNweet("")*/

        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        console.log(response);



    }
    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    }
    const onFileChange = (event) => {
        const {target:{files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget:{result}} = finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => setAttachment(null)
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="what's on your mind?" />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="ok"/>
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" alt=""/>
                        <button onClick={onClearAttachment}>clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map((nweet)=>(
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default Home;
import React, {useState} from 'react';
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import {dbService, storageService} from "../fBase";
import {v4 as uuidv4} from "uuid";
import {addDoc, collection} from "firebase/firestore";

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = ""
        if(attachment != ""){
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(fileRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        addDoc(collection(dbService, "nweets"),nweetObj);
        setNweet("");
        setAttachment("");
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
    const onClearAttachment = () => setAttachment("")
    return (
        <>
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
        </>
    );
};

export default NweetFactory;
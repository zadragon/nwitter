import React, {useState} from 'react';
import {doc, deleteDoc, updateDoc} from "@firebase/firestore";
import {dbService} from "../fBase";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = () => {
        const ok = window.confirm('Are you sure delete?')
        if (ok) {
            deleteDoc(doc(dbService, "nweets", nweetObj.id))
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);

    const onsubmit = (event) => {
        event.preventDefault();
        updateDoc(doc(dbService, "nweets", nweetObj.id), { text: newNweet });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setNewNweet(value);
    }

    return (
        <div>
            {
                editing ? (
                    <>
                        <form onSubmit={onsubmit}>
                            <input type="text" placeholder="Edit your nweet" value={newNweet} required onChange={onChange} />
                            <input type="submit" value="Update Nweet"/>
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Edit Nweet</button>
                            </>
                        )}
                    </>
                )

            }


        </div>
    );
};

export default Nweet;
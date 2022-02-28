import React from 'react';

const Nweet = ({nweetObj, isOwner}) => {

    const onDeleteClick = () => {
        const ok = window.confirm('Are you sure delete?')
        if(ok){
            console.log(true)
        }else{
            console.log(false)
        }
    }

    return (
        <div>
            <h4>{nweetObj.text}</h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Nweet</button>
                    <button>Edit Nweet</button>
                </>
            )}

        </div>
    );
};

export default Nweet;
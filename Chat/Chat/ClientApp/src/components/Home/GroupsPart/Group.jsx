import React from 'react';
import './style.css';

const Group = ({group, selected}) => {
//avatar
//creationDate
//creatorUserId
//description
//id
//name
//type
    return (
        <div className={selected?'gr pr':'gr'}>
            <img src={group.avatar} />
            <h4>{group.name}</h4>
            <h5>({group.type})</h5>
        </div>
    );
}

export default Group;

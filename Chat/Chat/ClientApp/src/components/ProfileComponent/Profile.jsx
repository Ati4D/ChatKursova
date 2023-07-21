import React, { useContext } from 'react';
import AuthentificatedContext from '../../contexts/AuthentificatedContext';
import './style.css';

const Profile = () => {
    const {user} = useContext(AuthentificatedContext); 
    return (
        <div className='main_box'>
            <p>Id: {user.id}</p>
            <p>Firstname: {user.firstname}</p>
            <p>Lastname: {user.lastname}</p>
            <p>Password: {user.password}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>RegDay: {user.regdate}</p>
        </div>
    );
}

export default Profile;

import React, { useState, useEffect } from 'react';
import AuthentificatedContext from '../contexts/AuthentificatedContext';
import axios from 'axios';


const AuthentificatedProvider = ({ children }) => {
    
    const [user, setUser] = useState({});

    const getUserFromAPI = async () => {
        console.log("RecivedUser!");
        try {
            const response = await axios.get('api/authentification', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data) {
                setUser({
                    id: response.data.id,
                    firstname: response.data.firstName,
                    lastname: response.data.lastName,
                    password: response.data.password,
                    email: response.data.email,
                    phone: response.data.phoneNumber,
                    regdate: response.data.registrationDate
                });
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    useEffect(() => {
        getUserFromAPI();
    }, []);

    return (
        <AuthentificatedContext.Provider value={{ user, setUser, getUserFromAPI}}>
            {children}
        </AuthentificatedContext.Provider>
    );
}

export default AuthentificatedProvider;

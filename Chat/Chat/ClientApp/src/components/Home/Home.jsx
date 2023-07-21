import React, { Component, useContext } from 'react';
import './style.css';
import Groups from './GroupsPart/Groups';
import Chat from './ChatPart/Chat';
import Users from './UsersPart/Users';
import AuthentificatedContext from '../../contexts/AuthentificatedContext';

const Home = () => {
  return (
      <Groups className='box'/>
  );
}

export default Home;
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from '../NavigationMenu/NavMenu';

const Layout = (props) => {

  return (
    <div>
      <NavMenu />
      <Container tag="main" style={{margin:0, padding:0}}>
        {props.children}
      </Container>
    </div>
  );
}

export default Layout;




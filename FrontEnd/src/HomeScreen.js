import logo from './logo.svg';
import './App.css';

import { Fragment } from 'react';

import AnotherContainer from './AnotherContainer';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function HomeScreen() {
  return (
    <Fragment>
      
      <AnotherContainer/>
    
    </Fragment>
  );
}

export default HomeScreen;

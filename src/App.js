import React, { Component } from 'react';
import FormComponent from './components/FormComponent'
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
    };
  }

  render(){
    return (
            <FormComponent/>
    );
  }
}

export default App;

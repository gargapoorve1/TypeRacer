import React, { Component } from 'react';
import Race from './pages/Race';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render () {
    return(
      <div className={App}>
        <Race />
      </div>
    );
  }

}


export default App;

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import Board from './features/board/Board';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <h1>Reinforcement</h1>
        </div>
        <Board />
      </div>

    );
  }
}

export default App;

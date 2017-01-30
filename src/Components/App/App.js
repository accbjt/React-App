import React from 'react';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <div>This is working now</div>
        {this.props.children}
      </div>
    );
  }
}

export default App;

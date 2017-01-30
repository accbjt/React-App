import React from 'react';
import './App.scss';
import Category from '../Category/Category';

class App extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <Category title='Products' subtitle='Beer' />
        {this.props.children}
      </div>
    );
  }
}

export default App;

import React from 'react';
import './Home.scss';
import Category from '../../Category/Category';

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <Category title='Products' subtitle='Beer' />
      </div>
    );
  }
}

export default Home;

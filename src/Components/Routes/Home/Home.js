import React from 'react';
import './Home.scss';
import Category from '../../Category/Category';

class Home extends React.Component {
  render() {
    return (
      <div className='container'>
        <Category categoryId={this.props.routeParams.categoryId} title='Products' subtitle='Beer' />
        {this.props.children}
      </div>
    );
  }
}

export default Home;

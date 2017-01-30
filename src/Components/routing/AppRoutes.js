import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import App from '../App/App';
import Home from '../Routes/Home/Home';

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App} >
          <IndexRoute component={Home} />
          <Route path='category/:id' component={Home} />
        </Route>
      </Router>
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import injectTapEventPlugin from "react-tap-event-plugin";
import Main from './main.jsx';
import Board from './board.jsx';

injectTapEventPlugin();
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/board" component={Main} />
    <Route path="/board/:boardId" component={Board}/>
  </Router>
), document.getElementById('app'));

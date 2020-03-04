import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';  // import all actions (using *) as actions

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
  componentDidMount() {  // as soon as component loads, do action
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);

/*
BrowserRouter
Brains of React Router.
Looks are url and changes components 
visible on screen based on it.

Route
Actually, sets up rule between route and set of components
*/
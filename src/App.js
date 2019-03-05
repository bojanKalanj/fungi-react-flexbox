import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';


import * as actions from './actions';
import Header from './components/shared/Header/Header';
import Observation from './components/pages/Observation/Observation';
import Home from './components/pages/Home/Home';
import Species from './components/pages/Species/Species';
import User from './components/pages/User/User';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import Register from './components/pages/Register/Register';
import ObservationNew from './components/pages/ObservationNew/ObservationNew';
import { Container } from './UI/Container/Container';

library.add(faAngleDown)

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  }

  render() {
    let renderLinks = [
      <div key="1">
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    ]

    if(this.props.isAuthenticated){
      renderLinks =[
        <div key="2">
          <Route path="/observations/new" exact component={ObservationNew} />
          <Route path="/logout" component={Logout} />
        </div>
      ]
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Container>
            <div style={{marginTop: '30px', marginBottom: '30px'}}>
                <Route path="/" exact component={Home} />
                <Route path="/species" component={Species} />
                <Route path="/users/:id" component={User} />
                <Route path="/observation/:id" component={Observation} />
                { renderLinks }
            </div>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

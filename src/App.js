import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './UI/Header/Header';
import Observation from './components/pages/observation/Observation';
import Home from './components/pages/Home/Home';
import Species from './components/pages/Species/Species';
import User from './components/pages/User/User';
import Login from './components/pages/Login/Login';

import { Container } from './UI/Container/Container';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Container>
            <div style={{marginTop: '30px', marginBottom: '30px'}}>
              <Route path="/" exact component={Home} />
              <Route path="/observation" component={Observation} />
              <Route path="/species" component={Species} />
              <Route path="/user" component={User} />
              <Route path="/login" component={Login} />
            </div>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

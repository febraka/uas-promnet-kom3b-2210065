import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch }
  from 'react-router-dom'
import ListUserComponent from './components/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateUserComponent from './components/CreateUserComponent';
import ViewUserComponent from './components/ViewUserComponent';

function App() {
  return (
    <div className="">
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component=
              {ListUserComponent}></Route>
            <Route path="/users" component=
              {ListUserComponent}></Route>
            <Route path="/add-user/:id" component=
              {CreateUserComponent}></Route>
            <Route path="/view-user/:id" component=
              {ViewUserComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App;

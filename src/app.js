import React from "react";
import NavBar from "./components/navbar.js";
import RandomBeer from "./components/randombeer.js";
import Beers from "./components/beers.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

export default class App extends React.Component {
  state = {
    abvApp: 0
  };

  changeAbv = val => {
    this.setState({ abvApp: val });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <Router>
          <NavBar changeAbv={this.changeAbv} />
          <Switch>
            // Pass the abvValue we've stored at the state to the beer.js
            component.
            <Route
              exact
              path="/"
              render={props => (
                <Beers {...props} abvValue={this.state.abvApp} />
              )}
            />
            <Route path="/randombeer" component={RandomBeer} />
          </Switch>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  abvApp: PropTypes.int
};

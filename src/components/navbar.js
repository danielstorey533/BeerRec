import React, { Component } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

//Notes from 4th November: was trying to test out if the app was
//receiving input from search bar and storing it. The output each
//time is "undefined" and stackoverflow has no results. As an
//aside I set up some route prep for the abv search code.

//Main problem is passing in props to the abv search:
//there is hardcode for the BeerAbv class currently which works perfectly.

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { abv: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({ abv: event.target.value });
  };

  handleSubmit = event => {
    this.props.changeAbv(this.state.abv);
    event.preventDefault();
  };

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">IPARec</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/randombeer">Random Beer</Nav.Link>
          </Nav>
          <Form onSubmit={this.handleSubmit} inline>
            <FormControl
              type="text"
              placeholder="Search"
              value={this.state.abv}
              onChange={this.handleChange}
              className="mr-sm-2"
            />
            <Button variant="outline-success" type="submit" value="Submit">
              >ABV% Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

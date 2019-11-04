import React from 'react'
import { Clock } from './Clock'

import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav, Form, FormControl, Button, NavItem } from "react-bootstrap"

class Navigation extends React.Component {
    render() {
        return(
        <div>
        <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand as={Link} to="/">HRDM</Navbar.Brand>
        <Navbar.Collapse>
            <Nav className="mr-auto">
            <Navbar.Text><Clock /></Navbar.Text>
            <NavItem eventkey={1} href="/myportfolio">
                <Nav.Link as={Link} to="/myportfolio">Portfolio</Nav.Link>
            </NavItem>
            <NavItem eventkey={1} href="/builder">
                <Nav.Link as={Link} to="/builder">Builder</Nav.Link>
            </NavItem>
            <NavItem eventkey={1} href="/watchlist">
                <Nav.Link as={Link} to="/watchlist">Watch List</Nav.Link>
            </NavItem>
            <NavItem eventkey={1} href="/stocks">
                <Nav.Link as={Link} to="/stocks">Stocks</Nav.Link>
            </NavItem>
            <NavItem eventkey={1} href="/contact">
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </NavItem>
            <Nav.Link to="/login">Login</Nav.Link>
            </Nav>
                <Form inline onSubmit={ (e) => this.handleSubmit(e)}>
                <FormControl type="text" placeholder="Stock Search" name="searchTerm" className="mr-sm-2" />
                <Button variant="outline-info" type = "submit">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
            <br />
            <br />
        </div>
        );
    }

    handleSubmit(event){
        try{
            event.preventDefault();
            const searchTerm = event.target.elements.namedItem("searchTerm").value.toUpperCase();
            //alert("searchterm = "+ searchTerm);
            this.props.history.push("/stock/"+searchTerm);
            event.target.reset();

        } catch(err){
            alert(err);
        }
    }
}

export default withRouter(Navigation);

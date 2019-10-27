import React from 'react'
import { Clock } from './Clock'

import { Link } from 'react-router-dom'
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
                <NavItem eventkey={1} href="/stocks">
                    <Nav.Link as={Link} to="/stocks">Stocks</Nav.Link>
                </NavItem>
                <NavItem eventkey={1} href="/contact">
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                </NavItem>
                <Nav.Link to="/login">Login</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Stock Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
            <br />
            <br />
        </div>
        );
    }
}

export { Navigation };

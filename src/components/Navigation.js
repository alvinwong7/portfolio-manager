import React from 'react'

import { Clock } from './Clock'

import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav, Form, FormControl, Button, NavItem } from "react-bootstrap"
import { getSessionCookie } from './Session.js'

/** 
 * Class for navigation toolbar
 * 
 * @class
 * @exports Navigation
*/
class Navigation extends React.Component {
    render = () => {
        const session = getSessionCookie()
        // Change toolbar options based on whether an account is logged in
        if (session.username === undefined) {
            return(
            <div>
            <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand as={Link} to="/">HRDM</Navbar.Brand>
            <Navbar.Collapse>
                <Nav className="mr-auto">
                <Navbar.Text><Clock /></Navbar.Text>
                <NavItem eventkey={1} href="/login">
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </NavItem>
                </Nav>
                </Navbar.Collapse>
                </Navbar>
                <br />
                <br />
            </div>
            )
        }

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
            <NavItem eventkey={1} href="/contact">
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </NavItem>
            <NavItem eventkey={1} href="/logout">
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
            </NavItem>
            </Nav>
            <Navbar.Text className="mr-sm-2" >Logged in as: {session.username}</Navbar.Text>
                <Form inline onSubmit={ (e) => this.handleSubmit(e)}>
                    <FormControl type="text" placeholder="Stock Search" name="searchTerm" className="mr-sm-2" />
                    <Button variant="outline-info" type = "submit">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
            <br />
            <br />
        </div>
        )
    }

    /**
     * Handles stock search bar submit
     */
    handleSubmit = (event) => {
        event.preventDefault()
        const searchTerm = event.target.elements.namedItem("searchTerm").value.toUpperCase()
        this.props.history.push("/stock/"+searchTerm)
        event.target.reset()
    }
}

export default withRouter(Navigation)

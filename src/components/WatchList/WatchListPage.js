import React from 'react'
import {Tabs, Tab, Form, Button, Collapse, Row, Container, Col } from 'react-bootstrap'

import { getSessionCookie } from '../Session'
import { deleteWatchlist, addWatchlist } from '../UserData'
import WatchList from './WatchList'


/**
 * Parent Class for all watchlists
 *
 * @class
 */
class WatchListPage extends React.Component {
 /**
  * Initialises the users selected watchlists from stored cookies
  * binds the update finction to this class
  *
  * @constructor
  */
  constructor(props) {
        super(props)
        let watchLists = getSessionCookie()["watchlists"]
        this.updateState = this.updateState.bind(this)
        this.state = {
            open: false,
            watchlists: watchLists,
            key: Object.keys(watchLists)[0]
        }
    }

    /**
     * Function to force state update, called from child compoenets
     */
    updateState = () => {
        let watchLists = getSessionCookie()["watchlists"]
        this.setState({
            open: false,
            watchlists: watchLists,

        })
    }

    /**
     * Creates watch list tabs
     * 
     * @param {object} context Refers to (this) object
     * @returns {html} List of watch list html tabs
     */
    createTabs = (context) => {
        let tabs = []

        let wl = this.state.watchlists
        Object.keys(wl).forEach(function(key) {
            tabs.push(<Tab eventKey={key} title={key}>
                <WatchList name={key} key={key} watchlist={wl[key]} forceUpdate={context.updateState}/>
                </Tab>)
        })

        return tabs
    }

    /**
     * Handles adding of new watch list
     */
    handleSubmit = (event) =>{
        event.preventDefault()
        const name = event.target.elements.namedItem("name").value
        addWatchlist(name)
        this.updateState()
        event.target.reset()

    }

    /**
     * Handles deleting of watch list
     */
    handleDel = (event) =>{
        deleteWatchlist(this.state.key)
        this.updateState()
    }

    render = () => {
        return (
            <>
            <Container>
                <Row>
                    <Col xs lg="3">
                    <Button
                      onClick={() => this.setState({"open": !this.state.open})}
                      aria-controls="example-collapse-text"
                      aria-expanded={this.state.open}
                      variant="success"
                    >
                      Add WatchList
                    </Button>
                    <br/>
                    <br/>
                    <Collapse in={this.state.open}>
                        <Form id ="addWatchlistForm" name = "addWatchlistForm" onSubmit={ (e) => this.handleSubmit(e)}>
                            <Form.Label>Name</Form.Label>
                                <Form.Control name="name"  required={true} placeholder="Enter Name Here" />
                            <br/>
                            <Button variant="primary" type = "submit" >
                                Submit
                            </Button>
                        </Form>
                    </Collapse>
                    </Col>
                    <Col>
                        <Button  onClick={(e) => this.handleDel(e)} >Delete WatchList </Button>
                    </Col>
                </Row>
            </Container>
            <br/>

            <Tabs defaultActiveKey={Object.keys(this.state.watchlists)[0]} activeKey={this.state.key} onSelect={k => this.setState({"key":k})} id="controlled-tab-example">
                {this.createTabs(this)}
            </Tabs>
            <br/>

            </>
        )
    }
}

export { WatchListPage }

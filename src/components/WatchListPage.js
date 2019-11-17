import React, { useState, setState }  from 'react'
import WatchList from './WatchList'
import { getSessionCookie } from './Session'
import {Tabs, Tab, Form, Button, Collapse, Row, Container, Col } from 'react-bootstrap'
import { deleteWatchlist, addWatchlist } from './UserData'

class WatchListPage extends React.Component {
    constructor(props) {
        super(props)
        let watchLists = getSessionCookie()["watchlists"]
        this.updateState = this.updateState.bind(this)
        this.state = {
            open : false,
            //watchlists : { 'List 1' : ['MSFT', 'AMZN', 'GOOGL'], 'List 2' : ['CBA', 'VAF', 'VAS'] },
            watchlists: watchLists,
            key: Object.keys(watchLists)[0]
        }
    }

    updateState(){
        let watchLists = getSessionCookie()["watchlists"]
        this.setState({
            open : false,
            watchlists: watchLists,

        })
    }

    componentWillUpdate(){

    }

    createTable = (context) => {
        let table = []

        let children = []
        let wl = this.state.watchlists
        Object.keys(wl).forEach(function(key) {
            //console.log(wl[key])
            children.push(<Tab eventKey={key} title={key}>
                <WatchList name={key} key = {key} watchlist={wl[key]} forceUpdate = {context.updateState}/>
                </Tab>)
        });
        table.push(children)
        return table
    }

    handleSubmit=(event)=>{

        event.preventDefault();
        const name = event.target.elements.namedItem("name").value;
        addWatchlist(name)
        this.updateState()
        event.target.reset();

    }

    handleDel=(event)=>{

        //alert("Del-ing watchlist = "+(this.state.key))
        //const name = event.target.elements.namedItem("name").value;
        deleteWatchlist(this.state.key)
        this.updateState()

    }



    render() {

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
                    <Collapse in={this.state.open}>
                        <Form id ="addWatchlistForm" name = "addWatchlistForm" onSubmit={ (e) => this.handleSubmit(e)}>
                            <Form.Label>Name</Form.Label>
                                <Form.Control name="name"  required={true} placeholder="Enter Name Here" />
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
                {this.createTable(this)}
            </Tabs>
            <br/>

            </>
        )
    }
}

export { WatchListPage }

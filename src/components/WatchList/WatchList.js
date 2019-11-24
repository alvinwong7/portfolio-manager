import React, { useState } from 'react'

import { WatchListStockTable } from './WatchlistStockTable'
import { addWatchlistStock } from '../UserData'
import { Button, Collapse, Form } from 'react-bootstrap'

/**
 * Contains the structure of a single watchlist
 *
 * @param {string} props.name the name of the WatchList
 * @param {function} props.forceUpdate function passed down to iniate state chnage
 * in parent watchlistPage class
 * @param {Object} props.watchlist array containing all the stocks to be rendered
 * @returns {html} returns the table of stocks with a collapsable form at
 * bottom to add stocks
 */
export default function WatchList(props) {
    const [open, setOpen] = useState(false)
    const name = props.name

    try{
        return (
            <div>
            <WatchListStockTable
                name={props.name}
                stocks={props.watchlist}
                forceUpdate={props.forceUpdate}
                />
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                variant="success"
            >
                Add Asset
            </Button>
            <br/>
            <Collapse in={open}>
                <Form id="addWatchlistStockForm"
                    name="addWatchlistStockForm"
                    onSubmit={(e) => handleSubmit(e,name,props.forceUpdate)}
                    >
                    <Form.Label>Code</Form.Label>
                        <Form.Control name="code"
                        required={true}
                        placeholder="Enter Asset Code Here"
                    />
                    <Button variant="primary" 
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form>
            </Collapse>
            </div>
        )
    } catch(err) {
        alert(err)
    }
}

/**
 * Local function to handle submission of new Stock
 *
 * @param {string} name Name of stock
 * @param {function} forceUpdate Update watch list page
 */
function handleSubmit(event, name, forceUpdate){
    event.preventDefault()
    addWatchlistStock(name, event.target.elements.namedItem("code").value)
    forceUpdate()
    event.target.reset()
}

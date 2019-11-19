import React, { useState } from 'react'
import { StockTable } from './WishlistStockTable'
import { addWatchlistStock } from './UserData'
import { Button, Collapse, Form } from 'react-bootstrap'

export default function WatchList(props) {
    const [open, setOpen] = useState(false)
    const name = props.name

    try{
        return (
            <div>
            <StockTable name={props.name} stocks={props.watchlist} forceUpdate={props.forceUpdate}/>
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
                <Form id="addWatchlistStockForm" name="addWatchlistStockForm" onSubmit={(e) => handleSubmit(e,name,props.forceUpdate)}>
                    <Form.Label>Code</Form.Label>
                        <Form.Control name="code" required={true} placeholder="Enter Asset Code Here"/>
                    <Button variant="primary" type="submit">
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

function handleSubmit(event,name,forceUpdate){
    event.preventDefault()
    addWatchlistStock(name, event.target.elements.namedItem("code").value)
    forceUpdate()
    event.target.reset()
}

import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'

import { NewStockForm } from './NewStockForm'

/**
 * Button to animate the new stock form
 * 
 * @exports NewStockFormButton
 * @param {object} props Contains the following important parameters to be 
 * passed to @see NewStockForm
 * @param {function} props.updateSession Function to force an update on the portfolio page
 * @param {string} props.portfolioName Name of the portfolio
 */
function NewStockFormButton(props) {
    const [open, setOpen] = useState(false)

    return (
        <>
        <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        >
        Add stock
        </Button>
        <Collapse in={open} component={this}>
        <div id="example-collapse-text">
            <br />
            <NewStockForm updateSession={props.updateSession} portfolioName={props.portfolioName}/>
        </div>
        </Collapse>
        <br/>
        <br/>
        </>
    )
}

export { NewStockFormButton }

import React, { useState } from 'react'
import { NewStockForm } from './NewStockForm'

import { Button, Collapse } from 'react-bootstrap'

export default function StockForm(props) {
  const [open, setOpen] = useState(false);


  return (
    <>
    <Button
      onClick={() => setOpen(!open)}
      aria-controls="example-collapse-text"
      aria-expanded={open}
    >
      Add stock
    </Button>
    <Collapse in={open} component = {this} >
      <div id="example-collapse-text">
        <br />
        <NewStockForm updateSession = {props.updateSession}  />
      </div>
    </Collapse>
    <br/>
    <br/>

    </>
  )
}

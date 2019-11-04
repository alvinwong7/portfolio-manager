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
    <Collapse in={open}>
      <div id="example-collapse-text">
        <br />
        <NewStockForm addStock ={this.addStock} />
      </div>
    </Collapse>
    <br/>
    <br/>

    </>
  )
}

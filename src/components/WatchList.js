import React, { useState } from 'react'
import { StockTable } from './StockTable'

import { Button, Collapse } from 'react-bootstrap'

export default function WatchList(props) {
    const [open, setOpen] = useState(false);

    return (
        <>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          {props.name}
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text">
              <br />
          <StockTable stocks={props.watchlist}/>
          </div>
        </Collapse>
        <br/>
        <br/>

        </>
    )
}

import React, { useState } from 'react'
import { NewStockForm } from './NewStockForm'

import { Button, Collapse } from 'react-bootstrap'

export default function StockForm(props) {
  const [open, setOpen] = useState(false);

  function addStock(stock) {
    try{
    this.setState(state => {
      const stocks = state.stocks.concat(stock);
      return {
        stocks
      };
    });
    } catch(err){
        alert(err);
    }
    //alert("added "+ stock);
  }

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
        <NewStockForm addStock ={addStock} />
      </div>
    </Collapse>
    <br/>
    <br/>

    </>
  )
}

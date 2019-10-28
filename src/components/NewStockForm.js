import React from 'react';
import { Stocks } from './Stocks'
import { Form, FormControl, Button, Row, Col } from "react-bootstrap"

class NewStockForm extends React.Component {

  render() {
    return (
     <Form id ="addStockForm" name = "addStockForm" onSubmit={ (e) => this.handleSubmit(e)}>
     <b>Add Asset</b>
     <Row>
        <Col>
            <Form.Label>Asset Catagory</Form.Label>
                <Form.Control as="select" name = "assetType">
                   <option defaultValue >Stock</option>
                   <option>Crypto</option>
                   <option>Gold</option>
                </Form.Control>
        </Col>
        <Col>
            <Form.Label>Code</Form.Label>
            <Form.Control name="code"  required={false} placeholder="Enter Code Here" />
        </Col>
        <Col>
            <Form.Label>Units</Form.Label>
            <Form.Control name = "units" required={false} placeholder="Enter Units Here" />
        </Col>
     </Row>
     <Row>
         <Col>
            <Form.Label>Date Purchased</Form.Label>
             <Form.Control name = "date" required={false} type = "date" />
         </Col>
         <Col>
            <Form.Label>Price ($AUD)</Form.Label>
             <Form.Control ref="price" required={false} placeholder = "Enter Price Here" />
         </Col>
     </Row>
     <Button variant="primary" type="submit">
     Submit
     </Button>
    </Form>
    );
  }

  handleSubmit(event){
      const code = event.target.elements.namedItem("code").value
      try{
      Stocks.addStock(code);
      }
      catch(err){
          alert(err);
      }

      alert("adding: "+ code);
  }
}

export { NewStockForm };

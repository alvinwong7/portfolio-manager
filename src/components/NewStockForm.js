import React from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { addStock } from './UserData'

class NewStockForm extends React.Component {

    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

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
            <Form.Control name="code"  required={true} placeholder="Enter Code Here" />
        </Col>
        <Col>
            <Form.Label>Units</Form.Label>
            <Form.Control name = "units" required={true} type ="number" placeholder="Enter Units Here" />
        </Col>
     </Row>
     <Row>
         <Col>
            <Form.Label>Date Purchased</Form.Label>
             <Form.Control name = "date" required={true} type = "date" />
         </Col>
         <Col>
            <Form.Label>Price ($AUD)</Form.Label>
             <Form.Control name="price" required={true} type ="number" step=".01" placeholder = "Enter Price Here" />
         </Col>
     </Row>
     <Button variant="primary" type = "submit" >
     Submit
     </Button>
    </Form>
    );
  }

  handleSubmit = (event) => {
      try{
          event.preventDefault();
          let component = this

          //Collecting Inputs
          const assetType = event.target.elements.namedItem("assetType").value;
          const code = event.target.elements.namedItem("code").value;
          const units = event.target.elements.namedItem("units").value;
          const date = event.target.elements.namedItem("date").value;
          const price = event.target.elements.namedItem("price").value;

          //testing colection
          //alert("adding " + assetType +": " + code +" with " + units +" units @ $"+ price +" purchased on "+ date);

          //Add New stock
          //this.props.addStock(code);
          addStock(assetType, code, units, date, price);
          event.target.reset();

          //console.log(component)
          component.props.updateSession()
      }
      catch(err){
          alert(err);
      }
  }
}

export { NewStockForm };

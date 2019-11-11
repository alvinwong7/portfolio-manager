import React from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { addStock } from './UserData'

class NewPortfolioForm extends React.Component {

    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    createOptions = () => {

    }

  render() {
    return (
     <Form id ="addPortfolioForm" name = "addPortfolioForm" onSubmit={ (e) => this.handleSubmit(e)}>
     <b>Add Portfolio</b>
     <Row>
        <Col>
            <Form.Label>Portfolio Name</Form.Label>
            <Form.Control name="portfolioName"  required={true} placeholder="Enter Portfolio Name Here" />
        </Col>
        <Col>
            <Form.Label>Base off current portfolio</Form.Label>
                <Form.Control as="select" name="portfolioBase">
                   <option defaultValue>None</option>
                   {this.createOptions()}
                </Form.Control>
        </Col>
        <Col>
            <Form.Label>Units</Form.Label>
            <Form.Control name = "units" required={true} type ="number" placeholder="Enter Units Here" />
        </Col>
     </Row>
     <br />
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

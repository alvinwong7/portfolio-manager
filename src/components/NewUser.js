import React from "react"
import { Form, Button} from "react-bootstrap"
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { setSessionCookie } from "./Session"

class NewUser extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            errorMsg: ""
        }
    }

    render = () => {
        return(
            <div>
                <p><b>Create a New User Profile Here</b></p>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                <b> Username </b> <br />
                  <Form.Control
                    type="username"
                    required = {true}
                    placeholder="Enter Username"
                  />
                  <br/>
                  <b> Password </b> <br />
                  <Form.Control
                    type="password"
                    required = {true}
                    placeholder="Enter Password"
                  />
                  <br/>
                  <Button type="submit" >Join</Button>
                </Form>
                <font  color="red">{this.state.errorMsg}</font>
            </div>
        )

    }

    handleSubmit = (event) => {
        event.preventDefault()

        const username = event.target.elements[0].value
        const password = event.target.elements[1].value

        console.log(username+", "+ password)

        const url = "http://127.0.0.1:5000/adduser-"+username+"-"+password

        axios
            .get(url)
            .then( response => {
                console.log(response)
                let data = response.data
                if( !data["msg"]){
                    setSessionCookie(data)
                    this.props.forceSessionUpdate()
                    this.props.history.push("/")
                } else{
                    this.setState({
                        errorMsg: "That UserName is taken, Please enter another"
                    })
                }
            })

        event.target.reset()
    }


}

export default withRouter(NewUser)

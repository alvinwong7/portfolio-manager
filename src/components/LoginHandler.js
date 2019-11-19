import axios from 'axios'
import React, { useState} from 'react'
import {withRouter, Link} from 'react-router-dom'

import { setSessionCookie } from './Session'
import { Nav, Form, Button } from 'react-bootstrap'

const LoginHandler = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const handleSubmit = async e => {

        e.preventDefault()
        setLoading(true)
        // NOTE request to api login here instead of this fake promise
        //await new Promise(r => setTimeout(r(), 1000))

        const url = "http://127.0.0.1:5000/login-" + username + "-" + password

        axios.get(url).then(response => {
                let data = response.data
                if (!data["msg"]) {
                    setSessionCookie(data)
                    props.forceSessionUpdate()
                    props.history.push("/")
                    setLoading(false)
                } else {
                    setIncorrect(true)
                }
            })
        setLoading(false)
    }

    if (loading) {
        return <h4>Logging in...</h4>
    }

    let errorMsg = ""
    if(incorrect){
        errorMsg = "Please enter a correct Username and Password"
    }

    return (
        <div style={{ marginTop: "1rem" }}>
        <Form onSubmit={handleSubmit}>
        <b> Username </b> <br />
            <Form.Control
            type="username"
            required = {true}
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
            <br/>
            <b> Password </b> <br />
            <Form.Control
            type="password"
            required = {true}
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <Button type="submit" >Login</Button>
        </Form>
        <font  color="red">{errorMsg}</font>
        <Nav>
        <Nav.Link as={Link} to={"/NewUser"}>Create New User</Nav.Link>
        </Nav>
        </div>
    )
}

export default withRouter(LoginHandler)

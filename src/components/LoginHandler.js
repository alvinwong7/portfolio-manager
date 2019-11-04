import React, { useState} from "react";
import { createBrowserHistory } from "history";
import Cookies from "js-cookie";
import {withRouter} from 'react-router-dom'
import { SessionContext, getSessionCookie, setSessionCookie } from "./Session";
import axios from 'axios'

const LoginHandler = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // NOTE request to api login here instead of this fake promise
    //await new Promise(r => setTimeout(r(), 1000));

    const url = "http://127.0.0.1:5000/login-"+username+"-"+password

    axios
        .get(url)
        .then( response => {
            console.log(response)
            let data = response.data
            if( !data["msg"]){
                setSessionCookie(data);
                props.forceSessionUpdate();
                props.history.push("/");
                setLoading(false);
            } else{
                setIncorrect(true);
            }
        })
    setLoading(false);
  };

  if (loading) {
    return <h4>Logging in...</h4>;
  }

  var errorMsg = ""
  if(incorrect){
     errorMsg = "Please enter a correct Username and Password"
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <form onSubmit={handleSubmit}>
      <b> Login </b> <br />
        <input
          type="username"
          required = {true}
          placeholder="Enter Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br/>
        <b> Password </b> <br />
        <input
          type="password"
          required = {true}
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
      <font  color="red">{errorMsg}</font>
    </div>
  );
};


export default withRouter(LoginHandler)

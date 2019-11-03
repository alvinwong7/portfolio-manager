import React, { useState} from "react";
import { createBrowserHistory } from "history";
import Cookies from "js-cookie";
import {withRouter} from 'react-router-dom'
import { SessionContext, getSessionCookie, setSessionCookie } from "./Session";


const LoginHandler = (props) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // NOTE request to api login here instead of this fake promise
    await new Promise(r => setTimeout(r(), 1000));
    setSessionCookie({ username });
    props.forceSessionUpdate();
    props.history.push("/");
    setLoading(false);
  };

  if (loading) {
    return <h4>Logging in...</h4>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <form onSubmit={handleSubmit}>
      <b> Login </b> <br />
        <input
          type="username"
          placeholder="Enter Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};


export default withRouter(LoginHandler)

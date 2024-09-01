import React from 'react';
import './Login.css'; // Assuming you save the CSS in a file called Login.css

function Login() {
  return (
    <form className="form">
      <input className="input" type="text" placeholder="Name" />
      <input className="input" type="text" placeholder="E-Mail I.D." />
      <textarea className="textarea" placeholder="Enter message"></textarea>
      <center>
        <button className="button">Submit</button>
      </center>
    </form>
  );
}

export default Login;

import React, { useEffect, useState } from "react";
import axios from "axios";

const initialCredentials = {
  username: '',
  password: ''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  //state to handle form values and error
  const [credentials, setCredentials] = useState(initialCredentials);
  const [error, setError] = useState('');
 //event handler to handle the on change on the inputs & set state
  const changeHandler = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }
  // event handler for form submission that does a post request
  //also retireves token from api and routes you to the BubblePage
  const logIn = event => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/login', credentials)
     .then(res => {
       localStorage.setItem('token', res.data.payload);
       window.location.href = '/bubblePage'
     })
     .catch(err => {
       setError(err.response.data.error);
     })
  }

  return (
    <>
      <h1>
        Welcome to the Bubble App!
        <form className = 'login-form' onSubmit = {logIn}>
          <label>Username:</label>
          <input 
          type = 'text'
          name = 'username' 
          placeholder = 'Username'
          value = {credentials.username} 
          onChange = {changeHandler} />
          <label>Password:</label>
          <input 
          type = 'password'
          name = 'password' 
          placeholder = 'password'
          value = {credentials.password} 
          onChange = {changeHandler} />
          <button>Submit</button>
          <div>{error}</div>
        </form>
      </h1>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const input = document.getElementsByTagName("input");

    //extracting datafrom the input fields
    const email = input[0].value;
    const password = input[1].value;

    try {
      //making a call to the api,for login request, by sending the credentials
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      //getting the response from the api
      const json = await response.json();
      // console.log(json);

      //if the response is postive, means the user authenticated successfully, the api would return a authentication token in response
      if (json.success) {

        setLoginInfo({email:"",password:""});
        alert("logged in successfully!")
        //we save the authentication token in the browser local storage
        localStorage.setItem("authToken", json.authToken);
        history.push("/"); //and route the user to the "Home page"
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={loginInfo.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
          name="password"
            type="password"
            className="form-control"
            id="password"
            value={loginInfo.password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

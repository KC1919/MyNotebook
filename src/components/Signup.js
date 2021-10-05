import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const history = useHistory();

  const [regInfo, setRegInfo] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onChange = (e) => {
    setRegInfo({ ...regInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const input = document.getElementsByTagName("input");

    //extracting datafrom the input fields
    const name = input[0].value;
    const email = input[1].value;
    const password = input[2].value;
    const cpassword = input[3].value;

    try {
      if (password === cpassword) {
        //making a call to the api,for login request, by sending the credentials
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });

        //getting the response from the api
        const json = await response.json();
        // console.log(json);

        //if the response is postive, means the user authenticated successfully, the api would return a authentication token in response
        if (json.success) {
          props.showAlert("Registered Successfully!","success");
          setRegInfo({name:"",email:"",password:"",cpassword:""});
          console.log(json);
          //we save the authentication token in the browser local storage
          localStorage.setItem("authToken", json.authToken);
          history.push("/"); //and route the user to the "Home page"
        }
        else{
          props.showAlert("Registered failed! This email is already registered","danger");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            onChange={onChange}
            value={regInfo.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={regInfo.email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            value={regInfo.password}
            minLength={8}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            name="cpassword"
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            value={regInfo.cpassword}
            minLength={8}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;

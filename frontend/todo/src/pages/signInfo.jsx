import React, { Component } from "react";
import SignUp from "../components/Login/SignUp";
import SignIn from "../components/Login/SignIn";
import Overlay from "../components/Login/Overlay";
import "./login.css";

class Login extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      const signUpButton = document.getElementById("signUp");
      const signInButton = document.getElementById("signIn");
      const container = document.getElementById("container");

      signUpButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
      });
    });
  }

  render() {
    return (
      <div class="container" id="container">
        <div class="form-container sign-up-container">
          <SignUp />
        </div>
        <div class="form-container sign-in-container">
          <SignIn />
        </div>
        <div class="overlay-container">
          <Overlay />
        </div>
      </div>
    );
  }
}

export default Login;

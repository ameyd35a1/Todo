import React from "react";

const SignUp = props => {
  return (
    <form action="#">
      <h1>Create Account</h1>
      <div class="social-container">
        <a href="#" class="social">
          <i class="fab fa-facebook-f" />
        </a>
        <a href="#" class="social">
          <i class="fab fa-google-plus-g" />
        </a>
        <a href="#" class="social">
          <i class="fab fa-linkedin-in" />
        </a>
      </div>
      <span>or use your email for registration</span>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Sign Up</button>
    </form>
  );
};

export default SignUp;

import React from "react";

const SignIn = props => {
  return (
    <form action="#">
      <h1>Sign in</h1>
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
      <span>or use your account</span>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <a href="#">Forgot your password?</a>
      <button>Sign In</button>
    </form>
  );
};

export default SignIn;

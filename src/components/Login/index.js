import React from "react";

class Login extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("/login", {
      method: "POST",
      body: data
    });
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit = {this.handleSubmit}>
          <input id="email" name="email" type="email" placeholder="Email address" required />
          <input id="password" name="password" type="password" placeholder="Password" required />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
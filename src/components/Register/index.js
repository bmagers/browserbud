import React from "react";

class Register extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("/register", {
      method: "POST",
      body: data
    }).then(function() {
      console.log("posted, as far as React is concerned.");
    }).catch(function() {
      console.log("error");
    });
  }

  render() {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit = {this.handleSubmit}>
          <input id="username" name="username" type="email" placeholder="Email address" required />
          <input id="password" name="password" type="password" placeholder="Password" required />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
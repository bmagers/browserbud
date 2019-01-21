import React from "react";
import ReactDOM from "react-dom";
// import Login from "./components/Login";
import Register from "./components/Register";

class BrowserBud extends React.Component {
  render() {
    return (
      <div className="BrowserBud">
        <h1>BrowserBud</h1>
        <Register />
      </div>
    )
  }
}

ReactDOM.render(<BrowserBud />, document.getElementById("root"));
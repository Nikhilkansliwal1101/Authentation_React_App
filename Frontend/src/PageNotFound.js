import logo from "./logo.png";
import "./App.css";

function PageNotFound() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>404</h2><p> Page Not Found</p>
      </div>
    </div>
  );
}

export default PageNotFound;

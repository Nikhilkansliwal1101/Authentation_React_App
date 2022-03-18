import logo from "../logo.png";
import "../App.css";
import { Navigate } from "react-router-dom";


function Profile(props) {
  if (!props.isLogined) {
    props.setLoginRequiredError("Login Required");
    return <Navigate to="/Login"/>
  }
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
              <p>Welcome {props.userData.FName + " " + props.userData.LName}</p>
      </div>
    </div>
  );
}

export default Profile;

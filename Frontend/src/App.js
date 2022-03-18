import "./App.css";
import Header from "./atomic/header";
import Footer from "./atomic/footer";
import Login from "./Authentication/Login";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Signin from "./Authentication/Signin";
import Profile from "./Authentication/Profile";
import Logout from "./Authentication/Logout";
import Alert from "./components/Alert";
import { useEffect, useState } from "react";

function App() {
  const [isLogined, setLogin] = useState(0);
  const [userData, setUserData] = useState({});
  const [loginRequiredError, setLoginRequiredError] = useState("");
  useEffect(() => {
    try {
      fetch("http://localhost/isLogined", {
        // credentials: 'same-origin',
        credentials: "include",
        withCredentials: true,
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        response.json().then((result) => {
          if (result) {
            if (result.status) {
              setLogin(1);
              setUserData(result.userData);
            } else {
              setLogin(0);
              setUserData({});
            }
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  let alert = "";
  if (loginRequiredError) {
    if (isLogined) {
      setLoginRequiredError("");
    } else {
      alert = (
        <Alert
          type="alert-danger"
          heading="Error : "
          message={loginRequiredError}
        />
      );
    }
  }

  return (
    <div className="App">
      <Router>
        <Header isLogined={isLogined} />
        {alert}
        <Routes>
          <Route
            path="/"
            element={<Home isLogined={isLogined} userData={userData} />}
          />
          <Route
            path="/Login"
            element={
              isLogined ? (
                <Navigate to="/Profile" />
              ) : (
                <Login setLogin={setLogin} setUserData={setUserData} />
              )
            }
          />
          <Route
            path="/Signin"
            element={
              isLogined ? (
                <Navigate to="/Profile" />
              ) : (
                <Signin setLogin={setLogin} setUserData={setUserData} />
              )
            }
          />
          <Route
            path="/Profile"
            element={
              <Profile
                isLogined={isLogined}
                userData={userData}
                setLoginRequiredError={setLoginRequiredError}
              />
            }
          />
          <Route
            path="/Logout"
            element={
              isLogined ? (
                <Logout setLogin={setLogin} setUserData={setUserData} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

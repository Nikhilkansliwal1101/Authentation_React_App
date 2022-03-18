import { useState } from "react";
import { Navigate } from "react-router-dom";
import Alert from "../components/Alert";
import Loginform from "./Loginform";
function Login(props) {
  const [logincomplete, set_login] = useState(0);
  const [error_in_login, set_error] = useState("");

  async function func(x) {
    const mailid = x.target.elements.mailid.value;
    const passwd = x.target.elements.password.value;
    let f_data = {
      MailId: mailid.toLowerCase(),
      Password: passwd,
    };
    try {
      const response = await fetch("http://localhost/Login", {
        // credentials: 'same-origin',
        credentials: "include",
        withCredentials: true,
        mode: "cors",
        method: "POST",
        body: JSON.stringify(f_data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      var result = await response.json();

      if (result) {
        if (result.status) {
          set_login(1);
          props.setLogin(1);
          props.setUserData(result.userData);
        } else {
          set_error(result.err);
          set_login(0);
          props.setLogin(0);
          props.setUserData({});
        }
      }
    } catch (err) {
      console.log(err);
    }
    return 1;
  }
  let alert = "";
  if (error_in_login) {
    alert = (
      <Alert type="alert-warning" heading="Error : " message={error_in_login} />
    );
  }
  if (logincomplete) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        {alert}
        <Loginform onsubmit={func} />;
      </>
    );
  }
}

export default Login;

import { useState } from "react";
import { Navigate } from "react-router-dom";
import Alert from "../components/Alert";
import Signinform from "./Signinform";
function Signin(props) {
  const [signincomplete, set_signin] = useState(0);
  const [error_in_signin, set_error] = useState("");

  async function func(x) {
    const mailid = x.target.elements.mailid.value;
    const passwd = x.target.elements.password.value;
    const cnfpasswd = x.target.elements.cnfpassword.value;
    const fname = x.target.elements.fname.value;
    const lname = x.target.elements.lname.value;
    if (passwd !== cnfpasswd) {
      set_error("Password is not similar");
      return 0;
    }
    let f_data = {
      MailId: mailid.toLowerCase(),
      Password: passwd,
      FName: fname,
      LName: lname,
    };

    try {
      const response = await fetch("http://localhost/Signin", {
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
          set_signin(1);
          props.setLogin(1);
          props.setUserData(result.userData);
        } else {
          set_error(result.err);
          set_signin(0);
          props.setLogin(0);
          props.setUserData({});
        }
      }
    } catch (err) {
      console.log(err);
    }
    return 0;
  }

  let alert = "";
  if (error_in_signin) {
    alert = (
      <Alert
        type="alert-warning"
        heading="Error : "
        message={error_in_signin}
      />
    );
  }
  if (signincomplete) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        {alert}
        <Signinform onsubmit={func} />;
      </>
    );
  }
}

export default Signin;

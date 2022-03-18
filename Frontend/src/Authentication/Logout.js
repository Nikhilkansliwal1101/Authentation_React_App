import { Navigate } from "react-router-dom";
function Logout(props) {
  try {
    fetch("http://localhost/Logout", {
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
            props.setLogin(0);
            props.setUserData({});
          }
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
  return <Navigate to="/" />;
}

export default Logout;

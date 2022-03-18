import { Link } from "react-router-dom";

function Loginform(props) {
    const onsubmit = (e) => {
        e.preventDefault();
        const result =props.onsubmit(e);
        if (result) {
            document.getElementById('loginform').reset();
        }
    }
    return (
        <div className="container p-5 border-5 shadow-lg bg-dark text-light my-5" style={{ maxWidth: 600 }}>
            <h2 className="p-4"> Log in </h2>
            <form id="loginform" method="POST" onSubmit={onsubmit}>
                <div className="mb-3">
                    <label htmlFor="mailid" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="mailid" name="mailid" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" required/>
                </div>
                <button type="submit" className="btn btn-primary w-100 my-2">Login</button>
            </form>
            <Link to="/Signin">New to BAAT-CHEET</Link>
        </div>
    )
};

export default Loginform;
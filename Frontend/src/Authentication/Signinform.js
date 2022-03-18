import { Link } from "react-router-dom";

function Signinform(props) {
    const onsubmit = (e)=> {
        e.preventDefault();
        const result = props.onsubmit(e);
        if (result) {
            document.getElementById('signinform').reset();
        }
    }
    return (
        <div className="container p-5 border-5 shadow-lg bg-dark text-light my-5" style={{ maxWidth: 600 }}>
            <h2 className="p-4"> Sign in </h2>
            <form id="signinform" method="POST" onSubmit={onsubmit}>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="fname" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="fname" name="fname" aria-describedby="emailHelp" required/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="lname" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lname" name="lname" aria-describedby="emailHelp" required/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="mailid" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="mailid" name="mailid" aria-describedby="emailHelp" required/>
                </div>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" minLength="8" maxLength="20" required/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="cnfpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cnfpassword" name="cnfpassword" minLength="8" maxLength="20" required/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 my-2">Signin</button>
            </form>
            <Link to="/Login">Already a user</Link>
        </div>
    )
};

export default Signinform;
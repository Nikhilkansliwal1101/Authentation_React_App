function Alert(props) {
    const classname = `alert ${props.type} alert-dismissible fade show m-0`;
    return (
        <div className={classname} role="alert">
            <strong>{props.heading}</strong> {props.message}.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
};

export default Alert;
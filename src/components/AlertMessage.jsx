import React from "react";
import "./SnackBar.css"

function AlertMessage ({message, color, show}) {
    return <div id="snackbar" className={`${show} alert alert-${color}`}>{message}</div>
}

export default AlertMessage;
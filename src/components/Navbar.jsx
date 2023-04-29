import React from "react";
import {Link} from "react-router-dom";
import "../components/Navbar.css";

function Navbar() {
    return (
    <nav className="navbar bg-dark container d-flex justify-content-around">
        <h4><Link className="link" to="/">Home</Link></h4>
        <h4><Link className="link" to="/links">Links</Link></h4>
        <h4><Link className="link" to="/create">Create Links</Link></h4>
        <h4><Link className="link" to="/delete">Delete Links</Link></h4>
    </nav>
    );
}

export default Navbar;
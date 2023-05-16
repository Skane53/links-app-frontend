import React, {useState} from "react";
import axios from "axios";
import "./SnackBar.css"
import AlertMessage from "./AlertMessage";


function DeleteLink() {

    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const [show, setShow] = useState("");
    const [input, setInput] = useState({
        url: "",
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setMessage("");
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    const handleClick = (event) => {
        event.preventDefault();
        const linkToBeRemoved = {
            url: input.url
        }
        axios.post(`https://links-app-khoumzy-api.onrender.com/delete`, linkToBeRemoved);

        if (input.url === ""){
            setMessage("Warning !!! Please fill the URL field");
            setColor("danger");
            setShow("show");
        }else{
            setMessage("Your request has been submitted !",);
            setColor("success");
            setShow("show");
        }
        setTimeout(()=>{setShow("")},3000);
    }

    return (
    <div className="container">
        <h1 className="text-center my-3">Delete Link Page</h1>
        <form className="row d-flex flex-column">
            <div className="form-group mb-3">
                <label className="h4 mb-4">Please fill in the field the URL you want to remove from the DataBase</label>
                <input name="url" value={input.url} onChange={handleChange} className="form-control" placeholder="Link URL" type="text" />
            </div>
            <div className="d-grid">
                <button onClick={handleClick} className="btn btn-block btn-primary">DELETE LINK</button>
            </div>
        </form>
        <AlertMessage message={message} color ={color} show={show}/>
    </div>)
}

export default DeleteLink;
import React, {useState} from "react";
import axios from "axios";
import AlertMessage from "./AlertMessage";


function CreateLink() {

    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const [show, setShow] = useState("");
    const [input, setInput] = useState({
        url: "",
        courseTitle: "",
        courseNumber: ""
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
        const newLink = {
            url: input.url,
            courseTitle: input.courseTitle,
            courseNumber: input.courseNumber
        }
        axios.post("http://localhost:3001/create", newLink);

        if (input.url === "" || input.courseTitle === "" || input.courseNumber === ""){
            setMessage("Warning !!! Please fill all the fields");
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
        <h1 className="text-center">Create Link Page</h1>
        <form className="row d-flex flex-column">
            <div className="form-group mb-3">
                <input name="url" value={input.url} onChange={handleChange} className="form-control" placeholder="Link URL" type="text" />
            </div>
            <div className="form-group mb-3">
                <input name="courseTitle" value={input.courseTitle} onChange={handleChange} className="form-control" placeholder="Course Title"></input>
            </div>
            <div className="form-group mb-3">
                <input name="courseNumber" value={input.courseNumber} onChange={handleChange} className="form-control" placeholder="Course Number" type="number"></input>
            </div>
            <div className="d-grid">
                <button onClick={handleClick} className="btn btn-block btn-primary">ADD LINK</button>
            </div>
        </form>
        <AlertMessage message={message} color ={color} show={show}/>
    </div>)
}

export default CreateLink;
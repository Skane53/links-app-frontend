import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "../components/Navbar.css";
import axios from "axios";
import { URL } from "../App";

function OneTab({courseTitle}) {
    return <span><Link className="link rounded-pill h6 bg-primary px-3 py-1 m-3" to={"/links/" + courseTitle}>{courseTitle}</Link></span>
}

function CourseNavBar() {

    const [links, setLinks] = useState([{
        url: '',
        courseTitle: '',
        courseNumber: ''
    }])

    const [input, setInput] = useState({
        query:""
    })

    const [params, setParams] = useState([]);

    useEffect(()=> {
        let route = "/links/";
        fetch(route).then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes => setLinks(jsonRes))
    }, [])

    useEffect(() => {
        setParams(Array.from(new Set(links.map(i => i.courseTitle))).sort((a, b) => a.localeCompare(b, 'fr', {ignorePunctuation:true})));
    }, [links]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })

    }
    
    const handleClick = (event) => {
        event.preventDefault();
        const query = {
            query: input.query
        }
        axios.post(`${URL}/links`, query);
    }

    return (
    <nav className="navbar bg-secondary container d-flex justify-content-between px-2">
        <div className="horizontal-scroll my-3 py-1">
            {params.map(i=> <OneTab key={i.toString()} courseTitle={i}/>)}
        </div>
        <form class="d-flex">
            <input onChange={handleChange} class="form-control me-2" name="query" value={input.query} type="text" placeholder="Search" />
            <button onClick={handleClick} class="btn btn-primary" type="button">Search</button>
        </form>
    </nav>
    );
}

export default CourseNavBar;
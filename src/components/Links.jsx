import React, {useEffect, useState} from "react";
import CourseNavBar from "./CourseNavBar";

function Links({extension}) {

    const [links, setLinks] = useState([{
        url: '',
        courseTitle: '',
        courseNumber: ''
    }])

    useEffect(()=> {
        let route = "/links/" + extension;
        fetch(route).then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes => setLinks(jsonRes))
    }, [extension])


    return (
            <div className="container">
                <h1 className="text-center">Links Page</h1>
                <div className="d-flex justify-content-between m-10">
                    <CourseNavBar />
                </div>
                <div className="container row d-flex">
                    {links.map((link) => {
                        return(<div className="col-12 col-sm-6 col-lg-4 col-xl-3 rounded d-flex flex-column my-3">
                                    <a className="flex-grow-1" href={link.url}>{link.url}</a>
                                    <div>Course Title : {link.courseTitle}</div>
                                    <div> Course Number : {link.courseNumber}</div>
                                </div>);
                    })}
                </div>
            </div>
        )
}

export default Links;
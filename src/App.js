import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Links from "./components/Links";
import CreateLink from "./components/CreateLink";
import DeleteLink from "./components/DeleteLink";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  /* const [links, setLinks] = useState([
    {
      url: "",
      courseTitle: "",
      courseNumber: "",
    },
  ]); */

  const [extensions, setExtensions] = useState([]);

  useEffect(() => {
    let route = "/links";
    fetch(route)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        setExtensions(Array.from(new Set(jsonRes.map((i) => i.courseTitle))));
      });
  }, []);

  /*   useEffect(() => {
    setExtensions(Array.from(new Set(links.map((i) => i.courseTitle))));
  }, [links]); */

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/links" element={<Links />} />
          {/* //extension="" */}
          <Route path="/create" element={<CreateLink />} />
          <Route path="/delete" element={<DeleteLink />} />
          {extensions.map((extension) => {
            return (
              <Route
                key={extension}
                path={"/links/" + extension}
                element={<Links extension={"/" + extension} />}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;

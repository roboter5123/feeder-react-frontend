import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./loggedout/Login";
import Register from "./loggedout/Register";
import Dashboard from "./loggedin/Dashboard";
import Schedule from "./loggedin/Schedule";
import Feeder from "./loggedin/Feeder";



function App() {

    return (
        <div className="App">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" rel="stylesheet"/>
            <Routes>
                <Route path="/" element={<Dashboard rightButtonHandler={logout}/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/schedule/:name" element={<Schedule leftButtonHandler={backToDash} rightButtonHandler={logout}/>}/>
                <Route path="/feeder/:uuid" element={<Feeder rightButtonHandler={logout}/>}/>
            </Routes>
        </div>
    )
}

function backToDash(){

    window.location.href= "/"
}

function logout() {

    fetch("access-token", {
        method: 'DELETE',
        credentials: "include",
    }).then((response) => {

        if (response.ok) {

            document.cookie = "login= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            window.location.href = "/login"
        }
    })


}

export default App;

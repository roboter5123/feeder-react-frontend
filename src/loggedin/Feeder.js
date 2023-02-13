import React from "react";
import jsCookie from "js-cookie";

export default class Dashboard extends React.Component {

    render() {

        if (!jsCookie.get("access-token")) {

            window.location.href = "/login"
        }
        return(<div></div>)
    }
}
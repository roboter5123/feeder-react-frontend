import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default class FeederTile extends React.Component {

    componentDidMount() {
        this.getFeeders()
    }

    constructor(props) {
        super(props);
        this.state = {feeders: []}
    }

    render() {

        return (
            <ul className={"tileMain"}>
                {this.state.feeders.map(
                    (feeder) =>
                        <li key={feeder.uuid} id={feeder.uuid}>
                            <FontAwesomeIcon icon={faTrash} className={"delete active"}
                                             onClick={(e) => this.deleteFeeder(e.currentTarget.closest("li").getAttribute("id"))}/>
                            <Link to={feeder.uuid} className="feederHeading feeder">
                                {feeder.name ? feeder.name : feeder.uuid}
                            </Link>
                        </li>
                )}
            </ul>)
    }

    getFeeders() {

        fetch('feeders', {
            method: 'GET',
            credentials: "include",
            headers: {

                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data)
                    this.setState({feeders: data});
                })
            }
        })
    }

    deleteFeeder(feederName) {

        fetch("feeder?" + new URLSearchParams({"uuid": feederName}), {
            method: 'DELETE',
            credentials: "include",
        }).then((response) => {

            window.location.reload()
        })
    }
}
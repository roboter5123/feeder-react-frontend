import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default class ScheduleTile extends React.Component {

    componentDidMount() {
        this.getSchedules()
    }

    constructor(props) {
        super(props);
        this.state = {schedules: []}
    }

    render() {

        return (
            <ul className={"tileMain"}>
                {this.state.schedules.map(
                    (schedule) =>
                        <li key={schedule.name} id={schedule.name}>
                            <FontAwesomeIcon icon={faTrash} className={"delete active"}
                                             onClick={(e) => this.deleteSchedule(e.currentTarget.closest("li").getAttribute("id"))}/>
                            <Link to={"schedule/"+schedule.name} className="scheduleHeading schedule">
                                {schedule.name}
                            </Link>
                        </li>
                )}
            </ul>)
    }

    getSchedules() {

        fetch('schedules', {
            method: 'GET',
            credentials: "include",
            headers: {

                'Content-Type': 'application/json'
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log(data)
                    this.setState({schedules: data});
                })
            }
        })
    }

    deleteSchedule(scheduleName) {

        fetch("schedule?" + new URLSearchParams({"name": scheduleName}), {
            method: 'DELETE',
            credentials: "include",
        }).then(() => {

            window.location.reload()
        })
    }
}
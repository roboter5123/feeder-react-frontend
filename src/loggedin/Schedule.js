import React from "react";
import jsCookie from "js-cookie";
import withRouter from './WithRouter';
import {faPenToSquare, faRectangleXmark, faSquareCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Day from "./Day"
import {days} from "./Weekdays"
import "./Schedule.css"


class Schedule extends React.Component {

    componentDidMount() {

        let id = this.props.params.name
        fetch("/schedule?" + new URLSearchParams({"name": id}), {
            method: 'GET',
            credentials: "include",
        }).then((response) => {

            response.json().then((data) => {

                let tasks = [[], [], [], [], [], [], [], [],]
                for (const task of Object.values(data.tasks)) {

                    tasks[days[task.weekday]].push(task)
                }

                data.tasks = tasks;
                this.setState(data);
            })
        })
    }

    render() {

        if (!jsCookie.get("access-token")) {

            window.location.href = "/login"
        }
        return (
            <div>
                <p id="back" className="navigation topLeft" onClick={this.props.leftButtonHandler}>Logout</p>
                <p id="logout" className="navigation topRight" onClick={this.props.rightButtonHandler}>Logout</p>
                <main className={"screen"}>
                    <div className="screenHeading">
                        <h2>Schedule</h2>
                        {this.state &&
                            <div className="entityName">
                                <h3 id="name">{this.state.name}</h3>
                                <FontAwesomeIcon icon={faPenToSquare} id={"editName"} className={"active"}/>
                                <FontAwesomeIcon icon={faSquareCheck} id={"saveName"}/>
                                <FontAwesomeIcon icon={faRectangleXmark} id={"cancelName"}/>
                            </div>
                        }
                    </div>
                    <div className="screenMain">
                        {this.state &&

                            this.state.tasks.map((day, weekday) =>
                                <Day key={Object.keys(days).find(key => days[key] === weekday)} tasks={day}
                                     weekday={Object.keys(days).find(key => days[key] === weekday)}
                                     addTask={this.addTask.bind(this)}/>
                            )
                        }
                    </div>
                </main>
            </div>
        )
    }

    addTask(weekday) {


        fetch(`task?${new URLSearchParams({"scheduleName": this.props.params.name})}`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({weekday: weekday})
        }).then((result) => {

            result.json().then((data) => this.setState(data))
        })
    }
}

export default withRouter(Schedule);
import {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import {faX} from "@fortawesome/free-solid-svg-icons/faX";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

export default class Day extends Component {

    render() {
        console.log(this.props.tasks)
        return (
            <div className="tile">
                <h2 className="tileHeading">{this.props.weekday}</h2>
                <ul className="dayTasks tileMain">
                    {this.props.tasks.map((task) =>
                        <li key={task.id} id={task.id} className="task">
                            <FontAwesomeIcon icon={faTrash} className={"active deleteTask"}/>
                            <input className="time" type="time" value={task.time}/>
                            <input className="amount" type="number" min="0" max="999" value={task.amount}/>
                                <FontAwesomeIcon icon={faCheck} className={"taskControl"}/>
                                <FontAwesomeIcon icon={faX} className={"taskControl"}/>
                        </li>)}
                </ul>
                <div className="tileFooter">
                    <FontAwesomeIcon icon={faPlus} onClick={this.props.addTask()}/>
                    <i className="fa-solid fa-plus addTask active"></i>
                </div>
            </div>
        );
    }
}


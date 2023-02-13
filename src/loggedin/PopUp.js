import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";

export default class PopUp extends React.Component {

    render() {
        console.log(this)
        return (
            this.props.open ?
                <div className={"fullScreen"}>
                    <div className={"popUp"}>
                        <div id={"popUpHeading"}><h3>{"Add " + this.props.type}</h3>
                            <FontAwesomeIcon icon={faX} onClick={() => this.props.closePopUp()} className={"active"}/>
                        </div>
                        <div>
                            <label>{this.props.type === "schedule" ? "Schedule Name: " : "UUID: "}
                                <input id={"identity"} type={"text"}/>
                            </label>
                            <input id={"popUpSubmit"} type={"button"} value={"submit"} onClick={()=> {
                                this.sendAdd()
                            }}/>
                        </div>
                    </div>
                </div>

                :
                <div></div>

        )
    }

    sendAdd() {
        console.log("what")
        let idType = this.props.type === "schedule" ? "name" : "uuid"
        let id = document.getElementById("identity").value

        let searchParam = {}
        searchParam[idType] = id

        fetch(this.props.type + "?" + new URLSearchParams(searchParam), {
            method: 'POST',
            credentials: "include",
        }).then((response) => {

            if (response.ok) {

                window.location.reload()
            }else {

                console.log(response)
            }
        })
    }
}
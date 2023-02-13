import React from "react";
import jsCookie from "js-cookie";
import "./dashboard.css"
import ScheduleTile from "./ScheduleTile";
import FeederTile from "./FeederTile";
import PopUp from "./PopUp";

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            add: {
                schedule: false,
                feeder: false
            }
        }
    }

    closePopUp(){
        console.log(this)
        this.setState({add:{schedule:false, feeder:false}})
    }

    render() {

        if (!jsCookie.get("access-token")) {

            window.location.href = "/login"
        }

        return (
            <div>
                <PopUp closePopUp={this.closePopUp.bind(this)} type = {"schedule"} open ={this.state.add.schedule} />
                <PopUp closePopUp={this.closePopUp.bind(this)} type = {"feeder"} open ={this.state.add.feeder}/>
                <p id="logout" className="navigation topRight" onClick={this.props.rightButtonHandler}>Logout</p>
                <main className={"screen"}>
                    <div className={"screenHeading"}>
                        <h2>Dashboard</h2>
                    </div>
                    <div className={"screenMain"}>
                        <div className={"tile"} id={"feeder"}>
                            <h2 className={"tileHeading"}>Feeders</h2>
                            {/*Make this its own component that also loads feeders*/}
                            <FeederTile></FeederTile>
                            <div className={"tileFooter"}>
                                <i className={"fa-solid fa-plus add active"} onClick={()=>this.setState({add:{feeder:true, schedule:false}})}></i>
                            </div>
                        </div>
                        <div className={"tile"} id={"schedule"}>
                            <h2 className={"tileHeading"}>Schedules</h2>
                            <ScheduleTile/>
                            <div className={"tileFooter"}>
                                {/* TODO: Make this its own component that also adds Schedules*/}
                                <i className={"fa-solid fa-plus add active"} onClick={()=>this.setState({add:{feeder:false, schedule:true}})}></i>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }



}
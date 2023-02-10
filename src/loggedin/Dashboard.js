import React from "react";
import jsCookie from "js-cookie";
import "./dashboard.css"
import ScheduleTile from "./ScheduleTile";
import FeederTile from "./FeederTile";

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        if (!jsCookie.get("access-token")) {

            console.log("redirecting to login")
            window.location.replace("/login");
        }
        return (
            <div>
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
                                {/*Make this its own component that also adds feeders*/}
                                <i className={"fa-solid fa-plus add active"} onClick={this.addSchedule}></i>
                            </div>
                        </div>
                        <div className={"tile"} id={"schedule"}>
                            <h2 className={"tileHeading"}>Schedules</h2>
                            {/*Make this its own component that also loads Schedules*/}
                            <ScheduleTile/>
                            <div className={"tileFooter"}>
                                {/* TODO: Make this its own component that also adds Schedules*/}
                                <i className={"fa-solid fa-plus add active"}></i>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    addSchedule(){


    }
}
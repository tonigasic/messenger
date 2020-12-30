import React from "react";
import './Messanger.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function Messanger() {
    return (
        <div className="messanger">
            <Sidebar/>
            <Chat/>
        </div>
    )
}

export default Messanger;
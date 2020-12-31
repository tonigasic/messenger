import React from "react";
import './Messenger.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function Messenger() {
    return (
        <div className="messenger">
            <Sidebar/>
            <Chat/>
        </div>
    )
}

export default Messenger;
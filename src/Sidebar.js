import React, {useEffect, useState} from "react";
import './Sidebar.css';
import {Avatar, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SidebarChat from "./SidebarChat";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "./features/userSlice";
import db, {auth} from "./firebase";

function Sidebar() {
    const user = useSelector(selectUser)
    const [chats, setChats] = useState([]);
    const [allChats, setAllChats] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        db
            .collection('chats')
            .onSnapshot(snapshot => {
                let cnapshotChats = snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
                setChats(cnapshotChats);
                setAllChats(cnapshotChats);
            })
    }, [])

    const addChat = () => {
        const chatName = prompt('Please enter a chat name');

        if ( chatName ) {
            db
                .collection('chats')
                .add({
                    chatName: chatName
                });
        }
    }

    const searchChats = (event) => {
        let searchString = event.target.value;
        let foundsChats = allChats;
        if (searchString !== '') {
            foundsChats = allChats.filter(chat =>chat.data.chatName.toLowerCase().includes(searchString.toLowerCase()));
            setChats(foundsChats);
        }
        else {
            setChats(allChats);
        }
    }

    const signOutUser = () => {
        if (user.demo) {
            dispatch(logout())
        }
        else {
            auth.signOut()
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user.photo} className="sidebar__avatar"/>
                <div className="sidebar__input">
                    <SearchIcon/>
                    <input placeholder="Search"  onChange={searchChats}/>
                </div>
                <IconButton onClick={addChat} variant="outlined" className="sidebar__inputButton">
                    <RateReviewOutlinedIcon/>
                </IconButton>
                <IconButton onClick={signOutUser} variant="outlined" className="sidebar__inputButton">
                    <ExitToAppIcon/>
                </IconButton>
            </div>
            <div className="sidebar__chats">
                {chats.map(({id, data: { chatName }}) => (
                    <SidebarChat
                        key={id}
                        id={id}
                        chatName={chatName}
                    />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;
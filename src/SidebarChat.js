import React, {useEffect, useState} from "react";
import './SidebarChat.css';
import {Avatar} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {setChat} from "./features/chatSlice";
import db from "./firebase";
import * as timeago from 'timeago.js';

function SidebarChat({id, chatName}) {
    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([]);
    const [time, setTime] = useState('');
    let interval = null;

    useEffect(() => {
        db
            .collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setChatInfo(snapshot.docs.map(doc => doc.data()))
            })
    }, [id])

    useEffect(() => {
        if (chatInfo[0]) {
            setTime(timeago.format(chatInfo[0]?.timestamp?.toDate()).toLocaleString());
            interval=setInterval(()=>{
                setTime(timeago.format(chatInfo[0]?.timestamp?.toDate()).toLocaleString());
            },15000)

            return()=>clearInterval(interval)
        }
    }, [chatInfo])

    const saveChat = () => {
        dispatch(
            setChat(
                {
                    chatId: id,
                    chatName: chatName
                }
            )
        )
    }

    return (
        <div onClick={saveChat} className="sidebarChat">
            <Avatar src={chatInfo[0]?.photo} className="sidebarChat__avatar"/>
            <div className="sidebarChat__info">
                <h3>{chatName}</h3>
                <p>{chatInfo[0]?.message}</p>
                <small>
                    {time}
                </small>
                {/*<small>{new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString()}</small>*/}
            </div>
        </div>
    )
}

export default SidebarChat;
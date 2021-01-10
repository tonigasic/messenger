import React, {useEffect, useState} from "react";
import './Chat.css';
import MicNoneIcon from "@material-ui/icons/MicNone";
import {IconButton} from "@material-ui/core";
import Message from "./Message";
import {useDispatch, useSelector} from "react-redux";
import {selectChatid, selectChatName, setChat} from "./features/chatSlice";
import db from "./firebase";
import firebase from "firebase";
import {selectUser} from "./features/userSlice";
import FlipMove from "react-flip-move";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SendIcon from '@material-ui/icons/Send';

function Chat() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatid);
    const chatsRef = React.createRef();

    useEffect(() => {
        if (chatId) {
            db
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
        }
    }, [chatId])

    useEffect(() => {
        chatsRef.current.scrollTo(0, 0);
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();
        if (chatId) {
            db
                .collection('chats')
                .doc(chatId)
                .collection('messages')
                .add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    message: message,
                    uid: user.uid,
                    photo: user.photo,
                    email: user.email,
                    displayName: user.displayName
                })

            setMessage('');
        }
    }

    const deleteChat = () => {
        if (chatId) {
            db
                .collection('chats')
                .doc(chatId)
                .delete()
                .then(() => {
                    dispatch(
                        setChat(
                            {
                                chatId: null,
                                chatName: null
                            }
                        )
                    )
                    setMessages([]);
                    setMessage('');
                })
        }
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <h4>
                    To: <span className="chat__name">{chatName}</span>
                </h4>
                <IconButton disabled={!chatId} onClick={deleteChat} variant="outlined" className="chat__deleteButton">
                    <DeleteForeverIcon />
                </IconButton>
            </div>
            <div className="chat__messages" ref={chatsRef}>
                <FlipMove>
                    { messages.map(({id, data}) => (
                        <Message
                            key={id}
                            id={id}
                            contents={data}
                        />
                    ))
                    }
                </FlipMove>
            </div>
            <div className="chat__input">
                <form>
                    <input disabled={!chatId} onChange={e => setMessage(e.target.value)} value={message} placeholder="Message" type="text"/>
                    <button onClick={sendMessage}>Send Message</button>
                </form>
                <IconButton onClick={sendMessage}>
                    <SendIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat;
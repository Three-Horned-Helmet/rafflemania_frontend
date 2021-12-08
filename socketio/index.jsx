import React, { useState, useEffect } from 'react';

import socketIOClient from "socket.io-client";

const MainPage = () => {
    const [io, setIo] = useState({
        socket: null
    })

    const [chat, setChat] = useState({
        messages: [],
        inputValue: ""
    })

    useEffect(() => {
        const socket = socketIOClient();
        socket.on("connect", () => {
            setIo({...io, socket })
            console.info("User connected to socket.io")
        });

        socket.on("newChatMessage", (response) => {
            const {message, dateMessage, displayName} = response
            chat.messages.push({message, dateMessage, displayName})
            setChat({...chat, inputValue: "" })
        })
    }, [])

    handleChatSubmit = (event) => {
        io.socket.emit("writeChatMessage", {message: event.target.value, displayName: props.displayName.value})
    }

    const handleChatInputChange = (event) => {
        setChat({...chat, inputValue: event.target.value})
    }

    return (
        <div id="lobbies-main-container">
            <div id="lobby-chat-container">
                {io.socket ? (
                    <div>
                        <div>You are connect</div>
                        <input
                            id="lobby-chat-input"
                            value={chat.inputValue} type="text"
                            autoComplete="off"
                            placeholder="Type to chat"
                            onChange={handleChatInputChange}
                            onKeyDown={handleChatSubmit}
                        />
                    </div>
                ) : (
                    <div>
                        Connecting to chat...
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;
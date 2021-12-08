import React, { useState, useEffect } from "react";
import MessageInput from "./MessageInput";
const Messages = ({ socket }) => {
  const [data, setData] = useState({});

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };

  useEffect(() => {
    const messageListener = (data) => {
      console.log(data);
      setData((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[data.id] = data;
        return newMessages;
      });
    };

    socket.on("newChatMessage", messageListener);
    // socket.on('connected', messageListener);

    return () => {
      socket.off("newChatMessage", messageListener);
    };
  }, [socket]);

  return (
    <div className='w-2/5 border-green-500 border-4 h-full flex flex-colpl-4'>
      {[...Object.values(data)]
        .sort((a, b) => a.dateMessage - b.dateMessage)
        .map((d) => {
          const displayName = d?.creator?.displayName || "anon";
          const displayColor = stringToColor(displayName);
          return (
            <div
              key={d.id}
              className='message-container pl-2'
              title={`Sent at ${new Date(d.dateMessage).toLocaleTimeString()}`}
            >
              <span className=''>
                {new Date(d.dateMessage).toLocaleTimeString()}
              </span>
              <span style={{ color: displayColor }} className='ml-2'>
                {displayName}:
              </span>
              <span className='ml-2'>{d.message}</span>
            </div>
          );
        })}
      <div className='mt-auto ml-auto'>
        <MessageInput socket={socket} />
      </div>
    </div>
  );
};

export default Messages;

import React, { useState, useEffect } from 'react'; 
import MessageInput from "./MessageInput";
const Messages = ({ socket }) => {
  const [data, setData] = useState({});
  
  useEffect(() => {
    const messageListener = (data) => {
      console.log(data)
      setData((prevMessages) => {
        const newMessages = {...prevMessages};
        newMessages[data.id] = data; 
        return newMessages;
      });
    };
  
    socket.on('newChatMessage', messageListener);
    // socket.on('connected', messageListener);

    return () => {
      socket.off('newChatMessage', messageListener);
    };
  }, [socket]);

  return (
    <div className="w-2/5 border-green-500 border-4 h-full flex flex-col">
      {[...Object.values(data)]
        .sort((a, b) => a.dateMessage - b.dateMessage)
        .map((d) => (
          <div
            key={d.id}
            className="message-container"
            title={`Sent at ${new Date(d.dateMessage).toLocaleTimeString()}`}
          >
            {/* <span className="">{message.user.name}:</span> */}
            <span className="">{new Date(d.dateMessage).toLocaleTimeString()}</span>
            <span className="ml-2">{d.message}</span>
          </div>
        ))
      }
      <div className="mt-auto ml-auto">
      <MessageInput socket={socket} />
      </div>
    </div>
  );
}

export default Messages;
import React, { useState, useEffect } from 'react'; 

const Messages = ({ socket }) => {
  const [messages, setMessages] = useState({});
  
  useEffect(() => {
    const messageListener = (data) => {
      console.log(data, "<-- data");
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        newMessages[data] = data; //.id
        return newMessages;
      });
    };
  
    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };
  
    socket.on('newChatMessage', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('newChatMessage', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
    <div className="">
      {[...Object.values(messages)]
        .map(a=> {
          console.log(a)
          return a
        })
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            /* key={message.id} */
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            {/* <span className="">{message.user.name}:</span> */}
            {/* <span className="">{message.value}</span> */}
            {/* <span className="">{new Date(message.time).toLocaleTimeString()}</span> */}
            <span className="">{message}</span>
          </div>
        ))
      }
    </div>
  );
}

export default Messages;
import React, { useState, useEffect } from 'react'; 

const Messages = ({ socket }) => {
  const [data, setData] = useState({});
  
  useEffect(() => {
    const messageListener = (data) => {
      setData((prevMessages) => {
        const newMessages = {...prevMessages};
        newMessages[data.id] = data; 
        return newMessages;
      });
    };
  
    const deleteMessageListener = (messageID) => {
      setData((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };
  
    socket.on('newChatMessage', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    // socket.on('connected', messageListener);

    return () => {
      socket.off('newChatMessage', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
    <div className="">
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
            <p className="bg-blue-500 text-4xl text-red-500">{d.message}</p>
          </div>
        ))
      }
    </div>
  );
}

export default Messages;
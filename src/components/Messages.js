import "tailwindcss/tailwind.css";
import React, { useState, useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
const Messages = ({ socket }) => {
  const [data, setData] = useState({});
  const chatContainer = useRef(null);

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
      setData((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[data.id] = data;
        return newMessages;
      });

      chatContainer.current.scrollTop = chatContainer.current.scrollHeight
    };

    socket.on("newChatMessage", messageListener);

    socket.on("connected", (onLoadData) => {
      const processedMessages = data
      onLoadData.messages?.forEach(msg => {
        processedMessages[msg.message.id] = msg.message
      })
      setData({...processedMessages})
    });

    return () => {
      socket.off("newChatMessage", messageListener);
      socket.off("connected");
    };
  }, [socket]);

  return (
    <div ref={chatContainer} className="w-2/5 border-green-500 border-4 h-full flex flex-col px-2 overflow-auto">
      {[...Object.values(data)]
        .sort((a, b) => a.dateMessage - b.dateMessage)
        .map((d) => {
          const displayName = d?.creator?.displayName || "anon";
          const displayColor = stringToColor(displayName);
          return (
            <div
              key={d.id}
              className="pl-1"
              title={`Sent at ${new Date(d.dateMessage).toLocaleTimeString()}`}
            >
              <span className="">
                {new Date(d.dateMessage).toLocaleTimeString()}
              </span>
              <span style={{ color: displayColor }} className="ml-2">
                {displayName}:
              </span>
              <span className="ml-2 break-words">{d.message}</span>
            </div>
          );
        })}
      <div className="w-full mt-auto">
        <MessageInput socket={socket} socketUrl="writeChatMessage" />
      </div>
    </div>
  );
};

export default Messages;

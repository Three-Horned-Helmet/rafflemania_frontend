import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from "react";
import MessageInput from "./MessageInput";

const Raffle = ({ socket }) => {
  const [isTooFewUsers, setIsTooFewUsers] = useState(false);
  const [raffleStarted, setRaffleStarted] = useState(false);
  const [rafflers, setRafflers] = useState([]);
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
    const handleTooFewRaffleUsers = () => {
      setIsTooFewUsers(true);
      setTimeout(() => {
        setIsTooFewUsers(false);
      }, 3000);
    };

    /* array of users */
    const toggleRaffle = (rafflers, started) => {
      setRafflers(rafflers);
      setRaffleStarted(started);
    };

    socket.on("tooFewUsers", handleTooFewRaffleUsers);
    socket.on("newRaffle", (data) => toggleRaffle(data, true));
    socket.on("youAreARaffler", () => console.log("youarearaffler")); // You are a raffler
    socket.on("newRaffleMessage", messageListener);

    socket.on("raffleVoteAdded", () => console.log("raffleVoteAdded")); // a user gets a vote

    socket.on("newRaffleMessage", () => console.log("newRaffleMessage")); // You are a raffler
    socket.on("raffleEnded", (data) => toggleRaffle(data, false)); // all votes are in, the raffle is over

    socket.emit("raffleVote", "foo"); // vote for user, display name
    socket.emit("writeRaffleMessage", "foo"); // raffler gets to send message

    {
      /* <button onClick={() => socket.emit("raffleVote", "le mao")}> Click </button> */
    }

    return () => {
      socket.off("tooFewUsers", handleTooFewRaffleUsers);
      socket.off("newRaffle", toggleRaffle);
      socket.off("newRaffleMessage", messageListener);
    };
  }, [socket]);

  return (
    <div className='flex flex-col w-2/5 border-purple-500 border-4 h-full overflow-auto'>
      {isTooFewUsers && <p>Raffle not started, too few users</p>}
      {raffleStarted && <p>RAFFLE STARTED</p>}
      {[...Object.values(data)]
        .sort((a, b) => a.dateMessage - b.dateMessage)
        .map((d) => {
          const displayName = d?.creator?.displayName || "anon";
          const displayColor = stringToColor(displayName);
          return (
            <div
              key={d.id}
              className='pl-1'
              title={`Sent at ${new Date(d.dateMessage).toLocaleTimeString()}`}
            >
              <span className=''>
                {new Date(d.dateMessage).toLocaleTimeString()}
              </span>
              <span style={{ color: displayColor }} className='ml-2'>
                {displayName}:
              </span>
              <span className='ml-2 break-words'>{d.message}</span>
            </div>
          );
        })}
      <div className='mt-auto ml-auto'>
        {/* {rafflers.map((raffler, index) => <p key={index}>{raffler}</p>)} */}
        <MessageInput socket={socket} socketUrl='writeRaffleMessage' />
      </div>
    </div>
  );
};

export default Raffle;

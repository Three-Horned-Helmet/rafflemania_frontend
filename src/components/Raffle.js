import "tailwindcss/tailwind.css";
import React, {useEffect, useState} from 'react'

const Raffle = ({socket}) => {
    const [isTooFewUsers, setIsTooFewUsers] = useState(false)
    const [raffleStarted, setRaffleStarted] = useState(false)
    const [rafflers, setRafflers] = useState([])

    useEffect(() => {
    const handleTooFewRaffleUsers = () => {
      setIsTooFewUsers(true)
      setTimeout(() => {
          setIsTooFewUsers(false)
      }, 3000);
    }

    /* array of users */
    const handleNewRaffle = (rafflers, started) => {
    setRafflers(rafflers)
    setRaffleStarted(started)
    }

    socket.on('tooFewUsers', handleTooFewRaffleUsers);
    socket.on("newRaffle", (data) => handleNewRaffle(data, true))
    socket.on("raffleVoteAdded", () => console.log("raffleVoteAdded")) // user gets vote
    socket.on("raffleEnded", (data) => handleNewRaffle(data, false))
    
    
    {/* <button onClick={() => socket.emit("raffleVote", "le mao")}> Click </button> */}
    
    return () => {
      socket.off('tooFewUsers', handleTooFewRaffleUsers);
      socket.off("newRaffle", handleNewRaffle)
    };
    }, [socket]);
  
    return (
        <div className="w-2/5 border-purple-500 border-4 h-full">
            {isTooFewUsers && <p>Raffle not started, too few users</p>}
            {raffleStarted && <p>RAFFLE STARTED</p>}
            {/* {rafflers.map((raffler, index) => <p key={index}>{raffler}</p>)} */}
        </div>
    )
}

export default Raffle

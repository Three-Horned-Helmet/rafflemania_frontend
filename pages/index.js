import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";

import Head from "next/head";
import Username from "../src/components/Username";
import UserCounter from "../src/components/UserCounter";
import CountDownGameStart from "../src/components/CountDownGameStart";
import Messages from "../src/components/Messages";
import Raffle from "../src/components/Raffle";
import io from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const newSocket = io("http://192.168.0.2:5000");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const handleError = (err) => {
    console.error("ERROR: ",err)
    setError(err)
  }

  socket.on("error", handleError)
  

  return (
    <>
      <Head>
        <title>Rafflemania</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!!error &&<p className="text-red-500">Error: {error}</p>}
      {socket ? (
        <main className=" border-red-500 border-4 h-screen">
          <h1 className="text-center text-5xl">RAFFLEMANIA</h1>
          <div className="mt-4 flex justify-center"> 
            <Username socket={socket} />
          </div>
          <UserCounter socket={socket} />
          <CountDownGameStart />
          <div className="flex justify-between border-blue-500 border-4 h-2/3" >  {/* Raffle wrapper */}
            <Raffle socket={socket} />
            <Messages socket={socket} />
          </div>
        </main>
      ) : (
        <div>Not Connected</div>
      )}
    </>
  );
}

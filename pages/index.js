import Head from "next/head";
import Username from "../src/components/username";
import UserCounter from "../src/components/userCounter";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState("")

  useEffect(() => {
    const newSocket = io("http://192.168.0.2:5000");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  
  
  return (
    <div>
      <Head>
        <title>Rafflemania</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Username /> */}
      { socket ? (
        <>
          <Username />
          <UserCounter count="0" />
          <div className="">
            <Messages socket={socket} />
            <MessageInput socket={socket} />
          </div>
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

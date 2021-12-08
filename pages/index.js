import Head from "next/head";
import Username from "../src/components/Username";
import UserCounter from "../src/components/UserCounter";
import CountDownGameStart from "../src/components/countDownGameStart";
import Messages from "../src/components/Messages";
import MessageInput from "../src/components/MessageInput";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(null);

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
      {socket ? (
        <>
          <Username socket={socket} />
          <UserCounter count="0" />
          <CountDownGameStart />
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

import Head from "next/head";
import Username from "../src/components/username";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function useSocket(url) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;
  }, []);

  return socket;
}

export default function Home() {
  const socket = useSocket("http://127.0.0.1:9080");

  useEffect(() => {
    const handleEvent = (payload) => {
      console.log(payload);
      // HelloWorld
    };
    if (socket) {
      socket.on("SOME_EVENT", handleEvent);
    }
  }, [socket]);

  return (
    <div>
      <Head>
        <Username />
        <h1>Hei</h1>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

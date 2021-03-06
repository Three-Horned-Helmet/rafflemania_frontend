/* require("dotenv").config(); */
import "tailwindcss/tailwind.css";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Username from "../src/components/Username";
import Error from "../src/components/Error";
import UserCounter from "../src/components/UserCounter";
import CountDownGameStart from "../src/components/CountDownGameStart";
import Messages from "../src/components/Messages";
import Raffle from "../src/components/Raffle";
import io from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.SERVER_URL);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <>
      <Head>
        <title>Rafflemania</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {socket ? (
        <main className=' border-red-500 border-4 h-screen'>
          <Error socket={socket} />
          <h1 className='text-center text-5xl'>RAFFLEMANIA</h1>
          <div className='mt-4 flex justify-center'>
            <Username socket={socket} />
          </div>
          <UserCounter socket={socket} />
          <CountDownGameStart />
          <div className='flex justify-between border-blue-500 border-4 h-2/3'>
            {" "}
            {/* Raffle wrapper */}
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

import Head from 'next/head'

import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'

function useSocket(url) {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socketIo = io(url)

    setSocket(socketIo)

    function cleanup() {
      socketIo.disconnect()
    }
    return cleanup
  }, [])

  return socket
}


export default function Home() {
  const socket = useSocket('http://127.0.0.1:9080')
  const [response, setResponse] = useState("")

  useEffect(() => {
    const handleEvent = (payload)  => {
      console.log(payload) 
      // HelloWorld
    }
    if (socket) {
      socket.on('SOME_EVENT', handleEvent)

      socket.on("FromAPI", data => {
        setResponse(data);
    });
    }
  }, [socket])
  
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hei</h1>
      { socket ? (
        <div className="">
          <Messages socket={socket} />
          <MessageInput socket={socket} />
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>

  )
}

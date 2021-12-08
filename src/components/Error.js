import React, {useEffect, useState} from 'react'

const Error = ({socket}) => {
    const [error, setError] = useState("");
    const handleError = (err) => {
    console.error("ERROR: ",err)
    setError(err)
    setTimeout(() => {
        setError("")
    },5000)

  }
    useEffect(() => {
    socket.on('error', handleError);
    return () => {
      socket.off('error', handleError);
    };
    }, [socket]);
    return (<div> {!!error ? <p className="text-red-500" > {error} </p> : <p className="opacity-0"> - </p>} </div> )
    }
    
    
export default Error

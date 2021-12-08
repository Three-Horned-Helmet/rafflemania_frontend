import React, {useEffect, useState} from 'react'

const Error = ({socket}) => {
    const [error, setError] = useState("");
    const handleError = (err) => {
    console.error("ERROR: ",err)
    setError(err)
  }
    useEffect(() => {
    
    socket.on('error', handleError);
    return () => {
      socket.off('error', handleError);

    };
    }, [socket]);
    return (
        <p>Hei</p>
        )
    }
    
    {/* <> {!!error &&<p className="text-red-500">Error: {error}</p>} </> */}
export default Error

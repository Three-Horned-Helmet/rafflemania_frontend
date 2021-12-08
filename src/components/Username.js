import React, { useState, useEffect, useRef } from "react";

const Username = ({ socket }) => {
  const [username, setUsername] = useState("");
  const [validUserName, setValidUsername] = useState("");
  const [placeHolderName, setPlaceHolderName] = useState("");

  const inputElement = useRef(null);


  useEffect(() => {
    const handleCheckDisplayName = (data) => {
      setValidUsername(data);
    };
    socket.on("checkDisplayName", handleCheckDisplayName);
  }, [socket]);

  const submitDisplayName = (e) => {
    socket.emit("submitDisplayName", username);
    setPlaceHolderName(username);
    setUsername("");
    inputElement.current.blur();
    e.preventDefault();
  };

  const checkDisplayName = (e) => {
    e.preventDefault();
    setUsername(e.currentTarget.value);
    socket.emit("checkDisplayName", e.currentTarget.value);
  };

  return (
    <form onSubmit={submitDisplayName}>
      <label>
        Username:
        <input
          className="focus:border-green-500 outline-none border-black border-t-0 border-l-0 border-r-0 border-2 pl-2"
          autoFocus
          ref={inputElement}
          value={username}
          placeholder={
            validUserName === "true" ? placeHolderName : "Your username"
          }
          onChange={(e) => {
            checkDisplayName(e);
          }}
        />
      </label>
    </form>
  );
};

export default Username;
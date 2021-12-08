import React, { useState, useEffect, useRef } from "react";
import { BiBlock, BiLoaderAlt, BiCheck } from "react-icons/bi";

const Icon = ({ validUserName }) => {
  switch (validUserName) {
    case "true":
      return <BiCheck className='text-green-500 inline-block' />;
    case "false":
      return <BiBlock className='text-red-500 inline-block' />;
    default:
      return (
        <BiLoaderAlt className='text-blue-300 inline-block animate-spin	' />
      );
  }
};

const Username = ({ socket }) => {
  const [username, setUsername] = useState("");
  const [validUserName, setValidUsername] = useState("");
  const [placeHolderName, setPlaceHolderName] = useState("");
  const inputElement = useRef(null);

  useEffect(() => {
    const handleCheckDisplayName = (data) => {
      console.log(data);
      setValidUsername(data);
    };
    socket.on("checkDisplayName", handleCheckDisplayName);
  }, [socket, validUserName]);

  const submitDisplayName = (e) => {
    socket.emit("submitDisplayName", username);
    setPlaceHolderName(username);
    setUsername("");
    inputElement.current.blur();
    e.preventDefault();
  };

  const checkDisplayName = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    if (value.length > 14) return;
    setUsername(e.currentTarget.value);
    socket.emit("checkDisplayName", e.currentTarget.value);
  };

  return (
    <form onSubmit={submitDisplayName}>
      <label>
        Username:
        <input
          className='focus:border-green-500 outline-none border-black border-t-0 border-l-0 border-r-0 border-2 pl-2'
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
        <Icon validUserName={validUserName} />
      </label>
    </form>
  );
};

export default Username;

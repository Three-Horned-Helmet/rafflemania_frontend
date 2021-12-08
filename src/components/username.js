import React, { useState, useEffect } from "react";

const Username = ({ socket }) => {
  const [username, setUsername] = useState("");
  const [validUserName, setValidUsername] = useState("");

  useEffect(() => {
    const handleCheckDisplayName = (data) => {
      console.log(data);
      setValidUsername(data);
    };
    socket.on("checkDisplayName", handleCheckDisplayName);
  }, [socket]);

  const submitDisplayName = (e) => {
    socket.emit("submitDisplayName", username);
    setUsername("");
    e.preventDefault();
  };

  const checkDisplayName = (e) => {
    console.log(e.currentTarget.value);
    e.preventDefault();
    setUsername(e.currentTarget.value);
    socket.emit("checkDisplayName", e.currentTarget.value);
  };

  return (
    <form onSubmit={submitDisplayName}>
      <label>
        Username:
        <input
          autoFocus
          background-color="red"
          value={username}
          placeholder=" Tester"
          onChange={(e) => {
            checkDisplayName(e);
          }}
        />
      </label>
    </form>
  );
};

export default Username;

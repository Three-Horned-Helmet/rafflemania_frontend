import React, { useState } from "react";

const MessageInput = ({ socket, socketUrl }) => {
  const [value, setValue] = useState("");
  const submitForm = (e) => {
    console.log(socketUrl);
    e.preventDefault();
    socket.emit(socketUrl, value);
    setValue("");
  };

  return (
    <form onSubmit={submitForm}>
      <input
        className="focus:border-green-500 outline-none border-purple-500 rounded border-2 pl-2 mb-2 mr-2"
        autoFocus
        value={value}
        placeholder="Skriv melding baby!"
        onChange={handleChange}
      />
    </form>
  );
};

export default MessageInput;

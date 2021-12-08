import React, { useState } from "react";

const MessageInput = ({ socket, socketUrl }) => {
  const [value, setValue] = useState("");
  const submitForm = (e) => {
    console.log(socketUrl);
    e.preventDefault();
    socket.emit(socketUrl, value);
    setValue("");
  };
  /* const ekstraStyle = !!value ? "h-12" : "" */
  return (
    <form onSubmit={submitForm}>
      <input
        className="focus:border-green-500 outline-none border-purple-500 rounded border-2 pl-2 mb-2 mr-2"
        autoFocus
        value={value}
        placeholder="Skriv melding baby!"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
    </form>
  );
};

export default MessageInput;

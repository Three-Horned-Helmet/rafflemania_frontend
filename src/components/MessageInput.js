import React, { useState } from "react";

const MessageInput = ({ socket }) => {
  const [value, setValue] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit("writeChatMessage", value);
    setValue("");
  };
  const handleChange = (e) => {
    const { value } = e.currentTarget;
    if (value.length > 120) return;
    setValue(value);
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

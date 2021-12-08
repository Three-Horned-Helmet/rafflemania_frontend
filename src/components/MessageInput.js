import React, { useState } from "react";

const MessageInput = ({ socket, socketUrl }) => {
  const [value, setValue] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    console.log(value);
    console.log(socketUrl);
    socket.emit(socketUrl, value);
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
        className='focus:border-green-500 outline-none border-purple-500 rounded border-2 pl-2 my-2 w-full'
        autoFocus
        value={value}
        placeholder='Skriv melding baby!'
        onChange={handleChange}
      />
    </form>
  );
};

export default MessageInput;

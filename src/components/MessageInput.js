import React, { useState } from "react";

<<<<<<< HEAD
const MessageInput = ({ socket, socketUrl }) => {
=======
const MessageInput = ({ socket }) => {
>>>>>>> a679c1d4f7a1f7b87505e58ec04bab1ef16948b2
  const [value, setValue] = useState("");
  const submitForm = (e) => {
    console.log(socketUrl);
    e.preventDefault();
<<<<<<< HEAD
    socket.emit(socketUrl, value);
    setValue("");
=======
    socket.emit("writeChatMessage", value);
    setValue("");
  };
  const handleChange = (e) => {
    const { value } = e.currentTarget;
    if (value.length > 120) return;
    setValue(value);
>>>>>>> a679c1d4f7a1f7b87505e58ec04bab1ef16948b2
  };
  return (
    <form onSubmit={submitForm}>
      <input
        className='focus:border-green-500 outline-none border-purple-500 rounded border-2 pl-2 mb-2 mr-2'
        autoFocus
        value={value}
        placeholder='Skriv melding baby!'
        onChange={handleChange}
      />
    </form>
  );
};

export default MessageInput;

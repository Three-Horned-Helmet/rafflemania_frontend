import React, { useEffect, useState } from "react";

const UserCounter = ({ socket }) => {
  const [userCount, setUserCount] = useState(0);
  const [connectedData, setConnectedData] = useState("");
  useEffect(() => {
    const handleConnectedResponse = (data) => {
      setConnectedData(data);
      setUserCount(data.userCount);
    };
    const updateUserCount = (count) => {
      setUserCount(count);
    };
    socket.on("connected", handleConnectedResponse);
    socket.on("usersCount", updateUserCount);
  }, [socket]);
  return <div>There are {userCount} participating users</div>;
};

export default UserCounter;

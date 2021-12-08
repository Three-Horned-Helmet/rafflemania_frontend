import React, { useState, useEffect } from "react";

const calculateTimeLeft = () => {
  let year = new Date().getFullYear();
  let difference = +new Date(`12/10/${year}`) - new Date();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const countDownGameStart = () => {
  const [time, setTime] = useState(calculateTimeLeft());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeLeft());
      console.log(calculateTimeLeft().seconds);
    }, 100000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      Game starts in {time.days} days, {time.hours} hours, {time.minutes}{" "}
      minutes and {time.seconds} seconds
    </div>
  );
};

export default countDownGameStart;

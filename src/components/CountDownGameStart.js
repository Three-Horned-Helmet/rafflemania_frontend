import React, { useState, useEffect } from "react";

const calculateTimeLeft = () => {
  const year = new Date().getFullYear();
  const difference = +new Date(`12/10/${year}`) - new Date();

  const timeLeft = {};
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

const CountDownGameStart = () => {
  const [time, setTime] = useState(calculateTimeLeft());
  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft()
      setTime(timeLeft);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      Raffle starts in {time.days} days, {time.hours} hours, {time.minutes}{" "}
      minutes and {time.seconds} seconds
    </div>
  );
};

export default CountDownGameStart;

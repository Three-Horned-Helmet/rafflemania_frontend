import React from "react";

function countDownGameStart() {
  let countDownDate = new Date("Dec 08, 2021 16:37:52").getTime();

  var myfunc = setInterval(function () {
    var now = new Date().getTime();
    var timeleft = countDownDate - now;

    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
  }, 1000);

  return (
    <div>
      Raffle will start in {startTime.getTime() - new Date().getTime()} seconds
    </div>
  );
}

export default countDownGameStart;

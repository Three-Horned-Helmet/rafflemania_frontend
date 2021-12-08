import React from "react";

function Username() {
  return (
    <form>
      <label>
        Name:
        <input type="text" name="name"></input>
      </label>
      <input type="submit" value="Submit"></input>
    </form>
  );
}

export default Username;

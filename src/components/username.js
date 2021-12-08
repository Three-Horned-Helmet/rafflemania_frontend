import React from "react";

const Username = () => {
  return (
    <form>
      <label>
        Name:
        <input type="text" placeholder=" Username" name="name"></input>
      </label>
      <input type="submit" value="Submit"></input>
    </form>
  );
}

export default Username;

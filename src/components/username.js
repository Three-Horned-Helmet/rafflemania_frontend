import React from "react";

const Username = () => {
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

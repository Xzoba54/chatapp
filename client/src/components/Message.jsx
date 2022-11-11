import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Message({ from, text }) {
  const [id, setId] = useState(JSON.parse(localStorage.getItem("user")).id);

  return (
    <>
      {id === from ? (
        <div className="message from-me">{text}</div>
      ) : (
        <div className="message from-someone">{text}</div>
      )}
    </>
  );
}

export default Message;

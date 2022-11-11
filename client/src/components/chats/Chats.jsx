import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./chats.css";

import Message from "../Message";

function Chats() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      from: 0,
      text: "no messages",
    },
  ]);
  const [me, setMe] = useState("");
  const [indexId, setIndexId] = useState("");

  //NIE WIEM CZY DZIALA ALE - WYSYLANIE WIADOMOSCI PRZEZ SOCKET IO NASTEPNIE WPISYWANIE DO BAZY DANYCH

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    } else {
      setMe(JSON.parse(localStorage.getItem("user")).nick);
    }
  }, []);

  useEffect(() => {
    const data = {
      myuserid: JSON.parse(localStorage.getItem("user")).id,
    };
    axios.post("http://localhost/chatapp/api/indexes.php", data).then((res) => {
      if (!res.data.error) {
        setItems(res.data);
        console.log(res.data);
      } else {
        console.log("error");
      }
    });
  }, []);

  useEffect(() => {
    if (indexId != "") {
      const data = {
        indexid: indexId,
      };
      axios
        .post("http://localhost/chatapp/api/messages.php", data)
        .then((res) => {
          if (!res.data.error) {
            setMessages(res.data);
          }
        });
    }
  });

  const chooseChat = (id) => {
    const data = {
      indexid: id,
    };
    setIndexId(id);
    console.log("set indexid: " + id);
    axios
      .post("http://localhost/chatapp/api/messages.php", data)
      .then((res) => {
        if (!res.data.error) {
          setMessages(res.data);
        } else {
          setMessages([
            {
              from: 0,
              text: "no messages",
            },
          ]);
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const sendMessage = () => {
    const data = {
      indexId: indexId,
      from: JSON.parse(localStorage.getItem("user")).id,
      text: inputMessage,
    };
    axios
      .post("http://localhost/chatapp/api/sendMessage.php", data)
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="chats__container">
      <div className="chats__container-left">
        <div className="chats__container-left_topbar">
          <span>{me}</span>
          <p
            style={{ fontSize: "16px", cursor: "pointer", fontWeight: "500" }}
            onClick={logout}
          >
            Logout
          </p>
        </div>
        <div className="inboxes">
          {console.log("items data: ")}
          {console.log(items)}
          {items.map((item) => (
            <div onClick={() => chooseChat(item.indexId)} className="inbox">
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="chats__container-right">
        <div className="messages">
          {console.log(messages)}
          {messages.map((message) => (
            <>
              <Message from={message.from} text={message.text} />
              <br />
            </>
          ))}
          <div style={{ clear: "both" }}></div>
        </div>
        <div className="bottom-bar">
          <input
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Send a message..."
            type="text"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chats;

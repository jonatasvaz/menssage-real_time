

import {  useEffect, useState } from 'react'
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")
import './App.css'

function App() {
  const [menssagem, setMenssagem] = useState("")
  const [menssagemReceived, setMenssagemReceived] = useState([])
  const [roomSelect, setRoomSelect] = useState()
console.log(menssagemReceived)

//const urlSearch = new  URLSearchParams(window.location.search)
//const room = urlSearch.get("select_room")

  //console.log(selectRoom + "select")

  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div>
         <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>

    </div>
  )
}

export default App

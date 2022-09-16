import { Header } from "./header";
import { Message } from "./message";
import { InputBox } from "./inputBox";
import { useEffect, useRef, useState } from "react";
import { PixelBoard } from "../PixelBoard";


const ChatRoom = ({ messages, handleSendMessage, username, board, onPixelClick, pixelColor }) => {
  const messagesEndRef = useRef(null);
  const [tab, setTab] = useState("chat");

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div id="chatRoom" className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <Header selected={tab} handleTab={setTab}/>
      {tab === "chat" ? <>
        <div id="messages"
             className="flex flex-col border-gray-200 border-2 space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
          {messages.map((message, i) => (
            <Message key={i} message={message} own={message.username === username}/>
          ))}
          <div ref={messagesEndRef}/>
        </div>
        <div className=" pt-4 mb-2 sm:mb-0">
          <InputBox onSubmit={handleSendMessage}/>
        </div>
      </> : (
        <PixelBoard pixelColor={pixelColor} board={board} onPixelClick={onPixelClick}/>
      )}
    </div>
  );
};

ChatRoom.defaultProps = {};


export default ChatRoom;
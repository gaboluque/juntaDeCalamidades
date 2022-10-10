import { Header } from "./header";
import { useMemo, useState } from "react";
import { PixelBoard } from "../PixelBoard";
import { Chat } from "./chat";
import { Book } from "../Book";


const ChatRoom = ({ messages, handleSendMessage, username, board, onPixelClick, pixelColor }) => {
  const [tab, setTab] = useState("chat");

  const Component = useMemo(() => {
    if (tab === "chat") {
      return <Chat messages={messages} username={username} onSubmit={handleSendMessage}/>
    }
    if (tab === "board") {
      return <PixelBoard pixelColor={pixelColor} board={board} onPixelClick={onPixelClick}/>
    }
    if (tab === "book") {
      return <Book/>
    }
  }, [tab, messages]);


  return (
    <div id="chatRoom" className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <Header selected={tab} handleTab={setTab}/>
      {Component}
    </div>
  );
};

ChatRoom.defaultProps = {};


export default ChatRoom;
import React, { useEffect, useRef } from 'react';
import { Message } from "./message";
import { InputBox } from "./inputBox";

export function Chat({ messages, ref, onSubmit, username }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  return <>
    <div id="messages"
         className="flex flex-col border-gray-200 border-2 space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {messages.map((message, i) => (
        <Message key={i} message={message} own={message.username === username}/>
      ))}
      <div ref={messagesEndRef}/>
    </div>
    <div className=" pt-4 mb-2 sm:mb-0">
      <InputBox onSubmit={onSubmit}/>
    </div>
  </>;
}
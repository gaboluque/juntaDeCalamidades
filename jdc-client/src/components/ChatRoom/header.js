import React from 'react';

export const Header = ({ selected, handleTab }) => {
  const selectedClass = 'bg-gray-700 text-white';
  const unselectedClass = 'bg-gray-500 text-white hover:bg-gray-700';

  return (
    <div className="flex sm:items-center justify-between py-3">
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <img
            src="/img/logo.png"
            alt="" className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg"/>
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="text-gray-300 mr-3">La junta de calamidades</span>
          </div>
        </div>
      </div>
      <ul
        className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="mr-2" onClick={() => handleTab("chat")}>
          <a href="#" aria-current="page"
             className={`inline-block p-4 rounded-t-lg ${selected === "chat" ? selectedClass : unselectedClass}`}>
            Chat
          </a>
        </li>
        <li className="mr-2" onClick={() => handleTab("board")}>
          <a href="#"
             className={`inline-block p-4 rounded-t-lg ${selected === "board" ? selectedClass : unselectedClass}`}>
            Lienzo
          </a>
        </li>
      </ul>
    </div>
  );
};
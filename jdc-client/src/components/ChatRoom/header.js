import React from 'react';

export const Header = ({ handleTab }) => {
  return (
    <div className="flex sm:items-center justify-between py-3">
      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <img
            src="/img/logo.png"
            alt="" className="w-20 h-20  rounded-full bg"/>
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="text-gray-300 mr-3 uppercase">La junta de calamidades</span>
          </div>
        </div>
      </div>
      <ul
        className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <li className="mr-2" onClick={() => handleTab("chat")}>
          <a href="#" aria-current="page"
             className={`inline-block p-4 border-2 border-white bg-transparent text-white hover:bg-gray-700`}>
            Chat
          </a>
        </li>
        <li className="mr-2" onClick={() => handleTab("board")}>
          <a href="#"
             className={`inline-block p-4 border-2 border-white bg-transparent text-white hover:bg-gray-700`}>
            Lienzo
          </a>
        </li>
        <li className="mr-2" onClick={() => handleTab("book")}>
          <a href="#"
             className={`inline-block p-4 border-2 border-white bg-transparent text-white hover:bg-gray-700`}>
            Libro
          </a>
        </li>
      </ul>
    </div>
  );
};
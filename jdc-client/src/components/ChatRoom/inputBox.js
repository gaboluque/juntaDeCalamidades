import React from 'react';
import PropTypes from 'prop-types';

export const InputBox = ({ onSubmit }) => {
  const [message, setMessage] = React.useState('');

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
    setMessage('');
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex">
      <textarea value={message} onChange={handleChangeMessage} placeholder="VOMITO"
             className="w-full bg-black border-white border-2 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 px-6 pr-16 py-3"/>
      <div className="absolute right-0 items-center inset-y-0 sm:flex">
        <button type="submit"
                className="inline-flex items-center justify-center rounded-md px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
               className="h-6 w-6 ml-2 transform rotate-90">
            <path
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

InputBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
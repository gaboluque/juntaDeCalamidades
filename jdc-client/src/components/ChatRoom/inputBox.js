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
             className="w-full bg-black border-white border-2 focus:outline-none focus:placeholder-gray-400 placeholder-gray-600 px-6 pr-16 py-3"/>
      <div className="absolute right-0 items-center inset-y-0 sm:flex">
        <button type="submit"
                className="inline-flex items-center justify-center rounded-md px-4 py-3 transition duration-500 ease-in-out text-white bg-transparent focus:outline-none">
          <img src="/img/send_icon.png" width={30} />
        </button>
      </div>
    </form>
  );
};

InputBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
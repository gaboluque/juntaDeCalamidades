import React from 'react';
import PropTypes from 'prop-types';

export const Message = ({ message, own }) => {

  return (
    <div className="chat-message">
      <div className="w-full space-y-2 text-xs mx-2 items-start">
        <div>
          <div
            className={`px-4 py-2 inline-block text-white`}>
            <p className="my-1 text-lg">
              <span style={{ color: message.color || "white" }}>{message.username}:</span> {message.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    username: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired
  }),
  own: PropTypes.bool.isRequired
};
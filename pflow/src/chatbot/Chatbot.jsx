import React, { useState } from 'react';
import './Chatbot.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';
const Chatbot = () => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // 메시지 전송 로직 추가
    console.log('Message sent:', message);
    setMessage('');
  };

  return (
    <div className='chatbot'>
      <div className='message-panel'>
        <div className='top-content'>
          <div className='divider' />
        </div>
        <div className='message-box'>
        <FontAwesomeIcon icon={faPaperclip} />
          <div className='frame'>
            <input 
              className='frame-input' 
              value={message} 
              onChange={handleInputChange} 
              placeholder='Type a message' 
            />
            <span className='message-text'></span>
        <FontAwesomeIcon icon={faPaperPlane} onClick={handleSendMessage}/>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Chatbot;

import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';

const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  const handleChange = (event) => {
    setValue(event.target.value);

    isTyping(props, chatId); // notify others when a user is currently typing a message.
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevents reloading

    const text = value.trim(); // removes (spaces, tabs, or line breaks) 

    if (text.length > 0) {
      sendMessage(creds, chatId, { text }); 
    }

    setValue('');
  };

  const handleUpload = (event) => { // event handler for file upload input elements.
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    <form className="overflow-hidden rounded-md border border-purple-950 bg-white" onSubmit={handleSubmit}>
      <input
        className="h-10 w-[calc(100%-132px)] bg-white border mr-9 border-white px-4 outline-none text-sm"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="cursor-pointer px-3 h-full">
          <PictureOutlined />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="h-10 bg-white border border-white px-4 cursor-pointer">
        <SendOutlined />
      </button>
    </form>
  );
};

export default MessageForm;
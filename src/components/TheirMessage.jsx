const TheirMessage = ({ lastMessage, message }) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
  
    return (
      <div className="clear-left w-full flex ml-2">
        {isFirstMessageByUser && (
          <div
            className="w-11 h-11 rounded-3xl text-white text-center bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: message.sender && `url(${message.sender.avatar})` }}
          />
        )}
        {message.attachments && message.attachments.length > 0
          ? (
            <img
              src={message.attachments[0].file}
              alt="message-attachment"
              className="mr-4 object-cover rounded-md h-30vw max-h-200 max-w-200 min-h-100 min-w-100"
              style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
            />
          )
          : (
            <div className="p-3 text-base rounded-md max-w-60" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
              {message.text}
            </div>
          )}
      </div>
    );
  };
  
  export default TheirMessage;
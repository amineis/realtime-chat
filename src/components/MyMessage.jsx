const MyMessage = ({ message }) => {
  if (message.attachments && message.attachments.length > 0) {
    return (
      <img
        src={message.attachments[0].file}
        alt="message-attachment"
        className="mr-4 object-cover rounded-md h-30vw max-h-200 max-w-200 min-h-100 min-w-100"
        style={{ float: 'right' }}
      />
    );
  }

  return (
    <div className="p-3 text-base rounded-md max-w-60" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50' }}>
      {message.text}
    </div>
  );
};

export default MyMessage;
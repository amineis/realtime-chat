import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
    <div
      key={`read_${index}`}
      className="w-3 h-3 rounded-xl m-0.5 bg-no-repeat bg-center"
      style={{
        float: isMyMessage ? 'right' : 'left',
        backgroundSize: 48,
        backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
      }}
    />
  ));

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="inline-block w-full">
            {isMyMessage
              ? <MyMessage message={message} />
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
          </div>
          <div className="relative bottom-6" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return <div />;

  return (
    <div className="h-full w-full overflow-scroll bg-gray-100">
      <div className="w-[calc(100%-36px)] p-4 text-center">
        <div className="text-purple-800 font-extrabold text-2xl">{chat?.title}</div>
        <div className="text-purple-700 font-semibold text-xs pt-1">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: '80px' }} />
      <div className="absolute bottom-0 w-full p-4 bg-gray-50">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;

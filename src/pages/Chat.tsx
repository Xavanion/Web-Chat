import { useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { useFetchUser } from "../hooks/useFetchUser";


function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const socket = useSocket();
  const username = useFetchUser();

  useEffect(() => {
    if (socket) {
        socket.on('receiveMessage', ( data ) => {
          setMessages((prevMessages) => [...prevMessages, data.message]);
        });
    }

    return () => {
        if (socket) {
            socket.off('receiveMessage');
        }
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket && message.trim()){
      socket.emit('sendMessage', {message});
      setMessage('');
    }
  };
  
  if ( socket ){
    socket.emit('online', username);
  };

  return (
    <div className="Chat">
      <h1>Chat</h1>
      <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
      </div>
      <input
      placeholder="Send Message"
      value = {message}
      onChange={(e) => setMessage(e.target.value)}
      autoFocus
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;

import { useEffect, useState } from "react";
import MessageForm from "../components/Chat/MessageForm";
import supabase from "../utils/supabaseClient";

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getMessages() {
      const { data: messages, error } = await supabase
        .from("messages")
        .select();

      setMessages(messages);
    }

    getMessages();
  }, [messages]);

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <ul>
        {messages.map((message) => {
          return <li key={message.id}>{message.content}</li>;
        })}
      </ul>
      <MessageForm />
    </div>
  );
}

export default Chat;

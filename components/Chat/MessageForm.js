import { useEffect, useState, useRef } from "react";
import supabase from "../../utils/supabaseClient";

function MessageForm(props) {
  const [message, setMessage] = useState("");
  const conversationId = props.conversationId;

  async function sendMessage(event) {
    event.preventDefault();

    const { data, error } = await supabase
      .from("messages")
      .insert([{ content: message, conversation_id: conversationId }]);

    setMessage("");
  }

  return (
    <form onSubmit={sendMessage} className="chat-input-form">
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageForm;

import { useState, useEffect } from "react";
import supabase from "../../utils/supabaseClient";

function Messages() {
  const [sentMessages, setSentMessages] = useState([]);
  const [requests, setRequests] = useState([]);
  const user = supabase.auth.user();

  useEffect(() => {
    async function getRequests() {
      const { data: conversations, error } = await supabase
        .from("conversations")
        .select()
        .eq("owner_id", user.id);

      setRequests(conversations);
      console.log(conversations);
    }

    getRequests();

    async function getSentMessages() {
      const { data: conversations, error } = await supabase
        .from("conversations")
        .select()
        .eq("requester_id", user.id);

      setSentMessages(conversations);
      console.log(conversations);
    }

    getSentMessages();
  }, []);

  return (
    <div className="chat-container">
      <h2>Messages</h2>

      <ul>
        {requests?.map((request) => {
          const href = `/messages/${request.id}`;
          return (
            <li key={request.id}>
              <a href={href}>Open requested conversation</a>
            </li>
          );
        })}
      </ul>

      <ul>
        {sentMessages?.map((sentmessage) => {
          const href = `/messages/${sentmessage.id}`;
          return (
            <li key={sentmessage.id}>
              <a href={href}>Open sent conversation</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Messages;

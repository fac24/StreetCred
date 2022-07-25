import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import supabase from "../../utils/supabaseClient";
import MessageForm from "../../components/Chat/MessageForm";

function Conversation(props) {
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  const conversationId = props.conversation[0].id;

  useEffect(() => {
    async function getMessages() {
      const { data: messages, error } = await supabase
        .from("messages")
        .select()
        .eq("conversation_id", props.conversation[0].id);

      setMessages(messages);
    }

    getMessages();
  }, [messages]);

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <ul>
        {messages.map((message) => {
          return (
            <li key={message.id}>
              <p>{message.content}</p>
            </li>
          );
        })}
      </ul>
      <MessageForm conversationId={conversationId} />
    </div>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("conversations").select();
  const conversations = data ? data : ["58d92d5b-4d59-4c2b-9f65-e31476b3420a"];

  const paths = conversations.map((convo) => ({
    params: { id: `${convo.id}` },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { data, error } = await supabase
    .from("conversations")
    .select()
    .eq("id", context.params.id);

  return { props: { conversation: data } };
}

export default Conversation;

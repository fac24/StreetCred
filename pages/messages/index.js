import { useState, useEffect } from "react";

import GetRequester from "../../components/Chat/GetRequester";
import GetProduct from "../../components/Chat/GetProduct";
import makeGetServerSidePropsWithUser from "../../utils/makeGetServerSidePropsWithUser";
import supabase from "../../utils/supabaseClient";

function Messages() {
  const [sentMessages, setSentMessages] = useState([]);
  const [requests, setRequests] = useState([]);

  const [allMessages, setAllMessages] = useState([]);

  const user = supabase.auth.user();

  useEffect(() => {
    async function getRequests() {
      const { data: conversations, error } = await supabase
        .from("conversations")
        .select()
        .eq("owner_id", user.id);

      setRequests(conversations);
      //console.log(conversations);
    }

    getRequests();

    async function getSentMessages() {
      const { data: conversations, error } = await supabase
        .from("conversations")
        .select()
        .eq("requester_id", user.id);

      setSentMessages(conversations);
      //console.log(conversations);
    }

    getSentMessages();

    /*     const collectCOnvos = [];

    sentMessages.map((convo) => {
      collectCOnvos.push(convo.id);
    });

    requests.map((convo) => {
      collectCOnvos.push(convo.id);
    });

    async function getAll(convoId) {
      const { data: conversations, error } = await supabase
        .from("messages")
        .select()
        .eq("conversation_id", convoId);

      console.log(conversations);
    }

    collectCOnvos.map((convo) => {
      getAll(convo);
    }); */
  }, []);

  return (
    <div className="chat-container">
      <h2>Messages</h2>

      <div>
        <h3>Requests received</h3>
        <ul className="all-messages-div">
          {requests?.map((request) => {
            const href = `/messages/${request.id}`;
            return (
              <li key={request.id} className="conv-list">
                <a href={href} className="conversation-container">
                  <GetRequester requester={request.requester_id} />
                  <GetProduct product={request.product_id} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3>Requests sent</h3>
        <ul className="all-messages-div">
          {sentMessages?.map((sentmessage) => {
            const href = `/messages/${sentmessage.id}`;
            return (
              <li key={sentmessage.id} className="conv-list">
                <a href={href} className="conversation-container">
                  <GetRequester requester={sentmessage.owner_id} />
                  <GetProduct product={sentmessage.product_id} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps = makeGetServerSidePropsWithUser();

export default Messages;

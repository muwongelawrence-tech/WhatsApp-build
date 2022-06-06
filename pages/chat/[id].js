import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import ChatScreen from '../../components/ChatScreen';
import SideBar from '../../components/SideBar';
import { db } from '../../firebase';

function chat() {
  return (
    <Container>
        <Head>
            <title> chat </title>
        </Head>

        <SideBar/>

        <ChatContainer>
              <ChatScreen />
        </ChatContainer>

    </Container>
  );
}

export default chat;

export async function getServerSideProps(context){
    
    const ref = db.collection("chats").doc(context.query.id);
    
    // Prepare the messages on the server
     const messagesRes = await ref
    .collection("messages")
    .order("timestamp", "asc")
    .get();

    const messages = messagesRes.docs.map(doc => ({
      id : doc.id,
      ...doc.data()
    })).map(messages => ({
      ...messages,
      timestamp:messages.timestamp.toDate().getTime()

    }));
}

const Container = styled.div`
display:flex;
`;

const ChatContainer = styled.div`
flex: 1;
overflow:scroll;
height: 100vh;

::-webkit-scrollbar {
   display: none;
}

-ms-overflow-style : none; /* specifying the overflow style */
scrollbar-width:none; /* Firefox */
`;
import { Avatar, IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from "styled-components";
import { auth, db } from '../firebase';
import MoreVert from "@material-ui/icons/MoreVert";
import AttachFile from "@material-ui/icons/AttachFile";
import Message from './Message';
import { useCollection } from 'react-firebase-hooks/firestore';

function ChatScreen({ chat, messages }) {

  const [ user ] = useAuthState(auth); 
  const router = useRouter();
  const [messagesSnapshot] = 
  useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy("timestamp","asc"));

  const showMessages = () => {
     if(messagesSnapshot){
       return  messagesSnapshot.docs.map(message =>(
            <Message 
               key = { message.id }
               user = { message.data.user }
               message = {{
                  ...message.data(),
                   timestamp: message.data().timestamp?.toDate()
              }}
            />
       ))
     }
  }

  return (
    <Container>
        <Header>
             <Avatar />

             <HeaderInformation>
                 <h3> rec Email</h3>
                 <p>Last seen ...</p>
             </HeaderInformation>

             <HeaderIcons>

             <IconButton>
                   <AttachFile/>
               </IconButton>

               <IconButton>
                   <MoreVert/>
               </IconButton>

             </HeaderIcons>

        </Header>

        <MessageContainer>
              {/* show Messages  */}
              { showMessages() }
          <EndOfMessage/>
        </MessageContainer>

    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
 position:sticky;
 background-color:white;
z-index:100;
top:0;
display:flex;
padding:11px;
height: 80px;
align-items: center;
border-bottom: 1px solid whitesmoke;

`;

const HeaderInformation = styled.div`
margin-left:15px;
flex:1;
> h3 {
  margin-bottom:3px;
}

> p {
font-size: 14px;
color: gray;

}
`;

const HeaderIcons = styled.div`

`;

const EndOfMessage = styled.div``;

const MessageContainer = styled.div``;
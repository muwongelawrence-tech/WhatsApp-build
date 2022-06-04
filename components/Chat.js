import { Avatar } from '@material-ui/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';

function Chat({ id , users }) {

  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users , user);
  const [recipientSnapshot] = useCollection(db.collection("users").where('email','==', recipientEmail));
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  
  

  return (
   <Container>
     {
       recipient ? ( <UserAvatar src ={ recipient?.photoURL }/> )
       : ( <UserAvatar> { recipientEmail[0] } </UserAvatar> )
     }
      
      <p> { recipientEmail } </p>
   </Container>
  );
}

export default Chat;

const Container = styled.div`
display:flex;
align-items:center;
cursor:pointer;
padding:15px;
word-break:break-word;
:hover{
  background-color:#e9eaeb;
}

`;

const UserAvatar = styled(Avatar)`
margin:5px;
margin-right:15px;

`;
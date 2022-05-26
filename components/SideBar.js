import { Avatar, Button, IconButton } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';

function SideBar() {

  const [user] = useAuthState(auth);

  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
  const [ chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {

    const input = prompt(
      "please Enter an email address for the user you wish to chat with"
    );

    if(!input) return null;

    if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email ){

      // adding the chats into the DB or "chats " collection
      db.collection("chats").add({
             users: [ user.email , input],
      })
      

    }

  }

  // checking whether the chat Already Exists and prevent duplication
  const chatAlreadyExists = (recipientEmail) => 
     !!chatsSnapshot?.docs.find(
       (chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0
     );
  

  return (
    <Container>
        <Header>

           <UserAvatar onClick = { () => auth.signOut() }/>

           <IconContainer>
               <IconButton> <ChatIcon/> </IconButton>
               <IconButton> <MoreVertIcon/> </IconButton>
         </IconContainer>

        </Header>

        <Search> 
          <SearchIcon/> 
          <SearchInput placeholder='Search in chats'/> 
        </Search>

        <SideBarButton onClick = { createChat }> Start a new chat </SideBarButton>

        {/* List of chats */}

        { chatsSnapshot?.docs.map( chat => (
          <Chat 
            key = { chat.id }
            id = { chat.id }
            users = { chat.data().users }
          />
        ))}


    </Container>
  );
}

export default SideBar;

// styles for the  above components.

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  position: sticky;
  top:0;
  background-color:white;
  z-index:1;
  justify-content:space-between;
  align-items:center;
  padding:15px;
  height:80px;
  border-bottom:1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
 margin:10px;
 cursor: pointer;
 
 :hover{
     opacity:0.8;
 }
`;

const IconContainer = styled.div``;

const Search = styled.div`
 display:flex;
 align-items:center;
 padding:20px;
 border-radius:2px;
`;

const SearchInput = styled.input`
outline-width:0;
border:none;
flex:1;
`;

const SideBarButton = styled(Button)`
width:100%;
&&& {
  border-top:1px solid whitesmoke;
  border-bottom:1px solid whitesmoke;
}
`;
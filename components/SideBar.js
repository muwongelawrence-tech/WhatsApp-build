import { Avatar, IconButton } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

function SideBar() {
  return (
    <Container>
        <Header>

           <UserAvatar/>

           <IconContainer>
               <IconButton> <ChatIcon/> </IconButton>
               <IconButton> <MoreVertIcon/> </IconButton>
         </IconContainer>

        </Header>

        <Search> 
          <SearchIcon/> 
          <SearchInput/> 
        </Search>

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

`;

const SearchInput = styled.input`

`;
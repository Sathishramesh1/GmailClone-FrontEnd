import React from 'react'
import Layout from '../Layout'
import { MailContainer,Row,Message,Icons } from './Send'
import { Box, Checkbox, IconButton, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Star, StarBorder } from '@mui/icons-material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import DeleteIcon from '@mui/icons-material/Delete';


function Search() {


    
  return (
   <Layout>
    <MailContainer>
       {send?.map((message)=>(
        
         <Row key={message._id} className='row' onClick={handleClick} > 
        
         <Icons>
          <IconButton>
         <Checkbox size='small'/>
         </IconButton>
          {message.starred?(
          <IconButton
          onClick={ toggleStarredMail}
          ><Star
          fontSize="small"
          style={{  color: "#FADA5E" }}
          
        />
         </IconButton>
      ) : (
        <IconButton
        onClick={toggleStarredMail}
        >
        <StarBorder
          fontSize="small"
          
          
        />
        </IconButton>
   )}  

   {message.important?(
    <IconButton onClick={toggleImportantMail}>
    <LabelImportantIcon
    style={{  color: "#FADA5E" }}
    
   />
   </IconButton>
    
    
   ):(
    <IconButton onClick={toggleImportantMail}>
    <LabelImportantOutlinedIcon
    />
    </IconButton>
   )
   }
         </Icons>
          <Message  id={message._id}  >
          <div >{message.sender_name||message.reciver_name}</div>
         <div>{message.subject}</div>
         <div>{message.date.slice(0,10)}</div>
         <div >

          <IconButton onClick={handleDelete} className='delete'>
           <DeleteIcon/>
          </IconButton>
         </div>
         </Message>
        
         </Row>
         
       ))}
      

       </MailContainer>



   </Layout>
  )
}

export default Search
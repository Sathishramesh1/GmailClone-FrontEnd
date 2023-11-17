import { Box, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import {  useParams } from 'react-router-dom'
import {  useSelector } from 'react-redux';


function SingleMail() {
    const {messageid,type}=useParams();
   
    const {inbox,send,trash,starred,important}=useSelector((state)=>state.email);
    
   
    const [message,setMessage]=useState(null);
    
    
useEffect(()=>{
  

  //finding message from which state
  const openMessage=async()=>{
    let opened
    if(type=='inbox'){
        opened =await inbox.find((element)=>element._id ==messageid)
       setMessage(opened);
  
    }else if(type=='send'){
      opened= await send.find((element)=>element._id ==messageid);
      setMessage(opened);
    }else if(type=='starred'){
      opened= await starred.find((element)=>element._id ==messageid);
      setMessage(opened);

    }else if(type=='important'){
      opened= await important.find((element)=>element._id ==messageid);
      setMessage(opened);
    }
    else if(type=='trash'){
      opened= await trash.find((element)=>element._id ==messageid);
      setMessage(opened);
    }
      
  }
openMessage();
 
  
},[message])

  return (
    <Layout>
    <MailContainer>

   {message?(
    <div>
     
    <Mailheading>{message?.subject?.toString()}</Mailheading>
      <MailDetail>
      <div>from:{message?.from?.toString()}</div>
      <div>to:{message?.to}</div>
     <div>date:{message.date}</div>
     <p>{message?.content}</p>
     <div>
     {message.attachment?<a href={message.attachment} target='_new'>Downloaded Attachment</a> : "" }
     </div>
     </MailDetail>
    
    <div>
    </div>
     </div>
    
    ):(<p>no messsage</p>)}
    </MailContainer>
    </Layout>
    
  )
}

export default SingleMail


const MailContainer=styled(Box)({
    width:'100%',
    height:'100%',
    backgroundColor:'#F5F5F5',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start'  

});

const Mailheading=styled('div')({
  fontWeight:400,
  fontSize: '1.375rem',
  WebkitFontSmoothing:'antialiased',
  fontFamily:'"Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
  color:'#1f1f1f',
  paddingLeft:'2rem',
  marginBottom:'2rem'

});

const MailDetail=styled('div')({
  display:'flex',
  flexDirection:'column',
  width:'100%',
  justifyContent:'space-between',
  color:'black',
   fontWeight:400,
  
  WebkitFontSmoothing:'antialiased',
  fontFamily:'"Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
  paddingLeft:'2em',
  gap:"1em"


})
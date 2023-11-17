import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Box, Checkbox, IconButton, styled } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { setDelete } from '../components/redux-container/slices/emailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/globalUrl';
import { setDraft } from '../components/redux-container/slices/emailSlice';
import CustomizedDialogs from '../components/Dialog';
import { setStartoggler,setImportanttoggler } from '../components/redux-container/slices/emailSlice';
import { MailContainer,Row,Icons,Message } from '../components/Styles/StyledComponent';




function Draft() {

  const state=useSelector((state)=>state.email);
const {draft}=state;
const token=useSelector((state)=>state.email.user.token);
const dispatch=useDispatch();
const navigate=useNavigate();

const getDraftMail=useApi(API_URLS.getDraftEmail);
const toggler=useApi(API_URLS.toggleStarredEmail);
const mailDelete=useApi(API_URLS.deleteEmail);
const ImportantLabel=useApi(API_URLS.toggleImportantEmail);


const [open,setOpen]=useState(false);
const [value,setValue]=useState({
    to:'',
    subject:'',
    content:''
});
const [click,setClicked]=useState(false);
const [messageId,setMessageid]=useState(null);


const handleClose=()=>{

    setOpen(false);
}


const fetchdata=async()=>{  
  try {
    const res=await getDraftMail.call({},token);
  if(res.status){
    console.log(res.data);
    const data=res.data.DraftMail;
    
  dispatch(setDraft(data));
  }
    
  } catch (error) {
    console.log(error);
  }
  
  }


const handleClick=(event)=>{
 
let messageid=event.target.id;

if(messageid){
  setOpen(true);
    setMessageid(messageid);
   const editedmail=draft.find((message)=>message._id==messageid);
   setValue({...value,to:editedmail.to,subject:editedmail.subject
,content:editedmail.content
});

}else{
  messageid=event.target.parentElement.id
  setOpen(true);
    setMessageid(messageid);
   const editedmail=draft.find((message)=>message._id==messageid);
   setValue({...value,to:editedmail?.to,subject:editedmail?.subject
,content:editedmail?.content
});
 
}

}

//
const toggleStarredMail=async(event)=>{
  event.stopPropagation()

try {
  const messageid=event.target.closest('.row').children[1].id;
  console.log(messageid);
  const params=messageid  
    console.log(token,"jwt");
    dispatch(setStartoggler(params));
   
    let res=await toggler.call({},token,params);
    console.log(res);
  
} catch (error) {
 console.log(error);     
}
}

//function for important label
const toggleImportantMail=async(event)=>{
  event.stopPropagation();
 
  try {
    const messageid=event.target.closest('.row').children[1].id;
  console.log(messageid);
  const params=messageid  ;
   
    dispatch(setImportanttoggler(params));
    let res=await ImportantLabel.call({},token,params);
    console.log(res);
    
  } catch (error) {
   console.log(error);     
  }
}




//function to handle delete
const handleDelete=async(event)=>{
    event.stopPropagation();
try {
  
  let messageid=event.target.closest('.row').children[1].id;
const params=messageid;
console.log(params);
dispatch(setDelete(messageid));
 const res= await mailDelete.call({},token,params);
 console.log(res);
if(res.status){
   const update=await getDraftMail.call({},token);
   console.log(update);
   if(update.status){
    const data = update.data.DraftMail;
        dispatch(setDraft(data));
   }

}
  
} catch (error) {
  
  console.log(error);
}
  
}

useEffect(()=>{
  
    fetchdata();
    
if(click){
    const autoDelete=async(id)=>{
        const res=await mailDelete.call({},token,id);
       console.log(res);
      dispatch(setDelete(id));
    }
     autoDelete(messageId);
    }
    
    },[click]);



  return (
    <Layout>
        <MailContainer>
       {draft.length?(draft?.map((message)=>(
        
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
        onClick={toggleStarredMail}>
        <StarBorder
          fontSize="small"/>
        </IconButton>
   )}  

   {message.important?(
    <IconButton onClick={toggleImportantMail} >
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
           <DeleteIcon color='error'/>
          </IconButton>
         </div>
         </Message>
         </Row>
         
       ))):(<h3>No Draft Message is saved</h3>)}
       <CustomizedDialogs open={open} handleClose={handleClose} value={value} setClicked={setClicked}/>
      
       </MailContainer>

    </Layout>
  )
}

export default Draft


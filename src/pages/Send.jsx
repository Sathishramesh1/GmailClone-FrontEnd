import React, { useEffect } from 'react'
import Layout from '../Layout'
import { Box, Checkbox, IconButton, styled } from '@mui/material';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/globalUrl';
import { setImportanttoggler, setSend } from '../components/redux-container/slices/emailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Star, StarBorder } from '@mui/icons-material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { setDelete } from '../components/redux-container/slices/emailSlice';
import { setStartoggler } from '../components/redux-container/slices/emailSlice';
import { MailContainer,Row,Icons,Message } from '../components/Styles/StyledComponent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Send() {
   
const state=useSelector((state)=>state.email);
const {send}=state;
const token=useSelector((state)=>state.email.user.token);
const dispatch=useDispatch();
const navigate=useNavigate();

const getSendMail=useApi(API_URLS.getSendEmail);
const toggler=useApi(API_URLS.toggleStarredEmail);
const mailDelete=useApi(API_URLS.deleteEmail);
const ImportantLabel=useApi(API_URLS.toggleImportantEmail);


const fetchdata=async()=>{  
  try {
    const res=await getSendMail.call({},token);
  if(res.status){
    const data=res.data.SendEmail;
  
  dispatch(setSend(data));
  console.log(data);
  console.log(send)
  } 
  } catch (error) {
    console.log(error);
  }
  
  }
  
    
useEffect(()=>{
  
  

fetchdata();

},[setDelete]);


const handleClick=(event)=>{

let messageid=event.target.id;

if(messageid){
   navigate(`/send/${messageid}`)
}else{
  messageid=event.target.parentElement.id
 navigate(`/send/${messageid}`);
}

}

//
const toggleStarredMail=async(event)=>{
try {
  const messageid=event.target.closest('.row').children[1].id;
console.log(messageid);
const params=messageid  
  console.log(token,"jwt");
  dispatch(setStartoggler(params));
  console.log(...send);
  let res=await toggler.call({},token,params);
  console.log(res);
  
} catch (error) {
 console.log(error);     
}
}

//function to delete message
const handleDelete=async(event)=>{
try {
  
  let messageid=event.target.closest('.row').children[1].id;
const params=messageid;
console.log(params);
dispatch(setDelete(messageid));

 const res= await mailDelete.call({},token,params);
 console.log(res);
if(res.status){
   const update=await getSendMail.call({},token);
   if(update.status){
    const data = update.data.SendEmail;
        dispatch(setSend(data));
   }
}
} catch (error) { 
  console.log(error);
}
}

const toggleImportantMail=async(event)=>{
  try {
    const messageid=event.target.closest('.row').children[1].id;
  console.log(messageid);
  const params=messageid  
    console.log(token,"jwt");
    dispatch(setImportanttoggler(params));
    console.log(...send);
    let res=await ImportantLabel.call({},token,params);
    console.log(res);
    
  } catch (error) {
   console.log(error);     
  }

}

  return (
    <Layout>
       <MailContainer>
       {send.length>0?(send?.map((message)=>(
        
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
         <div>{message?.subject?(message.subject):("")}</div>
         <div>{message.date?.slice(0,10)}</div>
         <div >

          <IconButton onClick={handleDelete} className='delete'>
           <DeleteIcon color='error'/>
          </IconButton>
         </div>
         </Message>
        
         </Row>
         
       ))):(<h3>No Messages iN Your send box</h3>)}
      
       </MailContainer>
    </Layout>
  )
}

export default Send


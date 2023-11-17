import React, { useEffect } from 'react'
import Layout from '../Layout';
import { Star, StarBorder } from '@mui/icons-material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import { Box, Checkbox, IconButton, styled } from '@mui/material';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/globalUrl';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setImportanttoggler, setStarred, setStartoggler } from '../components/redux-container/slices/emailSlice';
import { setDelete } from '../components/redux-container/slices/emailSlice';
import { MailContainer,Row,Icons,Message } from '../components/Styles/StyledComponent';




function Starred() {

const state=useSelector((state)=>state.email);
const {starred}=state;
const token=useSelector((state)=>state.email.user.token);
const dispatch=useDispatch();
const navigate=useNavigate();

const getStarredMail=useApi(API_URLS.getStarredEmail);
const toggler=useApi(API_URLS.toggleStarredEmail);
const mailDelete=useApi(API_URLS.deleteEmail);
const ImportantLabel=useApi(API_URLS.toggleImportantEmail);





const handleClick=(event)=>{

let messageid=event.target.id;

if(messageid){
   navigate(`/starred/${messageid}`)
}else{
  messageid=event.target.parentElement.id
 navigate(`/starred/${messageid}`);
}

}




//function to handle to delete
const handleDelete=async(event)=>{
  event.stopPropagation();
try {
  
  let messageid=event.target.closest('.row').children[1].id;
const params=messageid;
console.log(params);

 const res= await mailDelete.call({},token,params);
 
 dispatch(setDelete(messageid));

 console.log(res);
if(res.status){
   const update=await getStarredMail.call({},token);
   if(update.status){
    const data = update.data.filteredStarredEmails[0]?.starredEmails;
    
    dispatch(setStarred(data))
   }

}
  
} catch (error) {
  
  console.log(error);
}
  
}
const fetchdata=async()=>{  
  try {
    const res=await getStarredMail.call({},token);
    console.log(res);;
  if(res.status){
  const data=res.data.filteredStarredEmails[0]?.starredEmails
  
  dispatch(setStarred(data));
  }
    
  } catch (error) {
    console.log(error);
  }
  
  }

useEffect(()=>{
  
  
fetchdata();

},[]);

//function star toggling
const toggleStarredMail=async(event)=>{

  try {
   
    const messageid=event.target.closest('.row').children[1].id;
    console.log(messageid);
    const params=messageid  
    console.log(token,"jwt");
    dispatch(setStartoggler(params));
    let res=await toggler.call({},token,params);
    fetchdata();
    console.log(res);
    
  } catch (error) {
   console.log(error);     
  }
  }

  //function handle label important
const toggleImportantMail=async(event)=>{
  try {
    const messageid=event.target.closest('.row').children[1].id;
  console.log(messageid);
  const params=messageid  
   
    dispatch(setImportanttoggler(params));
    
    let res=await ImportantLabel.call({},token,params);
    fetchdata();
    console.log(res);
    
  } catch (error) {
   console.log(error);     
  }


}

  

  return (
    <Layout>
      <MailContainer>
       {starred?(starred?.map((message)=>(
        
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
    <IconButton onClick={toggleImportantMail} >
    <LabelImportantIcon
    style={{   color: "#FADA5E" }}
   />
   </IconButton>):(
    <IconButton onClick={toggleImportantMail}>
    <LabelImportantOutlinedIcon

    />
    </IconButton>
   )}
         </Icons>
          <Message  id={message._id}  >
          <div >{message.sender_name||message.reciver_name}</div>
         <div>{message.subject}</div>
         <div>{message.date?.slice(0,10)}</div>
         <div >

          <IconButton onClick={handleDelete} className='delete'>
           <DeleteIcon color='error' />
          </IconButton>
         </div>
         </Message>
        
         </Row>
         
       ))):(<h3>No Messages is Starred Yet</h3>)}
      

       </MailContainer>

        
    </Layout>
  )
}

export default Starred


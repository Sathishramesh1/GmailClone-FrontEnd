import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MailForm from './MailForm';
import useApi from '../hook/useApi';
import { API_URLS } from '../service/globalUrl';
import { useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    justifyContent:'space-between'
  },
}));



export default function CustomizedDialogs(props) {

const [datafromChild,setdatafromChild]=useState({
      to:'',
      subject:'',
      content:'',
      attachment:'',
});

const handlex=()=>{
  
   props.handleClose();
}  

const Save=useApi(API_URLS.saveDraftEmails);

const saveDraft = async(mail)=>{

  try {
    const token=localStorage.getItem('token');
    
    const res = await Save.call({...mail},token);
    
    if(res.status){
      console.log(res,"drt");
      
      toast.info(' Message saved as Draft!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    
  } catch (error) {
    console.log(error);
  }
}


//function close dialogue and save data
const check=()=>{
 
  handlex();//closing dialogue
  if(datafromChild.to||datafromChild.subject ||datafromChild.content || datafromChild.content){
  saveDraft(datafromChild);
  setdatafromChild({to:"",subject:'',content:"",attachment:""});
  }
}

  return (
    <div >
          <BootstrapDialog
        onClose={handlex}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        onClick={(e)=>e.stopPropagation()}
      >
        <DialogTitle sx={{ m: 0, p: 2,background:'#d4e0f1' }} id="customized-dialog-title">
          New Message
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={check}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <MailForm handlex={handlex} setdatafromChild={setdatafromChild} value={props.value} setClicked={props.setClicked}/>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}



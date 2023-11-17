import React, { useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { Box, Button, Container, ListItem } from '@mui/material';
import { Sidebar_icons } from './config/sidebar';
import CustomizedDialogs from './Dialog';
import { useNavigate } from 'react-router-dom';
import { SideIconWrapper,Compose,ComposeWrapper,FeaturesWrapper } from './Styles/StyledComponent';

function SideBarIcons() {
    
  const navigate=useNavigate();
const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    
    setOpen(false);
  };

  //function to handle naviagtion in sidebar
const handleNavigate=(elementname)=>{
 navigate(`/${elementname}`);

}
    

  return (
    <SideIconWrapper>
       <ComposeWrapper>
       <Button  size='large' onClick={ handleClickOpen}  >
        <Compose>
        <CreateIcon/>
          Compose
          <CustomizedDialogs open={open} handleClose={handleClose}  />
        </Compose>
        </Button>
        
       </ComposeWrapper>
       <FeaturesWrapper>
        {Sidebar_icons.map((element)=>(
            <ListItem key={element.name} onClick={()=>handleNavigate(element.name)} >
              
            <element.icon sx={{paddingRight:"1em"}}>
            </element.icon>
            {element.title}
            
            
            </ListItem>
        ))}

       </FeaturesWrapper>

    </SideIconWrapper>
  )
}

export default SideBarIcons


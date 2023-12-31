import { createSlice } from "@reduxjs/toolkit";

//creating cartslice

export const emailSlice=createSlice({
    name:'email',
    initialState:{user:{
        token:localStorage.getItem('token')||null,
        email:null
    },inbox:[],send:[],draft:[],trash:[],
starred:[],
important:[]
},
    reducers:{
        
      //method to set token from api
        setToken:(state,action)=>{
            state.user.token=action.payload
            return
        },
        setEmail:(state,action)=>{
           state.user.email=action.payload
           console.log(action.payload);
           return
        },
        //method to remove token
        removeToken:(state)=>{
          state.user.token=null;
          
          return

        },
        
        //method for inbox mail
        setInbox:(state,action)=>{
    
        action.payload?.forEach(element => {
             state.inbox.every((msg)=>element?._id!==msg?._id) ? state.inbox.push(element):null 
            
        });
    },

     //method for sendbox mail
       setSend:(state,action)=>{

        action.payload.forEach(element => {
            state.send.every((msg)=>element._id!==msg._id) ? state.send.push(element):null 
           
       });

       },

    //function to delete
     setDelete:(state,action)=>{
     
  // If the message is found, filter it out and return a new state object
  if (state.send.some((message)=>message._id==action.payload)) {
    const updatedSend = state.send.filter((message) => message._id !== action.payload);
    const updatedStarred = state.starred?.filter((message) => message._id !== action.payload);
    const updatedImportant = state.important?.filter((message) => message._id !== action.payload);
    return {
      ...state,
      send: updatedSend,
      starred:updatedStarred,
      important:updatedImportant
    };
  }else if(state.inbox.some((message)=>message._id==action.payload)){
    const updatedInbox = state.inbox.filter((message) => message._id !== action.payload);
    const updatedStarred = state.starred?.filter((message) => message._id !== action.payload);
    const updatedImportant = state.important?.filter((message) => message._id !== action.payload);
   
    return {
      ...state,
      inbox: updatedInbox,
      starred:updatedStarred,
      important:updatedImportant
    };

  }else if(state.draft.some((message)=>message._id==action.payload)){
    const updatedDraft = state.draft?.filter((message) => message._id !== action.payload);
    const updatedStarred = state.starred?.filter((message) => message._id !== action.payload);
    const updatedImportant = state.important?.filter((message) => message._id !== action.payload);
   
    return {
      ...state,
      draft: updatedDraft,
      starred:updatedStarred,
      important:updatedImportant
    };

  }else if(state.trash.some((message)=>message._id==action.payload)){
    const updatedtrash = state.trash.filter((message) => message._id !== action.payload);

    return {
      ...state,
       trash:updatedtrash
    }

  }

//   If the message is not found, return the unchanged state
  return state;

 },
         
 //method for draft message
    setDraft:(state,action)=>{
    action.payload.forEach(element => {
    state.draft.every((msg)=>element._id!==msg._id) ? state.draft.push(element):null     
       });

       },

       setStarred:(state,action)=>{

        const updatedStarred=action.payload
            
          return {...state,starred:updatedStarred}

       },
       setImportant:(state,action)=>{
       
        const updatedImportant=action.payload
            
          return {...state,important:updatedImportant}

       },

       setTrash:(state,action)=>{

       const updatedtrash=action.payload
       return {...state,trash:updatedtrash}
         
    

      
      },

  //method for star marking      
  setStartoggler:(state,action)=>{
        
   if (state.send.some((message)=>message._id==action.payload)) {
        const updatedSend = state.send.map(message => {
          if (message._id === action.payload) {
        // Toggle the starred property for the matching message
            return { ...message, starred: !message.starred };
      }
         return message; // Return unchanged messages
    });
         const updatedStarred = state.starred?.map(message => {
         if (message._id === action.payload) {
        // Toggle the starred property for the matching message
         return { ...message, starred: !message.starred };
      }
      return message; // Return unchanged messages
    });
   
    // Return a new state object with the updated 'send' array
    return { ...state, send: updatedSend,starred:updatedStarred, };
  }else if(state.inbox.some((message)=>message._id==action.payload)){
    const updatedInbox = state.inbox.map(message => {
      if (message._id === action.payload) {
        // Toggle the starred property for the matching message
        return { ...message, starred: !message.starred };
      }
      return message; // Return unchanged messages
    });
    const updatedStarred = state.starred?.map(message => {
      if (message._id === action.payload) {
        // Toggle the starred property for the matching message
        return { ...message, starred: !message.starred };
      }
      return message; // Return unchanged messages
    });
   
    return { ...state, inbox: updatedInbox ,starred:updatedStarred};

  }else if(state.draft.some((message)=>message._id==action.payload)){
    const updatedDraft = state.draft.map(message => {
      if (message._id === action.payload) {
        // Toggle the starred property for the matching message
        return { ...message, starred: !message.starred };
      }
      return message; // Return unchanged messages
    });
    const updatedStarred = state.starred.map(message => {
      if (message._id === action.payload) {
        // Toggle the starred property for the matching message
        return { ...message, starred: !message.starred };
      }
      return message; // Return unchanged messages
    });
    return { ...state, draft: updatedDraft,starred:updatedStarred };

  }

//   If the message is not found, return the unchanged state
  return state;

       },


   //method for labelling message as important
  setImportanttoggler:(state,action)=>{

      if (state.send.some((message)=>message._id==action.payload)) {
          const updatedSend = state.send.map(message => {
            if (message._id === action.payload) {
              // Toggle the starred property for the matching message
              return { ...message, important: !message.important };
            }
            return message; // Return unchanged messages
          });
       
      const updatedImportant = state.important?.map(message => {
        if (message._id === action.payload) {
          // Toggle the starred property for the matching message
          return { ...message, important: !message.important };
        }
        return message; // Return unchanged messages
      });
     

        // Return a new state object with the updated 
          return { ...state,send:updatedSend,important:updatedImportant };
        }
    else if(state.inbox.some((message)=>message._id==action.payload)){
          const updatedInbox = state.inbox.map(message => {
            if (message._id === action.payload) {
              // Toggle the starred property for the matching message
              return { ...message, important: !message.important };
            }
            return message; // Return unchanged messages
          });
       
      const updatedImportant = state.important?.map(message => {
        if (message._id === action.payload) {
          // Toggle the starred property for the matching message
          return { ...message, important: !message.important };
        }
        return message; // Return unchanged messages
      });
      
          return { ...state, inbox: updatedInbox,important:updatedImportant };
      
        }
    else if(state.draft.some((message)=>message._id==action.payload)){
          const updatedDraft = state.draft.map(message => {
            if (message._id === action.payload) {
              // Toggle the starred property for the matching message
              return { ...message, important: !message.important };
            }
            return message; // Return unchanged messages
          });
      
      const updatedImportant = state.important?.map(message => {
        if (message._id === action.payload) {
          // Toggle the starred property for the matching message
          return { ...message, important: !message.important };
        }
        return message; // Return unchanged messages
      });
          return { ...state, draft:updatedDraft,important:updatedImportant};
        }
      //   If the message is not found, return the unchanged state
        return state;
       }
    },    

});

export const {setToken,setInbox,setSend,setDelete,setDraft,setStarred, setImportant,setStartoggler,setImportanttoggler, 
  setTrash,removeToken,setEmail
}=emailSlice.actions
export default emailSlice.reducer;
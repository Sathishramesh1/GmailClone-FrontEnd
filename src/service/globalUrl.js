export const API_URLS = {
  compose: {
    endpoint: "mail/send",
    method: "POST",
  },
  getInboxEmail: {
    endpoint: "mail/inbox",
    method: "GET",
  },
  getSendEmail:{
      endpoint: "mail/send",
      method: "GET",

  },
  getDraftEmail:{
      endpoint: "mail/getdraft",
      method: "GET",

  },
  getStarredEmail:{
      endpoint: "mail/starred",
      method: "GET",

  },
  getImportantEmail:{
    endpoint: "mail/important",
    method: "GET",

},
  getTrashEmail:{
      endpoint: "mail/trash",
      method: "GET",

  },
  saveDraftEmails: {
    endpoint: "mail/draft",
    method: "POST",
  },
  deleteEmail: {
    endpoint: "mail/delete",
    method: "DELETE",
  },
  toggleStarredEmail:{
    endpoint: "mail/starred",
    method: "POST",
  },
  toggleImportantEmail:{
    endpoint: "mail/important",
    method: "POST",
  },
  uploadFile:{
    endpoint: "mail/upload",
    method: "POST",

  },
  getLogin:{
    endpoint:"api/login",
    method:'POST'
  },
  getRegister:{
    endpoint:"api/register",
    method:'POST'

  },
  getForget:{
    endpoint:"api/forget",
    method:'POST'
  },
  getReset:{
    endpoint:"api/reset",
    method:'POST'

  },
  removetrash:{
    endpoint:"mail/trashDelete",
    method:'DELETE'
  }
  
};

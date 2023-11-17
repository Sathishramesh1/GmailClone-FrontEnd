import React, { lazy, Suspense } from 'react';
import './App.css'
import { BrowserRouter, Navigate, Route,  Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {  useSelector } from 'react-redux';
import ErrorPage from './pages/ErrorPage';




const Inbox = lazy(() => import('./pages/Inbox'));
const SignUp=lazy(() => import('./pages/Register'));
const SignIn=lazy(() => import('./pages/Login'));
const Send=lazy(() => import('./pages/Send'));
const Draft=lazy(() => import('./pages/Draft'));
const Starred=lazy(() => import('./pages/Starred'));
const Important=lazy(() => import('./pages/Important'));
const Trash=lazy(() => import('./pages/Trash'));
const Forget=lazy(() => import('./pages/Forget'));
const Reset=lazy(() => import('./pages/Reset'));
const SingleMail=lazy(() => import('./pages/SingleMail'));





function App() {

const token=useSelector((state)=>state.email.user.token);



  return (
    <div>
     
     <BrowserRouter>
      <Routes>

      <Route path='/register' element={<Suspense ><SignUp/></Suspense>}/>
        <Route exact path='/' element={<Suspense><SignIn/></Suspense>}/>
        <Route  path='/inbox' element={token?<Suspense ><Inbox/></Suspense>:<Navigate to='/'></Navigate>} >
        </Route>
        <Route path='/:type/:messageid' element={<SingleMail/>}></Route>

      <Route  path='/send' element={<Suspense><Send/></Suspense>} />
      <Route path='/draft' element={<Suspense><Draft/></Suspense>} />
      <Route  path='/starred' element={<Suspense><Starred/></Suspense>} />
      <Route  path='/important'  element={<Suspense><Important/></Suspense>} />
      <Route path='/trash' element={<Suspense><Trash/></Suspense>}/>
        <Route  path='/forget' element={<Suspense><Forget/></Suspense>}/>
        <Route  path='/reset/:resetToken' element={<Suspense><Reset/></Suspense>}/>
        
        <Route path='*' Component={ErrorPage}/>
      </Routes>
       </BrowserRouter>
       <ToastContainer/>
       
       </div>
  )
}

export default App

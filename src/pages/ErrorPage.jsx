import React from 'react'
import Layout from '../Layout'
import { MailContainer } from '../components/Styles/StyledComponent'
import { styled } from '@mui/material'

function ErrorPage() {
  return (
   <Layout>
   <MailContainer>
    <h1>page not found</h1>
    <ErrorContainer>
   
    <img src='https://cdn.vectorstock.com/i/1000x1000/91/19/flat-modern-design-of-error-page-2-vector-47939119.webp' alt='error-page-image'/>
    </ErrorContainer>
    </MailContainer>

   </Layout>
  )
}

export default ErrorPage

const ErrorContainer=styled("div")({

  display:'flex',
  placeItems:'center',
  width:'100%',
  height:'50%',
  
  "&>img":{
    objectFit:'contain',
    width:'100%',
    height:'100%'

  }
})
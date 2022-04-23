import { ApolloError } from '@apollo/client'
import React from 'react'
import Loading from '../shared/Loading'
import './Styling.css'

interface IProps {
    loading: boolean
    error: ApolloError | undefined
    icon: React.ReactNode
    text: string
    children: React.ReactNode
}
const GenericUI = (props: IProps) => {
    const {loading, error, icon, text, children} = props
  return (
    <div className='card'>
    <div>{icon}</div>
    <Loading loading={loading} error={error}>
      <div>{children}</div>
    </Loading>
    <div className='card-text'>{text}</div>
  </div>
   
    
  )
}

export default GenericUI;

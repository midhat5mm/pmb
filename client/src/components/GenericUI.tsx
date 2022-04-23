import { ApolloError } from '@apollo/client'
import React from 'react'
import Loading from '../shared/Loading'
import './Styling.css'

interface IProps {
    loading: boolean
    error: ApolloError | undefined
    icon: string
    text: string
    children: React.ReactNode
}
const GenericUI = (props: IProps) => {
    const {loading, error, icon, text, children} = props
  return (
    <div className='card'>
      <Loading loading={loading} error={error}>
          <div>{icon}</div>
          <div>{children}</div>
          <div>{text}</div>
      </Loading>
    </div>
  )
}

export default GenericUI;

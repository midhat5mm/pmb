import { ApolloError } from '@apollo/client'
import React from 'react'
import Loading from '../shared/Loading'

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
    <Loading loading={loading} error={error}>
        <>{icon}</>
        <>{children}</>
        <>{text}</>
    </Loading>
  )
}

export default GenericUI;

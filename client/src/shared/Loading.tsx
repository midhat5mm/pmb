import { ApolloError } from '@apollo/client'
import React from 'react'

interface IProps {
    loading: boolean
    error: ApolloError | undefined
    children: React.ReactNode
}

const Loading = (props: IProps) => {
    const {loading, error, children} = props

    if(loading){
        return <>Loading....</>
    }else if (!!error){
        console.log("EEEEEEEEEEEEE", error)
        return <>Error</>
    }else {
        return <>{children}</>
    }
}

export default Loading
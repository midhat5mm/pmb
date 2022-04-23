import { ApolloError } from '@apollo/client'
import React from 'react'
import { Spin } from 'antd';

interface IProps {
    loading: boolean
    error: ApolloError | undefined
    children: React.ReactNode
}

const Loading = (props: IProps) => {
    const {loading, error, children} = props

    if(loading){
        return <Spin />
    }else if (!!error){
        console.log("EEEEEEEEEEEEE", error)
        return <>Error</>
    }else {
        return <>{children}</>
    }
}

export default Loading
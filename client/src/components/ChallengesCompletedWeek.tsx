import React from 'react'
import Loading from '../shared/Loading'

interface IProps {
    icon: string
    text: string
}
const ChallengesCompletedWeek = (props: IProps) => {
    const {icon, text} = props

  return (
    <Loading loading={false} error={undefined}>
        <>{icon}</>
        <>{"testData"}</>
        <>{text}</>
    </Loading>
  )
}

export default ChallengesCompletedWeek;
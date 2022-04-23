import React from 'react'
import { gql, useQuery } from '@apollo/client';
import GenericUI from './GenericUI';

interface IProps {
    icon: string
    text: string
}
const queryChallengesCompletedWeek = gql`
  query challenges_completed_week($id: Int!) {
    challenges_completed_week(
            id: $id
    ) {
        count
    }
  }
`;

const ChallengesCompletedWeek = (props: IProps) => {
    const {icon, text} = props
    const { loading, error, data } = useQuery(queryChallengesCompletedWeek, {
      variables: {
        id: 1
      },
      fetchPolicy: "cache-and-network"
    });


  return (
    <>
      <GenericUI text={text} 
                loading={loading} 
                error={error}   
                icon={icon}
              >
                <>{<>{data?.challenges_completed_week?.count || 0}</>}</>
      </ GenericUI>
    </>
  )
}

export default ChallengesCompletedWeek;
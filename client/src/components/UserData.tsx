import React from 'react'
import { gql, useQuery } from '@apollo/client';
import GenericUI from './GenericUI';
import  ChallengesCompletedWeek  from './ChallengesCompletedWeek';
import moment from 'moment';

const userById = gql`
  query user($id: Int!) {
    user(
        where: {
            id: { _eq: $id}
        }
    ) {
        id,
        target_sat_score,
        sat_exam_date,
        total_time_spent
    }
  }
`;

interface QUserById {
  id: number
  target_sat_score: number
  sat_exam_date: Date
  total_time_spent : number
}

const renderDaysUntilExamData = (userData: QUserById) => {
    if (!userData?.sat_exam_date){
      return null;
    }

    const duration = moment.duration(moment(userData.sat_exam_date).diff(moment()));
    return <>{Math.floor(duration.asDays())}</>
}

const renderTargetSatScore = (userData: QUserById) => {
  if (!userData?.target_sat_score){
    return null;
  }

  return <>{Math.round(userData.target_sat_score/ 10) * 10}</>
}

const renderStudyTime = (userData: QUserById) => {
  if (!userData?.total_time_spent){
    return null;
  }

// const test = moment().add(userData.total_time_spent,'seconds')
//   return <>{Math.round(userData.target_sat_score/ 10) * 10}+</>
}

const UserData = () => {
    const { loading, error, data } = useQuery(userById, {
        variables: {
          id: 1
        },
        fetchPolicy: "cache-and-network"
      });

    const userData = data?.user?.[0]
    return (
      <>
        <GenericUI text="DAYS UNTIL EXAM" 
          loading={loading} 
          error={error}   
          icon="futja" 
        >
          <>{renderDaysUntilExamData(userData)}</>
        </ GenericUI>
        <GenericUI text="TARGET SAT SCORE" 
          loading={loading} 
          error={error}   
          icon="futja" 
        >
          <>{renderTargetSatScore(userData)}</>
        </ GenericUI>
        <ChallengesCompletedWeek text="CHALLENGES COMPLETED THIS WEEK" 
          icon="futja"
        />
        <GenericUI text="TOTAL STUDY TIME ONE EVERYDAE" 
          loading={loading} 
          error={error}   
          icon="futja" 
        >
          <>{renderStudyTime(userData)}</>
        </ GenericUI>
      </>
    )
}

export default UserData;
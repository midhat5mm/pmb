import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import { Row, Col, Button } from 'antd';
import GenericUI from './GenericUI';
import  ChallengesCompletedWeek  from './ChallengesCompletedWeek';
import './Styling.css'
import { useParams } from 'react-router-dom';


// const userById = gql`
//   query user($id: Int!) {
//     user(
//         where: {
//             id: { _eq: $id}
//         }
//     ) {
//         id,
//         target_sat_score,
//         sat_exam_date,
//         total_time_spent
//     }
//   }
// `;

const parentsData = gql`
  query parent_user($id: Int!) {
    parent_user( where: {parent_id: {_eq: $id}}, limit: 10){
        id
        user{
        id
        target_sat_score,
        sat_exam_date
        total_time_spent
        }
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

  const totalTIme = userData.total_time_spent;
  const totalHours = totalTIme / 3600
  const remaining  = totalTIme % 3600;

  const hours = totalHours < 10 ? `0${Math.floor(totalHours)}`: Math.floor(totalHours)
  const minutes = Math.floor(remaining/60)

  return <>{`${hours}: ${minutes} `}</>
}

const UserData = () => {
  const { id: userId } = useParams();

  const [selectedUserIndex, selectUserIndex] = useState(0);

    const { loading, error, data } = useQuery(parentsData, {
        variables: {
          id: userId
        },
        fetchPolicy: "cache-and-network"
      });
    const userData = data?.parent_user?.[selectedUserIndex]?.user


    return (
      <>
      {data?.parent_user?.map((user:any, index: number) => <Button onClick={() => selectUserIndex(index)}>User id:{user.user.id}</Button>)}
      <div className='container'>
        <Row >
          <Col span={12}>
            <GenericUI text="DAYS UNTIL EXAM" 
              loading={loading} 
              error={error}   
              icon="futja" 
            >
              <>{renderDaysUntilExamData(userData)}</>
            </ GenericUI>
          </Col>
          <Col span={12}>
            <GenericUI text="TARGET SAT SCORE" 
              loading={loading} 
              error={error}   
              icon="futja" 
            >
              <>{renderTargetSatScore(userData)}</>
            </ GenericUI>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <ChallengesCompletedWeek text="CHALLENGES COMPLETED THIS WEEK" 
              icon="futja"
            />
          </Col>
          <Col span={12}>
            <GenericUI text="TOTAL STUDY TIME ONE EVERYDAE" 
              loading={loading} 
              error={error}   
              icon="futja" 
            >
              <>{renderStudyTime(userData)}</>
            </ GenericUI>
          </Col>
        </Row>
      </div>
      </>
    )
}

export default UserData;
import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import { Row, Col, Button } from 'antd';
import GenericUI from './GenericUI';
import  ChallengesCompletedWeek  from './ChallengesCompletedWeek';
import './Styling.css'
import { useParams } from 'react-router-dom';
import { CalendarOutlined, ClockCircleOutlined, FireOutlined, TrophyOutlined } from '@ant-design/icons';

const iconStyle = { fontSize: '5vh'}
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
    return <div className='widget-result'>{Math.floor(duration.asDays())}</div>
}

const renderTargetSatScore = (userData: QUserById) => {
  if (!userData?.target_sat_score){
    return null;
  }

  return <div className='widget-result'>{Math.round(userData.target_sat_score/ 10) * 10}+</div>
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

  return <div><div className='widget-result'>{`${hours}:${minutes} `}</div><div className='widget-result-hours'> hrs</div></div>
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

      <div className='container'>
        <div className='users-toggle'>
          <h1>Toogle betwen users:</h1>
          <div>
            {data?.parent_user?.map((user:any, index: number) => <Button className='users-toggle-button' onClick={() => selectUserIndex(index)}>User id: {user.user.id}</Button>)}
          </div>
        </div>
        <Row >
          <Col span={12}>
            <GenericUI text="DAYS UNTIL EXAM" 
              loading={loading} 
              error={error}   
              icon={<CalendarOutlined style={iconStyle}/>}
            >
              <>{renderDaysUntilExamData(userData)}</>
            </ GenericUI>
          </Col>
          <Col span={12}>
            <GenericUI text="TARGET SAT SCORE" 
              loading={loading} 
              error={error}   
              icon={<FireOutlined style={iconStyle}/>}
            >
              <>{renderTargetSatScore(userData)}</>
            </ GenericUI>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <ChallengesCompletedWeek text="CHALLENGES COMPLETED THIS WEEK" 
              icon={<TrophyOutlined style={iconStyle}/>}
            />
          </Col>
          <Col span={12}>
            <GenericUI text="TOTAL STUDY TIME ONE EVERYDAE" 
              loading={loading} 
              error={error}   
              icon={<ClockCircleOutlined style={iconStyle}/>}
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
import moment from "moment";
import axios from "axios";


const executeHasuraRequest = async (variables, reqHeaders, query) => {
    try {
        const response = await axios.post("http://localhost:8080/v1/graphql", JSON.stringify({
            query,
            variables
        }));

          return response.data;
    }catch(e) {
        throw new Error(`Something went wrong error: ${e}`);
    }
  };


const HASURA_UPATE_USER = `
mutation ($id: Int!, $total_time_spent: bigint!) {
  update_user(where: {
      id:{
          _eq: $id
      }
    }, 
    _set: {
        total_time_spent: $total_time_spent
    }){
    returning{
      id
      total_time_spent
    }
  }
}
`;

const HASURA_QUERY_USER = `
query ($id: Int!) {
    user(
        where: {
            id: {
                _eq: $id
            }
      }
      ){
        id
        total_time_spent
      }
}
`;

export const  userTimeSpentController = async(req, res) => {
    const { old, new: newData } = req.body;
    const { user_id } = old;
 
    if (old.stop_time === newData.stop_time && old.completed_at_time === newData.completed_at_time) {
        // nothing to do in this case
        res.send(200);
    }

    const getDifferenceInSeconds = (oldDate, newDate) => {
        const duration = moment.duration(moment(newDate).diff(moment(oldDate)));
    
        return duration.asSeconds();
    }

    let oldDate;
    let newDate;
    // the logic can be wrong, still more things to be clarified, just guessing the logic behind it
    if (old.completed_at_time !== newData.completed_at_time){
        oldDate = old.completed_at_time;
        newDate = newData.completed_at_time;
    } else if (old.stop_time !== newData.stop_time){
        oldDate = old.stop_time;
        newDate = newData.stop_time;
    }
    
    const differenceInSeconds = getDifferenceInSeconds(oldDate, newDate);

    // fetch user
    const queryData = await executeHasuraRequest({ id: user_id }, req.headers, HASURA_QUERY_USER);
    const userTotalTimeSpent = queryData?.data?.user?.[0].total_time_spent
    if (!userTotalTimeSpent && userTotalTimeSpent !== 0){
        res.send(400);
    }

    // update user total_time_spent
    await executeHasuraRequest({ id: user_id, total_time_spent: userTotalTimeSpent +  differenceInSeconds  }, req.headers, HASURA_UPATE_USER);

    res.send(200);
}




const USER_CHALLENGES_COMPLETED_WEEK = `
query ($id: Int!, $comparisonCompletedTime: timestamptz!) {
    challenge_user(where: {
        user_id: {
          _eq: $id
        },
        completed_at_time: {
          _gte: $comparisonCompletedTime
        }
      }){
        id
        completed_at_time
      }
}
`;

const DAYS_BEOFRE = 7;
export const challengesCompletedController = async(req, res) => {
    const { id: userId } = req.body;

    if(!userId){
        res.send(400);
    }

    const beforeComparisonTime = moment().subtract(DAYS_BEOFRE,'d').format('YYYY-MM-DDTHH:mm:ss')

    const queryData = await executeHasuraRequest({ 
        id: userId, 
        comparisonCompletedTime:  beforeComparisonTime
    }, req.headers, USER_CHALLENGES_COMPLETED_WEEK);


    const challengesCompleted = Array.isArray(queryData?.data?.challenge_user) && queryData.data.challenge_user 

    if (!challengesCompleted){
        res.send(400);
    }

    res.status(200).json({count: challengesCompleted.length})
}
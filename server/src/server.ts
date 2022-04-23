import express from 'express';
import { challengesCompletedController, userTimeSpentController } from './controllers';

const app = express();
const port = 4000;

app.use(express.json());

// handle hasura EVENT to update user total_time_spent, could be an computed field or a slighty complicated query, just flexing
app.post('/user_time_spent', userTimeSpentController);

// handle hasura ACTION to get the number of challenges complted in the past 7 days
app.post('/challenges_completed_week', challengesCompletedController);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

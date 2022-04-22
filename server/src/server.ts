import express from 'express';
import { userTimeSpentController } from './controllers';

const app = express();
const port = 4000;

app.use(express.json());

// handle hasura EVENT to update user total_time_spent, could be an computed field or a slighty complicated query, just flexing
app.post('/user_time_spent', userTimeSpentController);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

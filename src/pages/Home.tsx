// src/App.tsx
import React from 'react';
import { Button, Typography, Card, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

async function fetchTasks(): Promise<[any]> {
  const resp = axios.get('http://localhost:8000/tasks').then(
    (response) => {
      return response.data;
    }
  ).catch((err) => {
    console.error(err);
  });

  return await resp;
}

const Home: React.FC = () => {
  const [taskData, setTaskData] = React.useState<any[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchTasks().then((data) => {
      setTaskData(data);
    });
  }, []);

  const HandleViewTask = (task: any) => {
    // Navigate to /task/:id
    const id = task.id;
    navigate(`/task/${id}`, { state: { task } });
  };

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Welcome to Deskly
      </Typography>
      <Grid container spacing={4}>
        {taskData.map((task: any) => (
          <Grid item key={task.id}>
            <Card>
              <Typography variant="h5">{task.title}</Typography>
              <Typography>{task.priority}</Typography>
              <Typography>{task.status}</Typography>
              <Button variant="contained" color="primary" onClick={() => HandleViewTask(task)}>
                View and edit task
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;

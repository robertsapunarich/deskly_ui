// src/App.tsx
import React from 'react';
import { Button, Typography, Card, Grid } from '@mui/material';
import axios from 'axios';

async function fetchTasks(): Promise<[any]> {
  const resp = axios.get('http://localhost:8000/tasks').then(
    (response) => {
      console.log(response.data);
      return response.data;
    }
  ).catch((err) => {
    console.error(err);
  });

  return await resp;
}

const Home: React.FC = () => {
  const [cardData, setCardData] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchTasks().then((data) => {
      setCardData(data);
    });
  }, []);

  const handleViewTicket = (key: string) => {
    // Navigate to /task/:key
    window.location.href = `/task/${key}`;
  };

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Welcome to Deskly
      </Typography>
      <Grid container spacing={4}>
        {cardData.map((card: any) => (
          <Grid item key={card.id}>
            <Card>
              <Typography variant="h5">{card.title}</Typography>
              <Typography>{card.priority}</Typography>
              <Typography>{card.status}</Typography>
              <Button variant="contained" color="primary" onClick={() => handleViewTicket(card.id)}>
                View and edit ticket
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;

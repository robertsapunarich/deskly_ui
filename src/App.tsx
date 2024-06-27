// src/App.tsx
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Container, CssBaseline, Link, ThemeProvider, Toolbar, Typography} from '@mui/material';
import Home from './pages/Home';
import TaskDetail from './pages/TaskDetail';
import Box from '@mui/material/Box';

import theme from './theme';


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

const App: React.FC = () => {
  const [cardData, setCardData] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchTasks().then((data) => {
      setCardData(data);
    });
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Deskly
              <Link href="/" color="inherit" sx={{paddingLeft: "2rem"}}>Home</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <AppBar position="static">
      </AppBar>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:task_id" element={<TaskDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

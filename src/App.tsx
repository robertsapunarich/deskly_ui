// src/App.tsx
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TaskDetail from './pages/TaskDetail';

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

  const handleViewTicket = (key: string) => {
    // Navigate to /task/:key
    window.location.href = `/task/${key}`;
  };

  return (
    <div>
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

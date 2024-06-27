// src/App.tsx
import React from 'react';
import { Button, Typography, Card, Grid } from '@mui/material';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const TaskDetail: React.FC = () => {  
  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Task Detail
      </Typography>
    </div>
  );
}


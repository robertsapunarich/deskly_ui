import React from 'react';
import { Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Task } from '@mui/icons-material';
import axios from 'axios';


interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
}

const TaskDetail: React.FC = () => {  
  const location = useLocation();
  let task: Task = location.state.task as Task;

  const [formData, setFormData] = React.useState<Task>({
    id: task.id,
    title: task.title,
    priority: task.priority,
    status: task.status,
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting form data: ", formData);

    // Update task
    axios.put(`http://localhost:8000/tasks/${task.id}`, formData).then((response: any) => {
      console.log(response.data);
      task = response.data;
    }).catch((err: any) => {
        console.error(err);
      }
    );
  };

  
  const handleInputChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name as string]: value,
    }));
  }
  
  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Task Detail
      </Typography>
      <br />
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleSelectChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleSelectChange}
              >
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default TaskDetail;


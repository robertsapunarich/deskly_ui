import React from 'react';
import { Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormLabel} from '@mui/material';
import { Form, useLocation } from 'react-router-dom';
import { Task } from '@mui/icons-material';
import axios from 'axios';

interface Assignee {
  id: number;
  email: string;
}

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  assignee: Assignee;
}

async function fetchAssignees(): Promise<Assignee[]> {
  const resp = axios.get('http://localhost:8000/assignees').then(
    (response) => {
      return response.data;
    }
  ).catch((err) => {
    console.error(err);
  });

  return resp;
};

const TaskDetail: React.FC = () => {  
  const [assignees, setAssignees] = React.useState<Assignee[]>([]);
  React.useEffect(() => {
    fetchAssignees().then((data) => {
      setAssignees(data);
    });
  }, []);

  const location = useLocation();
  let task: Task = location.state.task as Task;
  let assignee: Assignee = location.state.task.assignee as Assignee;

  const [formData, setFormData] = React.useState<Task>({
    id: task.id,
    title: task.title,
    priority: task.priority,
    status: task.status,
    assignee: task.assignee,
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update task
    axios.put(`http://localhost:8000/task/${task.id}`, formData).then((response: any) => {
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

  const handleSelectStatusOrPriorityChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name as string]: value,
    }));

  }
  
  const handleSelectAssigneeChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    const assignee = assignees.find((assignee) => assignee.id === parseInt(value));
    if (assignee === undefined) {
      console.error("Assignee not found");
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      assignee: assignee,
    }));
  };
  
  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Task Detail
      </Typography>
      <br />
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormLabel>Title</FormLabel>
            <TextField
              fullWidth
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Priority</FormLabel>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleSelectStatusOrPriorityChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleSelectStatusOrPriorityChange}
              >
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Assignee</FormLabel>
              <Select
                name="assignee"
                value={formData.assignee.id.toString()}
                onChange={handleSelectAssigneeChange}
              >
                {assignees.map((assignee) => (
                  <MenuItem key={assignee.id} value={assignee.id}>
                    {assignee.email}
                  </MenuItem>
                ))}
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


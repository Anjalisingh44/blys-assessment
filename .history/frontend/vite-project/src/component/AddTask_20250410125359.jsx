//AddTask is operated here and form UI is taken from antdesign 
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice' // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
  const {title,description} = values;

    if (!title || !description) {
      alert('Please fill in both fields');
      return;
    }

    try {
      // Dispatch action to add task
      await dispatch(createTask({ title, description })).unwrap();

      // Reset the form
      setTitle('');
      setDescription('');

      // Navigate to /task after success
      navigate('/dashboard/task');
    } catch (error) {
      alert('Failed to add task: ' + error);
    }
  };

  return (
    <div>
      <h2>Create a New Task</h2>
      <Form
        name="add-task"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTask;

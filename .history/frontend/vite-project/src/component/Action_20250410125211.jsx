// Delete and get task is operated here , table UI is being used from antdesign 
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, removeTask } from '../features/task/taskSlice';
import { Space, Table, Button, message, Popconfirm } from 'antd';
import { MdDeleteForever } from "react-icons/md";
import {Link} from "react-router-dom"


const Action = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  

  // Fetch tasks on load
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);


  // Handle deleting a task
  const handleDelete = (id) => {
    dispatch(removeTask(id))
      .then(() => message.success('Task deleted successfully!'))
      .catch(() => message.error('Failed to delete task.'));
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<MdDeleteForever />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: '16px' }}>
      <Link to="/dashboard/addtask" className='text-blue-500 hover:underline'> AddTask</Link>
      </Space>

      {/* Render error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Render loading indicator */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table columns={columns} dataSource={tasks} rowKey="id" />
      )}
    </div>
  );
};

export default Action;

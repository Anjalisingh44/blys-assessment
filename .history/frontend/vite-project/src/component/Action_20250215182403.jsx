import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Space, Table, Button, message, Popconfirm  } from 'antd';
import { MdDeleteForever } from "react-icons/md";

const API_URL = 'http://localhost:5000/api/form/getall';


const Action = () => {
  const [form, setform] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      
      setform(response.data);
    } catch (error) {
      console.error(error.message);
      message.error('Failed to fetch products.');
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/form/delete-form/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    // Update state after deletion
    setform(form.filter((form) => form._id !== id));
      message.success('Product deleted successfully!');
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error('Failed to delete product. Please try again.');
    }
  };







const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Course',
    dataIndex: 'courseName',
    key: 'course',
  },
  {
    title: 'Payment',
    dataIndex: 'paymentMethod',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div style={{ display: 'flex', gap: '10px' }}>
      <Button
        type="primary"
        onClick={() => navigate(`/update/${record._id}`)}
      >
        Update
      </Button>
      <Popconfirm
        title="Are you sure you want to delete this product?"
        onConfirm={() => handleDelete(record._id)}
        okText="Yes"
        cancelText="No"
      >
   <Button danger>Delete </Button>
      </Popconfirm>
    </div>
  ),
},
];
useEffect(()=>{
    fetchProducts()
},[])


return( <Table columns={columns} dataSource={form}/>
)
}
export default Action;

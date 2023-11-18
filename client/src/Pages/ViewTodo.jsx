import React, { useEffect, useState } from 'react';
import '../Styles/ViewTodo.css';
import { useNavigate } from 'react-router-dom';
import { GLOBAL_URL, getAllData } from '../ConfigData';
import { useToast } from '@chakra-ui/react';

export default function ViewTodo() {

    const [userData, setUserData ] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();

    const fetchAllData = async() => {
        const response = await getAllData();
        setUserData(response.data.data);
    }
    useEffect(() => {
        fetchAllData();
    },[])

  return (
    <div className='view-todo-con'>
        <h2 className='view-title'>My Todos</h2>
        <div className='content-map'>
                {
                    userData&&
                    userData.map(row => (
                        <div className="container1">
                            <div className="content1">
                            <div key={row._id}>
                                <h2 className='content-map-title'>
                                    {row.title}
                                </h2>
                                <p className='content-map-title2'>
                                    😊 {row.description}.
                                </p>
                                <p className='content-map-title2'>
                                    ⏲️ {row.dueDate}.
                                </p>
                                <div className='content1-btn-con'>
                                    <button
                                    className="content1-edit-btn"
                                    onClick={() => navigate(`/toDo/${row._id}`)} 
                                    >Edit</button>
                                    <button
                                        className="content1-del-btn"
                                        onClick={()=> {
                                            fetch(`${GLOBAL_URL}/toDo/${row._id}`,{
                                              method: "DELETE",
                                            })
                                            .then(toast({
                                                title: "Todo deleted successful",
                                                status: "error",
                                                duration: 5000,
                                                isClosable: true,
                                                position: "top-end",
                                            }))
                                            .then(() => fetchAllData())
                                            navigate('/home')
                                          }}
                                    >
                                    Delete
                                    </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        )
                    )
                }
            </div>
    </div>
  )
}

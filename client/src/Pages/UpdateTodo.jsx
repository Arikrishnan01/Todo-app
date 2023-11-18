import React, { useEffect, useState } from 'react';
import '../Styles/UpdateTodo.css';
import { useNavigate, useParams } from 'react-router-dom';
import { GLOBAL_URL } from '../ConfigData';
import { Button, Input } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

let initialObject = {
    title: "",
    description: "",
    dueDate: ""
  };
export default function UpdateTodo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formState, setForm] = useState(initialObject);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
  
    const inputHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setForm({ ...formState, [name]: value });
    };

     //getById for update
  const getById = () => {
    fetch(`${GLOBAL_URL}/toDo/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((byId) => {
        setForm(byId.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getById();
  }, []);

  //update the existing data
  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const updateById = {
      title: formState.title,
      description: formState.description,
      dueDate: formState.dueDate,
    };

    fetch(`${GLOBAL_URL}/toDo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateById),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data)
        toast({
          title: "Todo updated successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-end",
      });
        // Handle the response data in your front-end code
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        // Handle errors here
      });
  }

  return (
    <div className="containers">
        <h1 className='edit-title'>Edit the exist Todo</h1>
        <div className="contents content-con2">
             <Input
                    name='title'
                    className='content-inputs con2'
                    placeholder='Enter Your todo title'
                    value={formState.title}
                    onChange={inputHandler}
                />
                <Input
                    name='description'
                    className='content-inputs con3'
                    placeholder='Enter Your todo discription'
                    value={formState.description}
                    onChange={inputHandler}
                />
                <Input
                    name='dueDate'
                    type="date" 
                    className='content-inputs con4'
                    placeholder='Enter Your todo duedate'
                    value={formState.dueDate}
                    onChange={inputHandler}
                />

            <Button 
                className='con5'
                colorScheme='green'
                style={{ width: "170px"}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Update 
            </Button>
        </div>
    </div>
  )
}

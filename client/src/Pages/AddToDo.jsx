import React from 'react';
import { useState} from 'react';
import { Input, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { HandleLogOut, createNewData} from '../ConfigData';
import '../Styles/Todo.css';
import { useNavigate } from 'react-router-dom';
import ViewTodo from './ViewTodo';
// import { SmallCloseIcon } from '@chakra-ui/icons'


export default function AddToDo() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDiscription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const submitHandler = async(e) => {
        e.preventDefault();
        try{
            const formData = {
                title,
                description,
                dueDate
            }
            setLoading(true);
            const response = await createNewData(formData);
            
            console.log(response);
            toast({
                title: "Todo created successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-end",
            });
            setTitle("");
            setDiscription("");
            setLoading(false);
            window.location.href='/home'
        }
        catch(error){
            toast({
                title: "Error Occured!!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-end",
            });
            setLoading(false)
        }
    }

  return (
    <div>
        <Button 
                    className='btn-logout'
                    onClick={() => {
                        HandleLogOut();
                        window.location.href = "/login";
                      }}
                >
                    Logout
                    {/* <SmallCloseIcon /> */}
                </Button>
        <div className="container">
            <div className='logout-con'>
                <h1 className='addTodo-title'>Create my new todo</h1>
                
            </div>
        <div className="content">
                <Input
                    className='content-input'
                    placeholder='Enter Your todo title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    className='content-input'
                    placeholder='Enter Your todo discription'
                    value={description}
                    onChange={(e) => setDiscription(e.target.value)}
                />
                <Input
                    type="date" 
                    className='content-input'
                    placeholder='Enter Your todo duedate'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

            <Button 
                colorScheme='green'
                style={{ width: "170px"}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Add 
            </Button>

        </div>
    </div>
        <ViewTodo />
    </div>
  )
}

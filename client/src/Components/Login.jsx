import React from 'react';
import { useState} from 'react';
import { VStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
import { userSignIn } from '../ConfigData';
import '../Styles/SignUp.css';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {setShow(!show)};

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-end",
          });
          setLoading(false);
          return;
        }
    
        // console.log(email, password);
        try {
            const formData = {
              email,
              password
            }
            setLoading(true);
            const response = await userSignIn(formData)
            console.log(response)
            localStorage.setItem("token", response.data.token);
    
          // console.log(JSON.stringify(data));
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-end",
          });
          setLoading(false);
          navigate('/home')
        } 
        catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-end",
          });
          setLoading(false);

        }
      };


    return(
        <div className='signUp-container'>
        <h1 className='signup-title'>Login Exist User for Authentication</h1>
        <VStack spacing='5px'
            borderRadius="lg"
            colorScheme="green"
            className='custom-vstack'
        >

            <FormControl className='form-control' id="email" isRequired>
                <FormLabel className='form-control'>Email</FormLabel>
                <Input
                    className='form-control'
                    placeholder='Enter Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl className='form-control' id="password" isRequired>
                <FormLabel className='form-control'>Password</FormLabel>
                    <InputGroup className='form-control'>
                        <Input
                            className='form-control'
                            value={password}
                            type={ show? "text": "password"}
                            placeholder='Enter Your Padssword'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement className='form-control' width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                { show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    
            </FormControl>

            <Button 
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <div className='login-sub-con'>
              <span>Don't have an account?</span> <button 
                  className='login-sub'
                  width="100%"
                  style={{ marginLeft: 10}}
                  onClick={() => navigate("/")}
              >
                  SignUp
              </button>
            </div>

        </VStack>
        </div>
    )
}
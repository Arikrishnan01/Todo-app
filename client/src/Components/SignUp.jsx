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
import { useToast } from '@chakra-ui/react';
import { userSignUp} from '../ConfigData';
import '../Styles/SignUp.css';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => {setShow(!show)};

    const submitHandler =async () => {
        setLoading(true);
        if(!name || !email || !password) {
            toast({
                title: "Please fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-end",
            });
            setLoading(false);
            return;
        }

        try{
            const formData = {
                name,
                email,
                password
              }
              setLoading(true);
              await userSignUp(formData);
            toast({
                title: "Registration successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-end",
                containerStyle: {
                    backgroundColor:'inherit'
                  },
            });

            setLoading(false);
            navigate('/login')
        }
        catch(error) {
            toast({
                title: "Error Occured!!",
                description: error.response.data.message,
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
                <h1 className='signup-title'>Register New User for Authentication</h1>
                <VStack spacing='5px ' 
                colorScheme="green"
                borderRadius="lg"
                className='custom-vstack'
            >
            <FormControl className='form-control' id="first-name" isRequired>
                <FormLabel className='form-control'>Name</FormLabel>
                <Input
                    className='form-control'
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id="email" className='form-control' isRequired>
                <FormLabel className='form-control'>Email</FormLabel>
                <Input
                    className='form-control'
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl className='form-control' id="password" isRequired>
                <FormLabel className='form-control'>Password</FormLabel>
                    <InputGroup className='form-control'>
                        <Input
                            className='form-control'
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
                colorScheme='teal'
                width="100%"
                style={{ marginTop: 15}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>

            </VStack>
            </div>
    )
}
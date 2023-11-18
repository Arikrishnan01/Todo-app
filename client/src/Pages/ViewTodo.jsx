import React, { useEffect, useState } from 'react';
import '../Styles/ViewTodo.css';
import { useNavigate } from 'react-router-dom';
import { GLOBAL_URL, getAllData } from '../ConfigData';
import { useToast } from '@chakra-ui/react';
import moment  from 'moment';
import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Tooltip } from '@chakra-ui/react'

export default function ViewTodo() {

    const [userData, setUserData ] = useState([]);
    const navigate = useNavigate();
    const toast = useToast();
    // const [records , setRecords ] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [fontSize, setFontSize] = useState(16); 

    const fetchAllData = async() => {
        const response = await getAllData();
        setUserData(response.data.data);
        // setRecords(response.data.data);
    }

    const handleSearch = () => {
        // if (!userData) return;
        // console.log(response)
        const newFilteredData = userData.filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // setUserData(newFilteredData);
            setUserData(newFilteredData.length > 0 ? newFilteredData : userData)
      };

    // const Filter = (event,response) => {
    //     setRecords(response.filter(f => f.title.toLowerCase().includes(event.target.value)))
    //   }

    const handleClear = () => {
        setSearchTerm('');
      };

      const increaseFontSize = () => {
        setFontSize(fontSize + 1);
      };

    useEffect(() => {
        fetchAllData();
        // handleSearch();
    },[searchTerm])

  return (
    <div className='view-todo-con'>
        <div className='search-bar-con'>
            <h2 className='view-title'>My Todos</h2>
            <div className='search-bar-content'>
                <SearchIcon 
                    onClick={handleSearch}
                className='search-input-icon'/>
                <Tooltip hasArrow label='give input and click search icon ' bg='green'>
                    <input 
                        // onChange={Filter}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type='text'
                        placeholder='search...'
                        className='search-input-box'
                    />
                </Tooltip>
                
                {/* {
                    searchTerm && ( */}
                        <button
                            className='search-bar-clear-box'
                            onClick={handleClear}
                        >
                            <SmallCloseIcon />
                        </button>
                {/* )
            }                */}
         </div>
         <Tooltip hasArrow label='If you increse font size do' bg='#66C7B4'>
            <button
                className='search-bar-font-increse'
                onClick={increaseFontSize} 
            >
                Font ++
            </button>
        </Tooltip>
            
        </div>
        <div className='content-map'>
                {
                    
                    userData&&
                    userData.map(row => (
                        <div className="container1">
                            <div className="content1">
                            <div key={row.id} >
                                <h2 className='content-map-title' style={{ fontSize: `${fontSize}px` }}>
                                    {row.title}
                                </h2>
                                <p className='content-map-title2' style={{ fontSize: `${fontSize}px` }}>
                                    😊 {row.description}.
                                </p>
                                <p className='content-map-title2' style={{ fontSize: `${fontSize}px` }}>
                                    ⏲️ {moment(row.dueDate).format('YYYY-MM-DD HH:mm:ss')}.
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

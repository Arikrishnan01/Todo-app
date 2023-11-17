import './App.css';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import { Routes, Route} from "react-router-dom";
import Home from './Pages/Home';
import UpdateTodo from './Pages/UpdateTodo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/toDo/:id" element={<UpdateTodo />} />
      </Routes>
    </div>
  );
}

export default App;

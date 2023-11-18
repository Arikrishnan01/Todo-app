import axios from "axios";

export const GLOBAL_URL="http://localhost:5000"

export async function createNewData(data) {
    return axios.post("http://localhost:5000/toDo/create",data, {
        headers : {
            "access-token": localStorage.getItem("token"),
        },
    });
}

// egt all todo
export async function getAllData() {
    return axios.get("http://localhost:5000/toDo/getAllToDo", {
        headers : {
            "access-token": localStorage.getItem("token"),
        },
    });
}

//logout
export const HandleLogOut = () => {
    localStorage.removeItem('token')
    return;
};


// auth
export async function userSignUp(data){
    return axios.post("http://localhost:5000/users/register", data)
}

export async function userSignIn(data){
    return axios.post("http://localhost:5000/users/login", data)
}
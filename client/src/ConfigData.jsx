import axios from "axios";

export const GLOBAL_URL="https://todo-app-pyt4.onrender.com"

export async function createNewData(data) {
    return axios.post("https://todo-app-pyt4.onrender.com/toDo/create",data, {
        headers : {
            "access-token": localStorage.getItem("token"),
        },
    });
}

// egt all todo
export async function getAllData() {
    return axios.get("https://todo-app-pyt4.onrender.com/toDo/getAllToDo", {
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
    return axios.post("https://todo-app-pyt4.onrender.com/users/register", data)
}

export async function userSignIn(data){
    return axios.post("https://todo-app-pyt4.onrender.com/users/login", data)
}
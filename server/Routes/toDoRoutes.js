import express from 'express';
import { createToDo, deleteToDoById, getById, getallToDo, updateToDoById } from '../Controllers/toDoController.js';
import { verifyToken } from '../Middleware/authJWT.js';

const router = express.Router();

router.post('/create',[verifyToken], createToDo);
router.get("/getAllTodo",[verifyToken], getallToDo);
router.get("/:id", getById);
router.put("/:id", updateToDoById);
router.delete("/:id", deleteToDoById);

/** export the sub router */
const toDoRouters = router;
export default toDoRouters;
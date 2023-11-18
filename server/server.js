import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import { connectDB } from './Config/db.js';
import bodyParser from 'body-parser';
import userRouters from './Routes/userRoutes.js';
import toDoRouters from './Routes/toDoRoutes.js';

const app = express();
/** CNFIGURE THE DOTENV */
dotenv.config();
const PORT = process.env.PORT;

/**IMPORT THE DB CONNECTION */
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**CORS */
// app.use(cors());
  app.use(cors());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

/**API HOME END POINT */
app.get('/',(req, res) => {
    return res.status(200).json({
        message: "API RUNNING SUCCESSFULLY!!!"
    });
});

/** import the and use the sub router */
app.use('/users', userRouters);
app.use('/toDo', toDoRouters);


/** SERVER LISTEN WITH PORT NUMBER */
app.listen(PORT, () => {
    console.log(`SERVER STARTED : ${PORT}`.bold.yellow);
});
import userModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/** new user register */
export const register =async (req, res) => {
    try{
        const { name, email, password } = req.body;

        /**Exist user check */
        const userExist = await userModel.findOne({ email });

        if(userExist){
            return res.status(400).json({
                message: "User already exist, try another email..."
            });
        }

        /** hash the password for secruty purpose */
        const hashPassword = await bcrypt.hash(password, 10);

        /** create new user */
        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        })
        await newUser.save()
            return res.status(200).json({
                message: "New user register successfully!!!",
                data: newUser
        });
    }
    catch(error){
        return res.status(500).json({
            message: "Internal server Error",
            error: error.message
        });
    }
}

/** login user */
export const login =async (req, res) => {
    try{
        const { email, password } = req.body;
        const User = await userModel.findOne({ email });

        /** check the user exists */
        if(!User){
            return res.status(404).json({
                message: "User not found, Give the valid userdata!!"
            });
        }

        /** passwrod Match  */
        const passwordMatch = await bcrypt.compare(password, User.password);
        if(!passwordMatch){
            return res.status(400).json({
                message: "Password is doesn't match!!!"
            });
        }
        
          /**GENERATE THE JWT TOKEN */
          const generateToken = jwt.sign(
            { userId: User._id, email: User.email },
              process.env.JWT_SECRET,
            { expiresIn: "24h"}
        )
        return res.status(200).json({
            message: "SignIn successfully!!",
            token: generateToken
        });
    }
    catch(error){
        return res.status(500).json({
            message: "Internal server Error!!",
            error: error.message
        });
    }
}
import { hash, compare } from "../utils/hashUtils.js"
import {generateToken} from "../utils/jwtUtils.js"
import User from "../models/userModel.js"

export const register = async (req, res) => {
    try {   
        const registerData = req.body

        const existingUser = await User.findOne({email : registerData.email});
        if(existingUser){
            return res.status(400).json({
                message : "Email sudah ada",
                data : null
            });
        }

        const hashedPassword = hash(registerData.password);

        await User.create({
            username : registerData.username, 
            email : registerData.email,
            password : hashedPassword
        });

        res.status(201).json({
            message : "User berhasil register",
            data : null
        });

    } catch (error) {
        res.status(500).json({
            message : "Internal server error",
            data : null
        })
    }   
}

export const login = async (req, res) => {
    try {
        const loginData = req.body
        const user = await User.findOne({
            email: loginData.email
        }).select("+password")

        if (!user) {
            return res.status(401).json({
                message: "Email atau password salah",
                data: null
            })
        }

        const isPasswordValid = compare(loginData.password, user.password)

        if (isPasswordValid) {
            const token = generateToken(user._id)

            return res.status(200).json({
                message: "User berhasil login",
                data: { token }
            })

        }
        return res.status(401).json({
            message: "Email atau password salah",
            data: null
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            data: null
        })
    }
}   

export const getProfile = async (req, res) => { 
    try {
        const user = await User.findById(req.user.id).select("-password")

        if(user){
            return res.status(200).json({
                message : "User profile berhasil ditemukan",
                data : user
            })
        } else {
            return res.status(404).json({
                message : "User tidak ditemukan",
                data : null
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Internal server error",
            data : null
        })
    }
}


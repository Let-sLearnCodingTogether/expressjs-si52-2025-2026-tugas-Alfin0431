import jwt from "jsonwebtoken"

const jwt_secret = process.env.JWT_SECRET

export const generateToken = (id) => {
    return jwt.sign({ id }, jwt_secret, {
        expiresIn: "1d"
    })
}
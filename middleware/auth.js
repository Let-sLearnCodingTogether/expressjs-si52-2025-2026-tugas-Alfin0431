import jwt from "jsonwebtoken"

const jwt_secret = process.env .JWT_SECRET
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, jwt_secret);
            req.user = decoded;
            next();

        } catch (error) {
            return res.status(401).json({message : "Token Salah", data : null})
        }
    }
    
    if (!token) {
        return res.status(401).json({message : "Tidak ada token, akses ditolak", data : null})
    }
};

export default protect;
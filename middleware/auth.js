import jwt from "jsonwebtoken"

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

                req.user = decoded;
                next();

        } catch (error) {
            console.error("JWT Verification Error:", error.message);
            return res.status(401).json({message : "Token Salah", data : null})
        }
    } else {
        return res.status(401).json({message : "Tidak ada token, akses ditolak", data : null})
    }
    
};

export default protect;
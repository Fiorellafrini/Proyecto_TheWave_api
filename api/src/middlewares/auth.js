const jwt = require("jsonwebtoken")
const { JWT_SECRET_KEY } =process.env

function authenticateToken(req, res, next) {
    
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'You must be logged in to access this resource.' });
    }
    
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err || !user ||user.exp < Date.now() / 1000) {
            // El token ha expirado
            return  res.status(403).send("This token is invalid.")
        }
        req.user = user
        next() 
    })
};

module.exports={ authenticateToken }
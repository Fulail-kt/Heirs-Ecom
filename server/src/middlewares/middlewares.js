import jwt from 'jsonwebtoken'

export const authMiddleware = (req,res,next) => {
    console.log(req.headers.authorization,"---------")
    try {
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ success: false, message: 'No tokens provided' });
        }
        const jwtSecret = process.env.JWT_SECRET_KEY;
        console.log(jwtSecret)
        const decoded = jwt.verify(authToken, jwtSecret);
        req.user = decoded;
        console.log(decoded,"oo")
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'No tokens provided' });
    }

}

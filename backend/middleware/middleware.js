import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {

    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("the decoded form ",decoded)
    
    // req.user = {id:decoded._id};
 req.user = decoded

   

    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token is invalid or expired' });
  }
};

export default verifyToken;

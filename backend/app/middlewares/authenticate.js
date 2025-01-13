import jwt from "jsonwebtoken";
/*
    Middleware
    1. 3 parameters - req, res, next 
    2. write any code
    3. you can end a req res cycle
    4. you can modify the request object
*/
const authenticateUser = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ errors: "token not provided" });
  }
  token = token.split(" ")[1];
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    console.log("authenticate user", tokenData);
    req.currentUser = { userId: tokenData.userId, role: tokenData.role };
    next();
  } catch (err) {
    return res.status(401).json({ errors: err.message });
  }
};

export default authenticateUser;

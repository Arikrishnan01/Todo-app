import jwt  from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    let token = req.headers["access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No Token Provided" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      // console.log(decoded)
      req.userId = decoded.userId;
      req.user = decoded;
      next();
    });
  };
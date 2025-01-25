import jwt from 'jsonwebtoken'

export function authenticateToken (req, res, next){
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

export function authenticateTokenForAdmin (req,res,next){
  const token = req.headers['authorization']?.split(' ')[1];
  if(!token) return res.sendStatus(401);

  jwt.verify(token,process.env.SECRET_KEY, (err,user)=>{
    if(err || user?.user.role != "admin") return res.sendStatus(403);
    res.user = user;
    next();
  })
}

export function authenticateSubscription (req,res,next){
  if(req.body.secret_code === "7217362423") next();
  else return res.status(404).json("Please entry Code");
}
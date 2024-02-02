const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).send({ message: 'Auth token is not supplied' });
  }

  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({ message: 'Token is not valid' });
    req.user = user;
    next();
  });
};
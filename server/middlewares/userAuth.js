const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
  console.log('AUTH MIDDLEWARE HIT');
  console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = userAuth;

const { admin } = require('../config/firebaseindex');

const authMiddleware = async (role) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;

      if (role && req.user.role !== role) {
        return res.status(403).send('Forbidden');
      }

      next();
    } catch (error) {
      return res.status(401).send('Unauthorized');
    }
  };
};

module.exports = authMiddleware;

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.sendStatus(403);

  try {
    const token = authHeader!.split('ShinSeungWoo ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET!, (err, user) => {
      if (err) throw err;

      req.body.user = user;
      next();
    });
  } catch (err) {
    return res.sendStatus(401);
  }
};

export default verifyToken;

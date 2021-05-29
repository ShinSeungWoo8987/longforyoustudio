import express, { Router, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connection from '../../database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config({ path: './src/.env' });

const router: Router = express.Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connection.query(`SELECT * from user WHERE Use_id=?`, [req.body.username], async (error, results, fields) => {
      if (error) throw error;

      const validPassword = await bcrypt.compare(req.body.password, results[0].Use_pw);
      if (!validPassword) throw error;
      else {
        // 토큰 발급
        const jwttoken = jwt.sign({ userId: results[0].Use_id }, process.env.TOKEN_SECRET!);
        res.json({ jwttoken, userId: results[0].Use_id });
      }
    });
  } catch (error) {
    return res.sendStatus(400);
  }
});

export default router;

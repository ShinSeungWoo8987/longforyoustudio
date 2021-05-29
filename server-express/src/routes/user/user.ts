import express, { NextFunction, Request, Response, Router } from 'express';
import connection from '../../database';

const router: Router = express.Router();

router.get('/information', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connection.query(`select * from information`, async (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.get('/product', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connection.query(`select * from product`, async (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.get('/image/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connection.query(
      `select * from image where ima_thumbnail=true order by ima_id desc`,
      async (error, results, fields) => {
        if (error) throw error;
        res.json(results);
      }
    );
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.post('/message', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connection.query(
      `INSERT INTO message ( Mes_name, Mes_phone, Mes_content, mes_hopedate, pro_id ) VALUES (?,?,?,?,?)`,
      [req.body.Mes_name, req.body.Mes_phone, req.body.Mes_content, req.body.Mes_hopedate, req.body.Pro_id],
      async (error, results, fields) => {
        if (error) throw error;
        res.sendStatus(200);
      }
    );
  } catch (error) {
    return res.sendStatus(400);
  }
});

export default router;

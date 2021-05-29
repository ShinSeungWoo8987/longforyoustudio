import express, { NextFunction, Request, Response, Router } from 'express';
import verifyToken from '../auth/verifyToken';
import connection from '../../database';

const router: Router = express.Router();

router.get('/message/:num', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  let offset = Number(req.params.num);
  if (isNaN(offset)) return res.sendStatus(400);
  offset = (offset - 1) * 20;
  try {
    await connection.query(
      `select Mes_id, Mes_content, Mes_date, mes_hopedate, Mes_name, Mes_phone, pro_title from message Left join product ON message.pro_id= product.pro_id order by mes_id desc LIMIT 20 OFFSET ?`,
      [offset],
      async (error, results, fields) => {
        if (error) throw error;
        res.json(results);
      }
    );
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.get('/messageCnt', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connection.query(`select count(*) as cnt from message`, async (error, results, fields) => {
      if (error) throw error;
      res.json(results[0].cnt);
    });
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.post('/information/update', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connection.query(
      `update information set inf_content=? where inf_type=?`,
      [req.body.Inf_content, req.body.Inf_type],
      async (error, results, fields) => {
        if (error) throw error;
        res.json(results);
      }
    );
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.post('/product/update', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connection.query(
      `update product set pro_content=?, pro_title=? where pro_id=?`,
      [req.body.pro_content, req.body.pro_title, req.body.pro_id],
      async (error, results, fields) => {
        if (error) throw error;
        res.json(results);
      }
    );
  } catch (error) {
    return res.sendStatus(400);
  }
});

export default router;

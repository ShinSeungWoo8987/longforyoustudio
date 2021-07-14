import express, { NextFunction, Request, Response, Router } from 'express';
import verifyToken from '../auth/verifyToken';
import dotenv from 'dotenv';
import connection from '../../database';
import { upload, s3 } from '../../awsS3';
import { v4 as uuid } from 'uuid';

dotenv.config({ path: './src/.env' });

const router: Router = express.Router();

router.post('/backgroundVideo', verifyToken, upload('information/background-video.mp4').single('video'), (req, res) => {
  // console.log(req.file);
  res.sendStatus(200);
});

// 원래 형태는 썸네일+묶음파일로 한 그룹씩 있었는데, 그냥 묶지말고 하나씩만 해달라는 요청으로 썸네일로만 남김.
router.post(
  '/profile',
  verifyToken,
  upload().single('thumbnail'),
  async (req: Request, res: Response, next: NextFunction) => {
    // 다음 그룹아이디 가져오기
    try {
      await connection.query(
        `select coalesce(MAX(Ima_groupid), 0) + 1 as ima_groupid FROM image`,
        async (err1, results1, fields) => {
          if (err1) throw err1;

          // 업로드된 url가져오기.
          const { location }: any = req.file;

          const Ima_groupid = Number(results1[0].ima_groupid);
          const Ima_type = req.body.type;
          const Ima_thumbnail = 1; //true
          const Ima_content = location;
          console.log(Ima_content);

          // db에 저장
          try {
            await connection.query(
              `INSERT INTO image (Ima_groupid, Ima_type, Ima_thumbnail, Ima_content) VALUES (?, ?, ?, ?)`,
              [Ima_groupid, Ima_type, Ima_thumbnail, Ima_content],
              async (err2, results2, fields) => {
                if (err2) throw err2;
                return res.json({ Ima_id: results2.insertId, Ima_type, Ima_thumbnail, Ima_groupid, Ima_content });
              }
            );
          } catch (err2) {
            return res.sendStatus(400);
          }
        }
      );
    } catch (err1) {
      return res.sendStatus(400);
    }
  }
);

router.delete('/delete/image/:groupId', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
  if (isNaN(Number(req.params.groupId))) return res.sendStatus(400);
  try {
    await connection.query(
      `SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(Ima_content, '/', -2), '/', 2) as s3filekey from image where ima_groupid=?`,
      [Number(req.params.groupId)],
      async (err1, results1, fields) => {
        if (err1) throw err1;

        results1.forEach(
          async ({ s3filekey }: { s3filekey: string }) =>
            await s3.deleteObject({ Bucket: process.env.BUCKET!, Key: s3filekey }).promise()
        );

        // DB에서 삭제
        try {
          await connection.query(
            `DELETE FROM image WHERE Ima_groupid=?`,
            [Number(req.params.groupId)],
            async (err3, results2, fields) => {
              if (err3) throw err3;
              res.sendStatus(200);
            }
          );
        } catch (error) {
          return res.sendStatus(400);
        }
      }
    );
  } catch (error) {
    return res.sendStatus(400);
  }
});

export default router;

/*

// 파일 하나만 업로드 할 때. ex) { img: File }
app.post('/uploadOne', upload(filePath).single('img'), (req, res) => {
  console.log(req.file);
});

// 파일 여러개를 배열로 업로드 할 때. ex) { img: [File,File,File,...] }
app.post('/uploadArray', upload(filePath).array('img'), (req, res) => {
  console.log(req.files);
});

// 파일을 여러개의 객체로 업로드 할 때.
app.post(
  '/uploadFields',
  upload(filePath).fields([{ name: 'img1' }, { name: 'img2' }, { name: 'img3' }]),
  (req, res) => {
    console.log(req.files);
  }
);

*/

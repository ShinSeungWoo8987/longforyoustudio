"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../auth/verifyToken"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../../database"));
const awsS3_1 = require("../../awsS3");
dotenv_1.default.config({ path: './src/.env' });
const router = express_1.default.Router();
router.post('/backgroundVideo', verifyToken_1.default, awsS3_1.upload('information/background-video.mp4').single('video'), (req, res) => {
    // console.log(req.file);
    res.sendStatus(200);
});
// 원래 형태는 썸네일+묶음파일로 한 그룹씩 있었는데, 그냥 묶지말고 하나씩만 해달라는 요청으로 썸네일로만 남김.
router.post('/profile', verifyToken_1.default, awsS3_1.upload().single('thumbnail'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 다음 그룹아이디 가져오기
    try {
        yield database_1.default.query(`select coalesce(MAX(Ima_groupid), 0) + 1 as ima_groupid FROM image`, (err1, results1, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (err1)
                throw err1;
            // 업로드된 url가져오기.
            const { location } = req.file;
            const Ima_groupid = Number(results1[0].ima_groupid);
            const Ima_type = req.body.type;
            const Ima_thumbnail = 1; //true
            const Ima_content = location;
            console.log(Ima_content);
            // db에 저장
            try {
                yield database_1.default.query(`INSERT INTO image (Ima_groupid, Ima_type, Ima_thumbnail, Ima_content) VALUES (?, ?, ?, ?)`, [Ima_groupid, Ima_type, Ima_thumbnail, Ima_content], (err2, results2, fields) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err2)
                        throw err2;
                    return res.json({ Ima_id: results2.insertId, Ima_type, Ima_thumbnail, Ima_groupid, Ima_content });
                }));
            }
            catch (err2) {
                return res.sendStatus(400);
            }
        }));
    }
    catch (err1) {
        return res.sendStatus(400);
    }
}));
router.delete('/delete/image/:groupId', verifyToken_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (isNaN(Number(req.params.groupId)))
        return res.sendStatus(400);
    try {
        yield database_1.default.query(`SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(Ima_content, '/', -2), '/', 2) as s3filekey from image where ima_groupid=?`, [Number(req.params.groupId)], (err1, results1, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (err1)
                throw err1;
            results1.forEach(({ s3filekey }) => __awaiter(void 0, void 0, void 0, function* () { return yield awsS3_1.s3.deleteObject({ Bucket: process.env.BUCKET, Key: s3filekey }).promise(); }));
            // DB에서 삭제
            try {
                yield database_1.default.query(`DELETE FROM image WHERE Ima_groupid=?`, [Number(req.params.groupId)], (err3, results2, fields) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err3)
                        throw err3;
                    res.sendStatus(200);
                }));
            }
            catch (error) {
                return res.sendStatus(400);
            }
        }));
    }
    catch (error) {
        return res.sendStatus(400);
    }
}));
exports.default = router;
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

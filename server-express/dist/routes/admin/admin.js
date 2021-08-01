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
const database_1 = __importDefault(require("../../database"));
const router = express_1.default.Router();
router.get('/message/:num', verifyToken_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let offset = Number(req.params.num);
    if (isNaN(offset))
        return res.sendStatus(400);
    offset = (offset - 1) * 20;
    try {
        yield database_1.default.query(`select Mes_id, Mes_content, Mes_date, mes_hopedate, Mes_name, Mes_phone, pro_title from message Left join product ON message.pro_id= product.pro_id order by mes_id desc LIMIT 20 OFFSET ?`, [offset], (error, results, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            res.json(results);
        }));
    }
    catch (error) {
        return res.sendStatus(400);
    }
}));
router.get('/messageCnt', verifyToken_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.query(`select count(*) as cnt from message`, (error, results, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            res.json(results[0].cnt);
        }));
    }
    catch (error) {
        return res.sendStatus(400);
    }
}));
router.post('/information/update', verifyToken_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.query(`update information set inf_content=? where inf_type=?`, [req.body.Inf_content, req.body.Inf_type], (error, results, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            res.json(results);
        }));
    }
    catch (error) {
        return res.sendStatus(400);
    }
}));
router.post('/product/update', verifyToken_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.query(`update product set pro_content=?, pro_title=? where pro_id=?`, [req.body.pro_content, req.body.pro_title, req.body.pro_id], (error, results, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            res.json(results);
        }));
    }
    catch (error) {
        return res.sendStatus(400);
    }
}));
exports.default = router;

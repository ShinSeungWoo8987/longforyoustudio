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
const database_1 = __importDefault(require("../../database"));
const router = express_1.default.Router();
router.get('/information', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.query(`select * from information`, (error, results, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            res.json(results);
        }));
    }
    catch (error) {
        return res.sendStatus(400);
    }
}));
router.get('/product', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.query(`select * from product`, (error, results, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            res.json(results);
        }));
    }
    catch (error) {
        return res.sendStatus(400);
    }
}));
router.get('/image/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.query(`select * from image where ima_thumbnail=true order by ima_id desc`, (error, results, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            res.json(results);
        }));
    }
    catch (error) {
        return res.sendStatus(400);
    }
}));
router.post('/message', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.query(`INSERT INTO message ( Mes_name, Mes_phone, Mes_content, mes_hopedate, pro_id ) VALUES (?,?,?,?,?)`, [req.body.Mes_name, req.body.Mes_phone, req.body.Mes_content, req.body.Mes_hopedate, req.body.Pro_id], (error, results, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            res.sendStatus(200);
        }));
    }
    catch (error) {
        return res.sendStatus(400);
    }
}));
exports.default = router;

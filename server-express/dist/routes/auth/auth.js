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
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config({ path: './src/.env' });
const router = express_1.default.Router();
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.query(`SELECT * from user WHERE Use_id=?`, [req.body.username], (error, results, fields) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                throw error;
            const validPassword = yield bcryptjs_1.default.compare(req.body.password, results[0].Use_pw);
            if (!validPassword)
                throw error;
            else {
                // 토큰 발급
                const jwttoken = jsonwebtoken_1.default.sign({ userId: results[0].Use_id }, process.env.TOKEN_SECRET);
                res.json({ jwttoken, userId: results[0].Use_id });
            }
        }));
    }
    catch (error) {
        return res.sendStatus(400);
    }
}));
exports.default = router;

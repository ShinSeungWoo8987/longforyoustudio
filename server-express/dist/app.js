"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth/auth"));
const admin_1 = __importDefault(require("./routes/admin/admin"));
const user_1 = __importDefault(require("./routes/user/user"));
const fileUpload_1 = __importDefault(require("./routes/admin/fileUpload"));
const compression_1 = __importDefault(require("compression"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './src/.env' });
const app = express_1.default();
// 미들웨어
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(compression_1.default());
app.get('/', (req, res, next) => {
    res.send(new Date());
});
app.use('/', user_1.default);
app.use('/', admin_1.default);
app.use('/', fileUpload_1.default);
app.use('/', auth_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`);
});

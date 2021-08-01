"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.s3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
dotenv_1.default.config({ path: './src/.env' });
exports.s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const upload = (filePath) => multer_1.default({
    storage: multer_s3_1.default({
        s3: exports.s3,
        bucket: process.env.BUCKET,
        key: function (req, file, cb) {
            cb(null, filePath ? filePath : `${uuid_1.v4()}/${uuid_1.v4()}`);
        },
        acl: 'public-read-write',
    }),
});
exports.upload = upload;

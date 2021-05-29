import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config({ path: './src/.env' });

// DB연결
export default mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dateStrings: true,
});

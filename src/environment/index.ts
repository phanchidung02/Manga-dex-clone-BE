import * as dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const HOST = process.env.HOST || 'localhost';
export const MANGADEX_BASE_URL = process.env.MANGADEX_BASE_URL || '';

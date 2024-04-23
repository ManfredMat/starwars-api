import * as dotenv from 'dotenv';
dotenv.config();

export const MONGO_STRING_CONNECTION = process.env.MONGO_STRING_CONNECTION;
export const PORT = process.env.PORT;
export const JWT_SECRET = {secret : process.env.JWT_SECRET };
export const JWT_TIME = process.env.JWT_TIME;
export const STARWARS_API = process.env.STARWARS_API


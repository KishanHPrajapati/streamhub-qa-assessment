import dotenv from 'dotenv';

dotenv.config()

export const env = {
    baseURL: process.env.BASE_URL!,
    api_baseURL: process.env.API_BASE_URL!,
};
import config from './config.json';
import dotenv from 'dotenv';

dotenv.config();

export function getBaseUrl(): string {
    const env = process.env.environment || 'stg';
    return config[env].baseUrl;
}
export function getLocalUrl(): string {
    const env = process.env.environment || 'stg';
    return config[env].localUrl;
}
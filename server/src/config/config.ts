import { config as conf } from "dotenv"
conf()


const _config = {
    port: process.env.PORT,
    databaseUrl: process.env.DATABASEURI,
    env: process.env.MODE,
    JWT_SECRET: process.env.JWT_SECRET
}


export const config = Object.freeze(_config)
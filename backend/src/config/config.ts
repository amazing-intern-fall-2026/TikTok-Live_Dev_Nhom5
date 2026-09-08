import dotenv from "dotenv";

dotenv.config();

interface Env {
    PORT: number;
}

const config = (): Env => {
    return {
        PORT: process.env.PORT ? Number(process.env.PORT) : 9090,
    };
};

export default config;

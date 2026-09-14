import dotenv from "dotenv";

dotenv.config();

interface Env {
    PORT: number;
    EULER_API_KEY: string;
}

if (!process.env.EULER_API_KEY) {
    throw new Error("EULER_API_KEY is not defined");
}

const config = (): Env => {
    return {
        PORT: process.env.PORT ? Number(process.env.PORT) : 9090,
        EULER_API_KEY: String(process.env.EULER_API_KEY),
    };
};

export default config;

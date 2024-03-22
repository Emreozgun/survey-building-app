

export const envConfig = {
    jwt: {
        secret: process.env.JWT_SECRET,
        accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES ?? 60,
        refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS ?? 7,
    },
    postgres: {
        host: process.env.POSTGRES_HOST,
    },
    origin: process.env.ORIGIN,
    credentials: process.env.CREDENTIALS,
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    apiVersion: process.env.API_VERSION
}

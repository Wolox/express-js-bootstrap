exports.config = {
    common: {
        port: process.env.PORT,
        database: {
            url: process.env.NODE_API_DB_URL,
            host: process.env.NODE_API_DB_HOST,
            port: process.env.NODE_API_DB_PORT,
            database: process.env.NODE_API_DB_NAME,
            username: process.env.NODE_API_DB_USERNAME,
            password: process.env.NODE_API_DB_PASSWORD
        },
        session: {
            header_name: 'authorization',
            secret: process.env.NODE_API_SESSION_SECRET
        }
    }
};

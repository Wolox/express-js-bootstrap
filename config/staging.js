exports.config = {
    common: {
        database: {
            host: 'db staging host',
            port: 'db staging port',
            database: 'db staging db',
            username: 'db staging username',
            password: 'db staging password'
        },
        session: {
        	header_name: 'session authorization',
        	secret: 'session secret'
        }
    }
}

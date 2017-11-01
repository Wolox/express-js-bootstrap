exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.NODE_API_DB_NAME_TEST
    }
  }
};

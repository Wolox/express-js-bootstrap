exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    session: {
      secret: 'some-super-secret'
    }
  }
};

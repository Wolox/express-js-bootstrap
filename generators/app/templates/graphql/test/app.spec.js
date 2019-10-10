'use strict';

const { host } = require('../config').common.redisCache;

const fs = require('fs'),
  models = require('../app/models'),
  path = require('path'),
  RedisClient = require('redis');

const tables = Object.values(models.sequelize.models);

const truncateTable = model =>
  model.destroy({ truncate: true, cascade: true, force: true, restartIdentity: true });

const truncateDatabase = () => Promise.all(tables.map(truncateTable));

const flushRedis = redisClient =>
  new Promise(resolve => {
    redisClient.sendCommand('FLUSHALL');
    redisClient.quit();
    resolve();
  });

beforeEach(done => {
  Promise.all([flushRedis(RedisClient.createClient({ host })), truncateDatabase()]).then(() => done());
});

// including all test files
const normalizedPath = path.join(__dirname, '.');

const requireAllTestFiles = pathToSearch => {
  fs.readdirSync(pathToSearch).forEach(file => {
    if (fs.lstatSync(`${pathToSearch}/${file}`).isDirectory()) {
      requireAllTestFiles(`${pathToSearch}/${file}`);
    } else {
      require(`${pathToSearch}/${file}`);
    }
  });
};

requireAllTestFiles(normalizedPath);

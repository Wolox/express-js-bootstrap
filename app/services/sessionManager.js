const jwt = require('jwt-simple'),
  bcrypt = require('bcrypt'),
  moment = require('moment'),
  config = require('./../../config/config').config;

const SECRET = config.common.session.secret;
const SALT_ROUNDS = 10;
const MAXIMUM_USEFUL_DAYS = 30;
const EXPIRATION_DATE = 2;
const EXPIRATION_DATE_WARNING = 10;

const maximumUsefulDate = () => {
  return moment().add(MAXIMUM_USEFUL_DAYS, 'days');
};

const expirationDate = () => {
  return moment().add(EXPIRATION_DATE, 'days');
};

const expirationDateWarning = () => {
  return moment().add(EXPIRATION_DATE_WARNING, 'seconds');
};

exports.HEADER_NAME = config.common.session.header_name;
exports.WARNING_HEADER_NAME = config.common.session.warning_header_name;

exports.encode = (toEncode) => {
  return jwt.encode(toEncode, SECRET);
};

exports.decode = (toDecode) => {
  return jwt.decode(toDecode, SECRET);
};

exports.generateAccessTokenWithRenewId = (user, renewId) => {
  return exports.encode({
    verificationCode: user.verificationCode,
    maximumUsefulDate: maximumUsefulDate(),
    expirationDate: expirationDate(),
    expirationDateWarning: expirationDateWarning(),
    id: user.id,
    renewId
  });
};

exports.generateAccessToken = (user) => {
  return bcrypt.genSalt(SALT_ROUNDS).then((renewId) => {
    return {
      access_token: exports.generateAccessTokenWithRenewId(user, renewId),
      renew_id: renewId
    };
  });
};

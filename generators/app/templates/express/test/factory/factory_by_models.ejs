const { factory } = require('factory-girl');
const Chance = require('chance');
const db = require('../../app/models');

const INTEGER = 'INTEGER';
const STRING = 'STRING';
const BOOLEAN = 'BOOLEAN';
const TEXT = 'TEXT';
const DATE = 'DATE';
const DATEONLY = 'DATEONLY';
const JSONTYPE = 'JSON';
const FLOAT = 'FLOAT';

const IS_NUMERIC = 'isNumeric';
const IS_ALPHANUMERIC = 'isAlphanumeric';
const IS_LOWERCASE = 'isLowercase';
const IS_UPPERCASE = 'isUppercase';
const IS_IP = 'isIP';
const MAX = 'max';
const MIN = 'min';
const LEN = 'len';

const modelsByName = Object.keys(db)
  .filter(modelName => modelName !== 'sequelize' && modelName !== 'Sequelize')
  .reduce((models, modelName) => {
    models[modelName] = db[modelName];
    return models;
  }, {});

const generatorIntByValidations = (key, validate) => {
  if (key === LEN) {
    return factory.chance('integer', { min: validate.len[0], max: validate.len[1] });
  }
  return {
    [MAX]: factory.chance('integer', { max: validate.max }),
    [MIN]: factory.chance('integer', { min: validate.min })
  }[key];
};

const generatorStringByValidations = key =>
  ({
    [IS_ALPHANUMERIC]: factory.chance('string', { pool: 'abcde6546' }),
    [IS_NUMERIC]: factory.chance('string', { pool: '123456789' }),
    [IS_LOWERCASE]: factory.chance('string', { pool: 'abcdefghijklmnopqrstuvwxyz' }),
    [IS_UPPERCASE]: factory.chance('string', { pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' }),
    [IS_IP]: factory.chance('ip')
  }[key]);

const generateStringByValidations = validate =>
  Object.keys(validate).map(key => generatorStringByValidations(key))[0];

const generateIntByValidations = validate =>
  Object.keys(validate).map(key => generatorIntByValidations(key, validate))[0];

const intValidation = (model, key) => {
  if (model.rawAttributes[key].unique) {
    return factory.sequence(`${model.name}.${key}`, n => n);
  }
  if (model.rawAttributes[key].validate) {
    const { validate } = model.rawAttributes[key];
    return generateIntByValidations(validate) || factory.chance('integer');
  }
  return factory.chance('integer');
};

const emailFactory = (model, key) => {
  if (model.rawAttributes[key].validate.isEmail) {
    if (model.rawAttributes[key].unique) {
      return factory.sequence(`${model.name}.email`, n => `dummy-user-${n}@wolox.com.ar`);
    }
    return factory.chance('email', { domain: 'wolox.com.ar' });
  }
  return false;
};

const stringValidation = (model, key) => {
  const chance = new Chance();
  if (model.rawAttributes[key].validate) {
    const { validate } = model.rawAttributes[key];
    if (emailFactory(model, key)) {
      return emailFactory(model, key);
    }
    if (validate.contains) {
      const word = chance.string({ pool: 'abcdefghi' });
      return factory.sequence(`${model.name}`, n => `${validate.contains}${word}${n}`);
    }
    return generateStringByValidations(validate);
  }
  return factory.chance('word');
};

const randomJsonCreate = () => {
  const chance = new Chance();
  const attributeName = chance.string({ pool: 'abcdefghi' });
  const value = factory.chance('string', { pool: 'abcdefghi' });
  return {
    [attributeName]: value
  };
};

const generatorByDatatype = (type, model, key) => {
  const chance = new Chance();
  return {
    [INTEGER]: intValidation(model, key),
    [STRING]: stringValidation(model, key),
    [BOOLEAN]: factory.chance('bool'),
    [TEXT]: factory.chance('paragraph'),
    [DATE]: factory.chance('date', { string: true }),
    [DATEONLY]: new Date(chance.date({ string: true })),
    [JSONTYPE]: randomJsonCreate(),
    [FLOAT]: factory.chance('floating')
  }[type];
};

const generateByDatatypes = (model, key, attribute, predeterminatedValue = false) => {
  if (predeterminatedValue && key === predeterminatedValue.attribute) {
    return predeterminatedValue.value;
  }
  if (model.rawAttributes[key].defaultValue !== undefined) {
    return model.rawAttributes[key].defaultValue;
  }
  return generatorByDatatype(attribute[key], model, key) || factory.chance('word');
};

const buildByModel = (model, predeterminatedValue = false) => {
  const attributeType = {};
  const factorCreated = {};
  for (const key in model.rawAttributes) {
    if (key) {
      attributeType[key] = model.rawAttributes[key].type.key;
      if (!model.rawAttributes[key].primaryKey) {
        factorCreated[key] = generateByDatatypes(model, key, attributeType, predeterminatedValue);
      }
    }
  }
  return factorCreated;
};

exports.factoryByModel = (modelRequired, predeterminatedValue = false) => {
  const modelRequested = modelsByName[modelRequired];
  const factorCreated = buildByModel(modelRequested, predeterminatedValue);
  return factory.define(modelRequested.name, db[modelRequested.name], factorCreated);
};

exports.factoryAllModels = () => {
  const models = modelsByName;
  return Object.keys(models).forEach(model => this.factoryByModel(model));
};

exports.factoryWithCustomizedValue = (modelRequired, attribute, value) => {
  const predeterminatedValue = {
    attribute,
    value
  };
  return this.factoryByModel(modelRequired, predeterminatedValue);
};

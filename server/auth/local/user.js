const AccountManager = require('./account');
const AccountConnector = require('../../../shared/db/connectors/account');
const validateCredentials = require('./validateCredentials');
const { hashPassword, getRandomBytes } = require('./helpers');
const errors = require('./errors');

module.exports = Object.assign(AccountManager(),
  {
    register(username, password) {
      return validateCredentials(username, password)
      .then(() => {
        return AccountConnector.getByUsername(username).then((user) => {
          if (user) {
            throw errors.USER_ALEADY_EXISTS;
          }
          // ignore unverified users
          return hashPassword(password).then((passHash) => {
            return getRandomBytes().then((confHash) => {
              return AccountConnector.register({ username, type: 'candidate', password: passHash, confHash }).then(() => {
                return confHash;
              });
            });
          });
        });
      });
    } // register
  } // exported obj
);  // Object.assign
